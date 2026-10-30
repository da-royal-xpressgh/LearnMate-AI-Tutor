import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in the Secrets panel in the Google AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function generateContentWithRetry(
  client: GoogleGenAI,
  params: {
    model: string;
    contents: any;
    config?: any;
  },
  maxRetries = 3,
  delayMs = 1500
): Promise<any> {
  const modelsToTry = params.model === "gemini-3.5-flash"
    ? ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"]
    : [params.model];

  let lastError: any = null;

  for (const model of modelsToTry) {
    let attempt = 0;
    // Don't waste time retrying if the primary gemini-3.5-flash is overloaded (since we have fallbacks)
    const currentMaxRetries = model === "gemini-3.5-flash" ? 1 : maxRetries;
    
    while (attempt < currentMaxRetries) {
      try {
        attempt++;
        console.log(`[Gemini API] Querying model: ${model} (attempt ${attempt}/${currentMaxRetries})`);
        return await client.models.generateContent({
          ...params,
          model,
        });
      } catch (error: any) {
        lastError = error;
        console.warn(`[Gemini API] Model ${model} failed on attempt ${attempt}:`, error.message || error);
        
        const errorMessage = (error.message || "").toLowerCase();
        const isTransient = 
          error.status === 503 || 
          error.code === 503 || 
          errorMessage.includes("503") ||
          errorMessage.includes("unavailable") ||
          errorMessage.includes("overloaded") ||
          errorMessage.includes("high demand") ||
          errorMessage.includes("rate limit") ||
          error.status === 429;

        if (isTransient && attempt < currentMaxRetries) {
          const backoffDelay = delayMs * Math.pow(2, attempt - 1);
          console.log(`[Gemini API] Transient error on ${model}. Retrying in ${backoffDelay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          continue;
        }
        
        console.log(`[Gemini API] Switching / falling back from model: ${model}`);
        break; // Break the inner while loop to try the next model in the outer loop
      }
    }
  }

  // If we exhausted all models, throw the last error encountered
  throw lastError || new Error("All available Gemini models are currently overloaded. Please try again in a few moments.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Tutor chat route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, subject } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request body. 'messages' array is required." });
        return;
      }

      const client = getAiClient();
      
      const systemInstruction = `You are LearnMate AI Tutor, an advanced, friendly, patient, and highly intelligent AI teacher who helps students understand academic topics clearly.
You teach step-by-step. Do not just give answers — you teach and encourage learning, not memorization.
The student is currently studying the subject: ${subject || "General Academic Topics"}.

You teach the following subjects:
- Mathematics
- Science
- English
- Computer Science
- Information Technology
- History
- Geography
- Economics

Teaching Style Rules:
1. Explain concepts in simple language first.
2. Use step-by-step breakdowns for problem solving.
3. Give real-life examples to make ideas easy to understand.
4. Ask a follow-up question at the end to test understanding.
5. If the student is wrong, correct them gently and explain why.
6. NEVER insult or discourage the student. Be friendly, patient, and encouraging like a real teacher.

Response Format:
Always try to structure your response to follow these parts where applicable (use clear Markdown headings):
### 💡 Simple Explanation
[Give a clear and easy explanation]

### 🔢 Step-by-Step Solution (if needed)
[Break down the answer logically with numbered steps]

### 🌍 Real-World Example
[Give a simple real-world or exam-style example]

### 📝 Quick Check
[Ask exactly 1 short question to test the student's understanding. Do not give the answer yet!]

If the student asks to be quizzed, or says "quiz me" / "test me", respond by introducing the quiz and encourage them to use the interactive Quiz Mode widget or specify the topic they'd like to test.
`;

      const response = await generateContentWithRetry(client, {
        model: "gemini-3.5-flash",
        contents: messages,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ 
        error: error.message || "An error occurred while talking to the AI Tutor.",
        isApiKeyMissing: !process.env.GEMINI_API_KEY
      });
    }
  });

  // Quiz generator route
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { subject, topic } = req.body;
      if (!subject || !topic) {
        res.status(400).json({ error: "Missing required fields: 'subject' and 'topic'." });
        return;
      }

      const client = getAiClient();

      const prompt = `Generate a high-quality educational quiz on the topic "${topic}" within the subject "${subject}" for a student.
Create exactly 3 to 5 questions.
Mix Multiple Choice Questions (MCQ) and short answer questions.
Provide the correct answers and a helpful step-by-step explanation for each question.
Ensure the questions build confidence, test core concepts, and provide high learning value.`;

      const response = await generateContentWithRetry(client, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { 
                type: Type.STRING, 
                description: "A friendly and encouraging title for the quiz, e.g., 'Photosynthesis Master Challenge'" 
              },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { 
                      type: Type.STRING, 
                      description: "Must be exactly 'mcq' or 'short'" 
                    },
                    question: { type: Type.STRING, description: "The clear question text" },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "For MCQ questions, provide 4 options (e.g. ['A) Option 1', 'B) Option 2', ...]). For short answers, leave this empty."
                    },
                    correctAnswer: { 
                      type: Type.STRING, 
                      description: "For MCQ, the correct choice letter (e.g., 'A', 'B', 'C', 'D'). For short answer, the key word or phrase that is correct." 
                    },
                    explanation: { 
                      type: Type.STRING, 
                      description: "Step-by-step friendly explanation of why this answer is correct and how to solve it." 
                    }
                  },
                  required: ["id", "type", "question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["title", "questions"]
          },
          systemInstruction: "You are LearnMate AI Tutor. You generate highly interactive and accurate academic quizzes following curriculum standards."
        }
      });

      const jsonStr = response.text || "{}";
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Error in /api/generate-quiz:", error);
      res.status(500).json({ 
        error: error.message || "An error occurred while generating the quiz.",
        isApiKeyMissing: !process.env.GEMINI_API_KEY
      });
    }
  });

  // Vite development vs production assets handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
