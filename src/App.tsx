import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Sparkles,
  Flame,
  Trophy,
  Send,
  Plus,
  Trash2,
  BookOpen,
  Atom,
  Book,
  Code,
  Globe,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Lightbulb,
  ChevronRight,
  BookOpenCheck,
  Calculator,
  MessageSquare,
  ClipboardList,
  Compass,
  ArrowRight,
  Menu,
  X,
  Users,
  User,
  Copy,
  Share2,
  Check,
  Database,
  Server,
  Palette,
  Shield,
  Tv,
  Maximize2,
  Minimize2,
  Sparkle
} from "lucide-react";
import { Message, Quiz, QuizQuestion, QuizAttempt, SavedNote, UserStats } from "./types";

const SUBJECTS = [
  { id: "Mathematics", icon: Calculator, emoji: "📐", color: "amber", accent: "from-amber-500 to-yellow-600", lightBg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  { id: "Science", icon: Atom, emoji: "🧪", color: "emerald", accent: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  { id: "English", icon: Book, emoji: "📖", color: "blue", accent: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  { id: "Computer Science", icon: Code, emoji: "💻", color: "violet", accent: "from-violet-500 to-purple-600", lightBg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  { id: "Information Technology", icon: Code, emoji: "⚙️", color: "purple", accent: "from-purple-500 to-pink-600", lightBg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  { id: "History", icon: GraduationCap, emoji: "📜", color: "rose", accent: "from-rose-500 to-red-600", lightBg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  { id: "Geography", icon: Globe, emoji: "🌍", color: "teal", accent: "from-teal-500 to-emerald-600", lightBg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  { id: "Economics", icon: TrendingUp, emoji: "⚖️", color: "indigo", accent: "from-indigo-500 to-blue-600", lightBg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" }
];

const SUGGESTED_TOPICS: Record<string, string[]> = {
  "Mathematics": ["Algebra basics", "Pythagorean Theorem", "Quadratic Equations", "Introduction to Calculus"],
  "Science": ["Photosynthesis", "Newton's Laws of Motion", "Mitosis vs Meiosis", "Structure of an Atom"],
  "English": ["Active vs Passive Voice", "Metaphors and Similes", "How to write a Thesis Statement", "Punctuation Rules"],
  "Computer Science": ["Big O Notation simply", "Binary Search", "Introduction to Recursion", "React Hooks"],
  "Information Technology": ["How the Internet works", "Cloud Computing basics", "IP Addresses and DNS", "Cybersecurity best practices"],
  "History": ["Causes of World War I", "The Silk Road", "The French Revolution", "Magna Carta importance"],
  "Geography": ["Plate Tectonics", "The Greenhouse Effect", "Types of Rocks", "Ocean Currents"],
  "Economics": ["Supply and Demand", "What is Inflation?", "GDP explained", "Monetary vs Fiscal Policy"]
};

const SUGGESTED_CHIPS: Record<string, string[]> = {
  "Mathematics": ["Explain the Pythagorean Theorem with real-world examples", "Solve 3x + 5 = 20 step-by-step", "What is calculus actually used for?"],
  "Science": ["Explain the process of photosynthesis", "Teach me Newton's 3 laws of motion simply", "Why is the sky blue?"],
  "English": ["How do I identify passive voice in my writing?", "Give me examples of metaphors vs similes", "What are the rules of semicolons?"],
  "Computer Science": ["What is Big O notation and why does it matter?", "Explain binary search in plain English", "How does recursion work?"],
  "Information Technology": ["What actually happens when I type google.com?", "What is the difference between SaaS and PaaS?", "Explain encryption simply"],
  "History": ["Explain what triggered the French Revolution", "Why was the Silk Road so important?", "Who was Mahatma Gandhi?"],
  "Geography": ["What causes earthquakes and tsunamis?", "Explain the difference between weather and climate", "How do glaciers shape land?"],
  "Economics": ["Explain supply and demand with a lemonade stand example", "Why can't countries just print more money to get rich?", "What is GDP?"]
};

const TEAM_MEMBERS = [
  {
    name: "AMPONSAH DENNIS",
    id: "ED/ITD/25/0043",
    role: "Project Lead & AI System Designer",
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50/70",
    text: "text-blue-700",
    border: "border-blue-100",
    accentBg: "bg-blue-500",
    hoverBg: "hover:border-blue-300",
    contributions: [
      "Led prompt engineering and Gemini model response styling",
      "Designed full-stack application data flows and system architecture",
      "Integrated step-by-step math solver and real-time evaluation rules"
    ]
  },
  {
    name: "EVELYN KYEREMAA",
    id: "ED/ITD/25/0054",
    role: "Content & Curriculum Developer",
    icon: BookOpen,
    color: "from-amber-500 to-yellow-600",
    lightBg: "bg-amber-50/70",
    text: "text-amber-700",
    border: "border-amber-100",
    accentBg: "bg-amber-500",
    hoverBg: "hover:border-amber-300",
    contributions: [
      "Curated syllabi content for Mathematics, Science, and IT courses",
      "Designed assessment rubrics and step-by-step logic sheets",
      "Structured localized syllabus alignment patterns for West Africa"
    ]
  },
  {
    name: "MARTIN PRAH",
    id: "ED/ITD/25/0054",
    role: "UI/UX Designer & Frontend Developer",
    icon: Palette,
    color: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50/70",
    text: "text-violet-700",
    border: "border-violet-100",
    accentBg: "bg-violet-500",
    hoverBg: "hover:border-violet-300",
    contributions: [
      "Created the highly compact high-density modern theme and workspace",
      "Designed responsive visual grids and quiz zone interactions",
      "Engineered micro-animations, theme styles, and smooth transitions"
    ]
  },
  {
    name: "OSMAN MOHAMMED AWAL",
    id: "ED/ITD/25/0037",
    role: "Backend & Database Developer",
    icon: Database,
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50/70",
    text: "text-emerald-700",
    border: "border-emerald-100",
    accentBg: "bg-emerald-500",
    hoverBg: "hover:border-emerald-300",
    contributions: [
      "Designed server-side endpoints and curriculum queries in Express",
      "Built client-side offline storage mechanisms and history state syncs",
      "Optimized API network payload serialization and JSON validation rules"
    ]
  },
  {
    name: "PRINCE EXODUS APETORGBOR",
    id: "ED/ITD/25/0012",
    role: "QA Tester & Documentation Lead",
    icon: FileText,
    color: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50/70",
    text: "text-rose-700",
    border: "border-rose-100",
    accentBg: "bg-rose-500",
    hoverBg: "hover:border-rose-300",
    contributions: [
      "Drafted comprehensive test suites and verified edge-case state renders",
      "Authored academic capstone documentations and installation guides",
      "Conducted system testing on diverse screen ratios and offline caches"
    ]
  },
  {
    name: "DENNIS KOFI ADZABE",
    id: "ED/ITD/25/0035",
    role: "Deployment & Presentation Coordinator",
    icon: Tv,
    color: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50/70",
    text: "text-teal-700",
    border: "border-teal-100",
    accentBg: "bg-teal-500",
    hoverBg: "hover:border-teal-300",
    contributions: [
      "Coordinated presentation slides and live interactive project demo scripts",
      "Deployed optimized cloud container instances and ingress configurations",
      "Created visual media aids and speech structures for team evaluation"
    ]
  }
];

// Simple custom markdown renderer to format responses cleanly with "High Density" aesthetic colors & badges
function renderMarkdown(text: string) {
  if (!text) return "";
  
  // Replace simple HTML entities
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Format headers with high-density aesthetic badges
  formatted = formatted.replace(/^### 💡 Simple Explanation(.*$)/gim, '<div class="my-4 p-4 bg-slate-50 rounded-xl border border-slate-200"><span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2 inline-block">Simple Explanation</span><p class="text-slate-700 text-sm font-medium leading-relaxed mt-1">$1</p></div>');
  formatted = formatted.replace(/^### 🔢 Step-by-Step Solution(.*$)/gim, '<div class="my-4 p-4 bg-white rounded-xl border border-slate-200"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2 inline-block">Step-by-Step Solution</span><p class="text-slate-800 text-sm font-bold mt-1">$1</p></div>');
  formatted = formatted.replace(/^### 🌍 Real-World Example(.*$)/gim, '<div class="my-4 p-5 bg-indigo-600 text-white rounded-xl shadow-md"><span class="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1.5 inline-block">Real-World Example</span><p class="text-sm font-semibold leading-relaxed mt-1">$1</p></div>');
  formatted = formatted.replace(/^### 📝 Quick Check(.*$)/gim, '<div class="my-4 p-4 bg-amber-50 rounded-xl border border-amber-200"><span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wider mb-2 inline-block">Quick Check</span><p class="text-slate-800 text-sm font-semibold mt-1">$1</p></div>');

  // Format generic headers
  formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-slate-800 mt-4 mb-2 flex items-center gap-1.5 font-sans">$1</h3>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-slate-900 mt-4 mb-2 flex items-center gap-2 font-sans">$1</h2>');
  formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-lg font-extrabold text-slate-900 mt-5 mb-2.5 font-sans">$1</h1>');

  // Format bold text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  
  // Format bullet lists
  formatted = formatted.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-5 list-disc text-slate-700 my-1 text-xs">$1</li>');
  formatted = formatted.replace(/^\s*\*\s+(.*$)/gim, '<li class="ml-5 list-disc text-slate-700 my-1 text-xs">$1</li>');
  
  // Wrap li elements in ul if they exist sequentially (simplified)
  formatted = formatted.replace(/(<li.*<\/li>)/g, '<ul class="my-2">$1</ul>');
  // Clean double list wraps
  formatted = formatted.replace(/<\/ul>\s*<ul class="my-2">/g, "");

  // Format numbered lists
  formatted = formatted.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-5 list-decimal text-slate-700 my-1 text-xs">$2</li>');
  formatted = formatted.replace(/(<li class="ml-5 list-decimal.*<\/li>)/g, '<ol class="my-2">$1</ol>');
  formatted = formatted.replace(/<\/ol>\s*<ol class="my-2">/g, "");

  // Format inline code
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');

  // Format block code
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg my-3 overflow-x-auto text-xs font-mono"><code>$1</code></pre>');

  // Format paragraphs
  const paragraphs = formatted.split("\n\n");
  const processedParagraphs = paragraphs.map(p => {
    p = p.trim();
    if (!p) return "";
    if (p.startsWith("<h") || p.startsWith("<div") || p.startsWith("<ul") || p.startsWith("<ol") || p.startsWith("<pre")) {
      return p;
    }
    return `<p class="leading-relaxed text-slate-700 text-xs my-2">${p}</p>`;
  });

  return processedParagraphs.join("");
}

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<"chat" | "quiz" | "notes" | "team">("team");
  const [currentSubject, setCurrentSubject] = useState<string>("Science");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Presentation & Team Dashboard States
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [presentationSlide, setPresentationSlide] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const handleCopyInfo = () => {
    const infoText = `Group 5 – AI Powered Tutoring Chatbot Project
LearnMate AI Tutor - University Capstone Project

TEAM MEMBERS & ROLES:
1. AMPONSAH DENNIS (ED/ITD/25/0043) - Project Lead & AI System Designer
2. EVELYN KYEREMAA (ED/ITD/25/0054) - Content & Curriculum Developer
3. MARTIN PRAH (ED/ITD/25/0054) - UI/UX Designer & Frontend Developer
4. OSMAN MOHAMMED AWAL (ED/ITD/25/0037) - Backend & Database Developer
5. PRINCE EXODUS APETORGBOR (ED/ITD/25/0012) - QA Tester & Documentation Lead
6. DENNIS KOFI ADZABE (ED/ITD/25/0035) - Deployment & Presentation Coordinator`;

    navigator.clipboard.writeText(infoText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Clipboard copy failed:", err);
    });
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }).catch(err => {
      console.error("Clipboard share failed:", err);
    });
  };

  // Stats States
  const [stats, setStats] = useState<UserStats>({
    streak: 1,
    lastActiveDate: new Date().toDateString(),
    quizzesCompleted: 0,
    avgScore: 0,
    questionsAnswered: 0
  });

  // Chat States
  const [messagesBySubject, setMessagesBySubject] = useState<Record<string, Message[]>>({});
  const [chatInput, setChatInput] = useState<string>("Explain Newton's Laws of Motion simply");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Quiz States
  const [quizTopic, setQuizTopic] = useState<string>("Newton's Laws of Motion");
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  // Active Quiz taking progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<string>("");
  const [shortAnswerText, setShortAnswerText] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);

  // Notebook States
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load & Sync with localStorage
  useEffect(() => {
    // Stats
    const savedStats = localStorage.getItem("learnmate_stats");
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        
        // Calculate Streak logic
        const lastDate = new Date(parsed.lastActiveDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let newStreak = parsed.streak;
        if (diffDays === 1) {
          newStreak += 1; // Continuous streak
        } else if (diffDays > 1) {
          newStreak = 1; // Reset streak
        }
        
        const updated = {
          ...parsed,
          streak: newStreak,
          lastActiveDate: today.toDateString()
        };
        setStats(updated);
        localStorage.setItem("learnmate_stats", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    } else {
      localStorage.setItem("learnmate_stats", JSON.stringify(stats));
    }

    // Saved Notes
    const savedNotesData = localStorage.getItem("learnmate_notes");
    if (savedNotesData) {
      try {
        setSavedNotes(JSON.parse(savedNotesData));
      } catch (e) {}
    }

    // Saved Quiz Attempts
    const savedAttempts = localStorage.getItem("learnmate_attempts");
    if (savedAttempts) {
      try {
        setQuizAttempts(JSON.parse(savedAttempts));
      } catch (e) {}
    }

    // Chat History
    const savedChats = localStorage.getItem("learnmate_chats");
    if (savedChats) {
      try {
        setMessagesBySubject(JSON.parse(savedChats));
      } catch (e) {}
    } else {
      // Seed initial welcoming message
      const initialChats: Record<string, Message[]> = {};
      SUBJECTS.forEach(sub => {
        initialChats[sub.id] = [
          {
            id: `welcome-${sub.id}`,
            role: "model",
            text: `### 💡 Simple Explanation\n\nHello there! I am **LearnMate**, your interactive step-by-step AI Tutor. I am passionate about making ${sub.id} simple and interesting.\n\nTell me what topic you are working on, or choose one of the suggested prompts. Let's build your skills!\n\n### 📝 Quick Check\nReady to put your brain to the test? Ask me to "quiz me" or head over to the **Quiz Zone** tab above!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      });
      setMessagesBySubject(initialChats);
      localStorage.setItem("learnmate_chats", JSON.stringify(initialChats));
    }
  }, []);

  // Sync state helpers
  const saveStatsToLocal = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem("learnmate_stats", JSON.stringify(newStats));
  };

  const saveNotesToLocal = (newNotes: SavedNote[]) => {
    setSavedNotes(newNotes);
    localStorage.setItem("learnmate_notes", JSON.stringify(newNotes));
  };

  const saveAttemptsToLocal = (newAttempts: QuizAttempt[]) => {
    setQuizAttempts(newAttempts);
    localStorage.setItem("learnmate_attempts", JSON.stringify(newAttempts));
  };

  const saveChatsToLocal = (newChats: Record<string, Message[]>) => {
    setMessagesBySubject(newChats);
    localStorage.setItem("learnmate_chats", JSON.stringify(newChats));
  };

  // Scroll to chat bottom
  useEffect(() => {
    if (activeTab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesBySubject, currentSubject, activeTab, isSendingMessage]);

  // Update default inputs based on subject
  useEffect(() => {
    const defaultChips = SUGGESTED_CHIPS[currentSubject];
    if (defaultChips && defaultChips.length > 0) {
      setChatInput(defaultChips[0]);
    }
    const defaultTopics = SUGGESTED_TOPICS[currentSubject];
    if (defaultTopics && defaultTopics.length > 0) {
      setQuizTopic(defaultTopics[0]);
    }
  }, [currentSubject]);

  const currentSubjectMessages = messagesBySubject[currentSubject] || [];
  const activeSubDetails = SUBJECTS.find(s => s.id === currentSubject) || SUBJECTS[0];

  // 2. Chat Handlers
  const handleSendMessage = async (textToSend?: string) => {
    const inputMsg = textToSend || chatInput;
    if (!inputMsg.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...currentSubjectMessages, userMsg];
    const newChats = {
      ...messagesBySubject,
      [currentSubject]: updatedMessages
    };

    saveChatsToLocal(newChats);
    if (!textToSend) setChatInput("");
    setIsSendingMessage(true);
    setChatError(null);

    // If student explicitly asks for quiz
    const isQuizRequest = inputMsg.toLowerCase().includes("quiz me") || inputMsg.toLowerCase().includes("test me");
    if (isQuizRequest) {
      setTimeout(() => {
        // Tutor explains and guides them to the quiz tab
        const modelMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          role: "model",
          text: `### 📝 Quick Check\n\nI'm ready to test your skills! To start a customized interactive quiz with step-by-step solution breakdowns:\n\n1. Select the **Quiz Zone** tab at the top.\n2. Choose or enter your preferred topic.\n3. Click **Create Custom Quiz**!\n\nI'll generate beautiful multiple-choice and short answer questions!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const finalChats = {
          ...newChats,
          [currentSubject]: [...updatedMessages, modelMsg]
        };
        saveChatsToLocal(finalChats);
        setIsSendingMessage(false);
      }, 1000);
      return;
    }

    try {
      const contextMessages = updatedMessages.slice(-15).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: contextMessages,
          subject: currentSubject
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to communicate with the tutor.");
      }

      const data = await res.json();
      const modelMsg: Message = {
        id: `msg-${Date.now() + 2}`,
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalChats = {
        ...newChats,
        [currentSubject]: [...updatedMessages, modelMsg]
      };
      saveChatsToLocal(finalChats);

      // Increment questions answered stat
      saveStatsToLocal({
        ...stats,
        questionsAnswered: stats.questionsAnswered + 1,
        lastActiveDate: new Date().toDateString()
      });

    } catch (err: any) {
      console.error(err);
      setChatError(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm(`Are you sure you want to clear conversation history for ${currentSubject}?`)) {
      const initialChats = {
        ...messagesBySubject,
        [currentSubject]: [
          {
            id: `welcome-${currentSubject}`,
            role: "model",
            text: `### 💡 Simple Explanation\n\nLet's start fresh in the ${currentSubject} study room! Tell me which topics you are struggling with or pick a quick option below.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      saveChatsToLocal(initialChats);
    }
  };

  const handleSaveExplanation = (msgText: string) => {
    let noteTitle = `Tutor Explanation on ${currentSubject}`;
    const headerMatch = msgText.match(/Simple Explanation\s*\n*([\s\S]*?)(?=###|$)/i) || msgText.match(/^###\s+(.*?)(?=\n|$)/i);
    if (headerMatch && headerMatch[1]) {
      noteTitle = headerMatch[1].trim().slice(0, 50);
    }

    const isAlreadySaved = savedNotes.some(note => note.text === msgText);
    if (isAlreadySaved) {
      alert("This is already saved in your Notebook!");
      return;
    }

    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      subject: currentSubject,
      title: noteTitle,
      text: msgText,
      date: new Date().toLocaleDateString()
    };

    saveNotesToLocal([newNote, ...savedNotes]);
    alert("Saved successfully to your Study Notebook! Review it any time under the Notebook tab.");
  };

  // 3. Quiz Handlers
  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim()) return;

    setIsGeneratingQuiz(true);
    setQuizError(null);
    setActiveQuiz(null);
    setQuizComplete(false);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setQuizChecked(false);
    setIsAnswerCorrect(null);
    setSelectedMcqAnswer("");
    setShortAnswerText("");

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: currentSubject,
          topic: quizTopic
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate the quiz.");
      }

      const quizData: Quiz = await res.json();
      if (!quizData.questions || quizData.questions.length === 0) {
        throw new Error("No quiz questions were generated. Let's try again!");
      }

      setActiveQuiz(quizData);
    } catch (err: any) {
      console.error(err);
      setQuizError(err.message || "An error occurred while building your quiz.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleCheckAnswer = () => {
    if (!activeQuiz) return;
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.type === "mcq") {
      if (!selectedMcqAnswer) {
        alert("Please choose an answer option!");
        return;
      }
      correct = selectedMcqAnswer.trim().toUpperCase() === currentQuestion.correctAnswer.trim().toUpperCase();
    } else {
      if (!shortAnswerText.trim()) {
        alert("Please enter your answer!");
        return;
      }
      const prepUser = shortAnswerText.trim().toLowerCase();
      const prepCorrect = currentQuestion.correctAnswer.trim().toLowerCase();
      correct = prepUser === prepCorrect || prepCorrect.includes(prepUser) || prepUser.includes(prepCorrect);
    }

    setIsAnswerCorrect(correct);
    if (correct) {
      setCorrectCount(prev => prev + 1);
    }
    setQuizChecked(true);

    saveStatsToLocal({
      ...stats,
      questionsAnswered: stats.questionsAnswered + 1
    });
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedMcqAnswer("");
      setShortAnswerText("");
      setQuizChecked(false);
      setIsAnswerCorrect(null);
    } else {
      setQuizComplete(true);
      const score = correctCount + (isAnswerCorrect ? 1 : 0);
      const total = activeQuiz.questions.length;

      const newAttempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        title: activeQuiz.title,
        subject: currentSubject,
        topic: quizTopic,
        score: correctCount,
        total,
        date: new Date().toLocaleDateString()
      };
      
      const updatedAttempts = [newAttempt, ...quizAttempts];
      saveAttemptsToLocal(updatedAttempts);

      const totalQuizzes = stats.quizzesCompleted + 1;
      const totalScorePercent = Math.round(((stats.avgScore * stats.quizzesCompleted) + ((correctCount / total) * 100)) / totalQuizzes);

      saveStatsToLocal({
        ...stats,
        quizzesCompleted: totalQuizzes,
        avgScore: totalScorePercent,
        lastActiveDate: new Date().toDateString()
      });
    }
  };

  const handleDeleteNote = (id: string) => {
    const updated = savedNotes.filter(note => note.id !== id);
    saveNotesToLocal(updated);
  };

  const handleClearAttempts = () => {
    if (confirm("Are you sure you want to clear your quiz history?")) {
      saveAttemptsToLocal([]);
      saveStatsToLocal({
        ...stats,
        quizzesCompleted: 0,
        avgScore: 0
      });
    }
  };

  return (
    <div id="main-container" className="h-screen w-full flex bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      
      {/* MOBILE SIDEBAR OVERLAY/BACKDROP */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR: SUBJECT NAVIGATION (Theme match & Responsive Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">LM</div>
              <h1 className="text-base font-extrabold text-white tracking-tight">LearnMate AI</h1>
            </div>
            {/* Close sidebar button on mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Advanced AI Tutor</p>
        </div>
        
        {/* Subjects Selector Section */}
        <nav className="flex-1 py-4 overflow-y-auto space-y-4">
          
          {/* Capstone Project Team Quick link */}
          <div className="px-4 pb-2 border-b border-slate-800/60">
            <h2 className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-1.5">Capstone Project</h2>
            <button
              onClick={() => {
                setActiveTab("team");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 p-2 rounded text-xs cursor-pointer transition-colors ${
                activeTab === "team"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              <span className="truncate">Group 5 Dashboard</span>
            </button>
          </div>

          <div className="px-4">
            <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Academic Subjects</h2>
            <ul className="space-y-1">
              {SUBJECTS.map((sub) => {
                const isSelected = currentSubject === sub.id;
                return (
                  <li
                    key={sub.id}
                    onClick={() => {
                      setCurrentSubject(sub.id);
                      setIsSidebarOpen(false); // Auto close sidebar on mobile tap
                    }}
                    className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-indigo-600/15 text-indigo-400 font-semibold border-l-2 border-indigo-500"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{sub.emoji}</span>
                      <span>{sub.id}</span>
                    </div>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Progress / Daily Streak Sidebar Stats */}
          <div className="px-4 border-t border-slate-800/60 pt-4">
            <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Your Progress</h2>
            <div className="space-y-3 bg-slate-850 p-3 rounded-lg border border-slate-800">
              
              {/* Daily Streak */}
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                <div className="text-xs">
                  <span className="text-slate-500 font-medium">Daily Streak:</span>{" "}
                  <span className="text-white font-extrabold">{stats.streak} {stats.streak === 1 ? 'Day' : 'Days'}</span>
                </div>
              </div>

              {/* Quiz ratio */}
              <div className="text-xs">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Completed Quizzes</span>
                  <span className="text-white font-bold">{stats.quizzesCompleted}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500" 
                    style={{ width: `${Math.min(100, stats.quizzesCompleted * 20)}%` }}
                  />
                </div>
              </div>

              {/* Avg Score */}
              <div className="text-xs">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Average Grade</span>
                  <span className="text-white font-bold">{stats.avgScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${stats.avgScore}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        </nav>

        {/* Action Bottom Sidebar Button */}
        <div className="p-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => {
              setActiveTab("quiz");
              setQuizTopic(SUGGESTED_TOPICS[currentSubject]?.[0] || "");
              setActiveQuiz(null);
              setIsSidebarOpen(false); // Close sidebar
            }}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition flex items-center justify-center gap-2"
          >
            <span>📝</span> Quiz Me Now
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden min-w-0">
        
        {/* HEADER */}
        <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Hamburger Menu Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition shrink-0"
              aria-label="Open Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                <span className="truncate max-w-[80px] sm:max-w-none">{currentSubject}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-500">
                  {activeTab === "chat" ? "Tutor" : activeTab === "quiz" ? "Quiz" : activeTab === "notes" ? "Notes" : "Project Group"}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight truncate">
                {activeTab === "chat" 
                  ? `Discussing ${SUGGESTED_TOPICS[currentSubject]?.[0] || "Concepts"}` 
                  : activeTab === "quiz" 
                  ? `Interactive Quiz` 
                  : activeTab === "notes"
                  ? "Notebook"
                  : "Group 5 – AI Powered Tutoring Chatbot Project"}
              </h2>
            </div>
          </div>

          {/* Responsive Segmented Tab Buttons inside header to maximize space density */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveTab("team")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "team"
                  ? "bg-white text-indigo-600 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="sm:hidden">👥</span>
              <span className="hidden sm:inline">👥 Team Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "chat"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="sm:hidden">💬</span>
              <span className="hidden sm:inline">💬 Tutor Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "quiz"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="sm:hidden">📝</span>
              <span className="hidden sm:inline">📝 Quiz Zone</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "notes"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="sm:hidden">📓</span>
              <span className="hidden sm:inline">📓 Notebook</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* VIEW D: PROJECT TEAM PRESENTATION DASHBOARD */}
          {activeTab === "team" && (
            <div id="team-dashboard" className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
              
              {/* TOP PROFILE HERO BANNER */}
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-950">
                {/* Decorative background grid effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-400/20">
                      <GraduationCap className="h-3.5 w-3.5" /> University Capstone Project
                    </div>
                    <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                      LearnMate AI Tutor System
                    </h1>
                    <p className="text-sm font-bold text-indigo-200">
                      Group 5 – AI Powered Tutoring Chatbot Project
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                      A next-generation web-based educational portal designed to reinforce student comprehension in core high-school subjects using server-side Gemini LLMs, interactive testing, and automated learning telemetry.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 self-start md:self-center shrink-0">
                    {/* Presentation Mode Main Trigger Button */}
                    <button
                      onClick={() => {
                        setIsPresentationMode(true);
                        setPresentationSlide(0);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-indigo-950 hover:bg-indigo-50 active:bg-indigo-100 font-extrabold rounded-xl text-xs shadow-md shadow-indigo-950/20 transition-all border border-transparent scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Tv className="h-4 w-4 text-indigo-600 animate-pulse" />
                      <span>👉 Presentation Mode</span>
                    </button>
                  </div>
                </div>

                {/* Micro Stats summary footer bar */}
                <div className="mt-6 pt-5 border-t border-indigo-800/40 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                  <div>
                    <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Project Group</span>
                    <span className="text-sm font-extrabold text-white">Group 5 (Five)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Total Members</span>
                    <span className="text-sm font-extrabold text-white">6 Students</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Focus Sphere</span>
                    <span className="text-sm font-extrabold text-white">AI-Powered EdTech</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Syllabus Model</span>
                    <span className="text-sm font-extrabold text-white">Multi-Subject Core</span>
                  </div>
                </div>
              </div>

              {/* ACTION: DOWNLOAD / COPY SECTION */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Presentation Resource Hub</h3>
                    <p className="text-[10px] text-slate-400">Copy system documentation or generate presentation access links.</p>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyInfo}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Team Info!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Project Info</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-150 transition-colors shadow-sm"
                  >
                    {shareSuccess ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-indigo-600" />
                        <span>Link Shared!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ROLE HIGHLIGHT CARDS (RESPONSIVE GRID) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-indigo-500" /> Team Members & Role Highlight
                  </h2>
                  <span className="text-[10px] font-bold text-slate-400">Hover or tap to reveal accomplishments</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TEAM_MEMBERS.map((member, idx) => {
                    const MemberIcon = member.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3, transition: { duration: 0.15 } }}
                        className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col overflow-hidden"
                      >
                        {/* Card Upper Accent Banner */}
                        <div className={`h-1.5 bg-gradient-to-r ${member.color}`} />
                        
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="flex items-start gap-4">
                            {/* Avatar placeholder with icon */}
                            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                              <MemberIcon className="h-5 w-5" />
                            </div>
                            
                            <div className="min-w-0">
                              <h3 className="text-xs font-extrabold text-slate-900 tracking-tight uppercase truncate" title={member.name}>
                                {member.name}
                              </h3>
                              <p className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/50 inline-block mt-1">
                                {member.id}
                              </p>
                              <p className="text-xs font-bold text-slate-700 mt-2">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          {/* Member Key Accomplishments details */}
                          <div className="pt-3 border-t border-slate-100">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Presentation Contributions</span>
                            <ul className="mt-2 space-y-1.5">
                              {member.contributions.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-normal">
                                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* RESPONSIVE CLEAN MEMBERS TABLE SECTION */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Group Registry Index</h3>
                    <p className="text-[10px] text-slate-400">Verification log of active contributors and credential assignments.</p>
                  </div>
                  <div className="text-[10px] font-mono font-bold bg-slate-150 text-slate-600 px-2.5 py-1 rounded border border-slate-200">
                    TOTAL REGISTERED: 06
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        <th className="py-3 px-5">Member Name</th>
                        <th className="py-3 px-5">Student Identification</th>
                        <th className="py-3 px-5">Primary Project Scope</th>
                        <th className="py-3 px-5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {TEAM_MEMBERS.map((member, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-slate-700">
                          <td className="py-3 px-5 font-bold text-slate-900 uppercase">
                            {member.name}
                          </td>
                          <td className="py-3 px-5 font-mono text-slate-600 text-[11px]">
                            {member.id}
                          </td>
                          <td className="py-3 px-5 text-slate-600 font-medium">
                            {member.role}
                          </td>
                          <td className="py-3 px-5 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* VIEW A: CHAT ROOM */}
          {activeTab === "chat" && (
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Side: Stream of messages */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden border-r border-slate-100">
                {/* Chat header area */}
                <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/60 text-xs font-medium text-slate-500">
                  <span>Step-by-step Study Room & Homework Help</span>
                  <button
                    onClick={handleClearHistory}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-bold hover:bg-rose-50 px-2 py-1 rounded transition"
                  >
                    Clear History
                  </button>
                </div>

                {/* Messages Panel */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
                  {currentSubjectMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 sm:gap-3 max-w-[95%] sm:max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      {/* Avatar badge */}
                      <div className={`h-7 w-7 rounded-lg flex items-center justify-center shadow-sm shrink-0 font-bold text-[10px] ${
                        msg.role === "user" ? "bg-slate-800 text-white" : "bg-indigo-600 text-white"
                      }`}>
                        {msg.role === "user" ? "S" : "LM"}
                      </div>

                      {/* Content Bubble */}
                      <div className="space-y-1">
                        <div className={`p-4 rounded-2xl border ${
                          msg.role === "user"
                            ? "bg-slate-100 border-slate-200 text-slate-800"
                            : "bg-white border-slate-200 shadow-sm"
                        }`}>
                          <div 
                            className="space-y-2 text-xs markdown-body prose" 
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} 
                          />

                          {/* Save To Notebook Action Link */}
                          {msg.role === "model" && !msg.id.startsWith("welcome") && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400 font-semibold">Step-by-step breakdown helper</span>
                              <button
                                onClick={() => handleSaveExplanation(msg.text)}
                                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-extrabold hover:bg-indigo-50 px-2 py-1 rounded transition"
                              >
                                <Lightbulb className="h-3 w-3" />
                                Save to Notebook
                              </button>
                            </div>
                          )}
                        </div>
                        <p className={`text-[9px] text-slate-400 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Sending Spinner */}
                  {isSendingMessage && (
                    <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                      <div className="h-7 w-7 rounded-lg flex items-center justify-center bg-indigo-600 text-white shadow shrink-0 font-bold text-[10px]">
                        LM
                      </div>
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm text-slate-500 text-xs flex items-center gap-2">
                        <RefreshCw className="h-3 w-3 animate-spin text-indigo-600" />
                        <span>LearnMate is researching and formatting the lesson...</span>
                      </div>
                    </div>
                  )}

                  {/* Error Notification */}
                  {chatError && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-2 max-w-[90%] mx-auto text-xs">
                      <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-red-800">
                        <p className="font-bold">Tutor Error</p>
                        <p className="mt-1">{chatError}</p>
                        {chatError.includes("GEMINI_API_KEY") && (
                          <p className="mt-2 text-[10px] bg-white p-2 rounded border border-red-100 text-slate-600 leading-relaxed">
                            To use real-time academic lessons, define your <strong>GEMINI_API_KEY</strong> secret value inside the secrets configurations.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick Chips Selector bottom drawer */}
                <div className="px-4 py-2 sm:px-5 sm:py-2.5 border-t border-slate-100 bg-slate-50/60 shrink-0">
                  <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5" /> Suggested Quick Prompts
                  </p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {SUGGESTED_CHIPS[currentSubject]?.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setChatInput(chip);
                          handleSendMessage(chip);
                        }}
                        className="text-[11px] bg-white hover:bg-slate-150 border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-left font-medium transition shrink-0 max-w-[240px] sm:max-w-sm truncate shadow-sm active:bg-slate-100 min-h-[36px]"
                        title={chip}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Text Box Footer Area */}
                <div className="p-2 sm:p-3 border-t border-slate-200 bg-white shrink-0 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder={`Ask on ${currentSubject}...`}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 min-h-[38px]"
                    disabled={isSendingMessage}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 sm:px-4 flex items-center justify-center gap-1.5 transition text-xs font-bold shrink-0 shadow-sm min-h-[38px]"
                    disabled={isSendingMessage}
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Ask Tutor</span>
                  </button>
                </div>

              </div>

              {/* Right Sidebar Widget for Chat Room (High Density Layout) */}
              <div className="hidden lg:flex w-72 bg-slate-50 flex-col p-5 shrink-0 space-y-4 border-l border-slate-100 overflow-y-auto">
                {/* Daily tip card */}
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-4 rounded-xl shadow-md space-y-2">
                  <span className="text-[9px] font-bold tracking-widest uppercase opacity-75">Tutor Learning Tip</span>
                  <h4 className="text-xs font-bold leading-tight">Mastery over Memorization</h4>
                  <p className="text-[11px] text-indigo-100 leading-relaxed">
                    Always study the <strong>Simple Explanation</strong> and test yourself with 1 custom quiz per unit. If you get stuck, let me break it down again!
                  </p>
                </div>

                {/* Syllabus Recommended Topics Box */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Curriculum Syllabus</h3>
                  <div className="space-y-1.5">
                    {SUGGESTED_TOPICS[currentSubject]?.map((topic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuizTopic(topic);
                          setActiveTab("quiz");
                          setActiveQuiz(null);
                        }}
                        className="w-full text-left p-2 rounded text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 border border-transparent hover:border-slate-100 transition flex items-center justify-between group font-medium"
                      >
                        <span className="truncate">{topic}</span>
                        <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Score stats helper widget */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-slate-400 font-medium text-[10px]">Average Quiz Grade</p>
                      <p className="font-bold text-slate-800">{stats.avgScore}%</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab("notes")} 
                    className="text-[10px] text-indigo-600 hover:underline font-bold"
                  >
                    View Scores
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* VIEW B: QUIZ ZONE */}
          {activeTab === "quiz" && (
            <div className="flex-1 bg-white flex flex-col overflow-hidden">
              
              {/* 1. Quiz Setup Form */}
              {!activeQuiz && !isGeneratingQuiz && (
                <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-center items-center">
                  <div className="max-w-xl w-full space-y-6 text-center">
                    <div className="bg-indigo-50 p-4 rounded-2xl w-fit mx-auto shadow-sm border border-indigo-100">
                      <GraduationCap className="h-8 w-8 text-indigo-600 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 font-sans">Interactive Assessment Challenge</h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                        LearnMate will compose a structured 3 to 5 question assessment testing your chosen topic. Includes real-time grading and step-by-step solutions!
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Study Unit & Subject</label>
                        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg font-semibold text-xs text-slate-700 shadow-sm">
                          <span className="text-sm">{activeSubDetails.emoji}</span>
                          {currentSubject}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Enter Target Quiz Topic</label>
                        <input
                          type="text"
                          value={quizTopic}
                          onChange={(e) => setQuizTopic(e.target.value)}
                          placeholder="e.g. Laws of Thermodynamics, Trigonometric Identities, Hamlet Act 1..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold"
                        />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Recommended Syllabus Topics:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTED_TOPICS[currentSubject]?.map((topic, idx) => (
                            <button
                              key={idx}
                              onClick={() => setQuizTopic(topic)}
                              className={`text-[11px] px-2.5 py-1 rounded border font-semibold transition ${
                                quizTopic === topic
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                                  : "bg-white border-slate-200 hover:bg-slate-100 text-slate-600"
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateQuiz}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white rounded-lg font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition"
                    >
                      <Sparkles className="h-4 w-4" />
                      Create Custom Quiz
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Generating Quiz Loading Screen */}
              {isGeneratingQuiz && (
                <div className="flex-1 p-6 md:p-12 flex flex-col justify-center items-center text-center">
                  <div className="max-w-sm space-y-4">
                    <div className="relative w-12 h-12 mx-auto">
                      <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                      <Sparkles className="h-4 w-4 text-violet-500 absolute top-4 left-4 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-950">Drafting Customized Quiz...</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        LearnMate AI is parsing educational curriculum databases and generating questions with step-by-step explanation sheets.
                      </p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1">
                      <motion.div 
                        className="bg-indigo-600 h-1 rounded-full"
                        initial={{ width: "5%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 12, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Quiz Generation Error */}
              {quizError && (
                <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
                  <div className="max-w-sm space-y-4">
                    <XCircle className="h-10 w-10 text-rose-500 mx-auto" />
                    <h3 className="text-sm font-bold text-slate-900">Quiz Generation Failed</h3>
                    <p className="text-xs text-slate-500">{quizError}</p>
                    {quizError.includes("GEMINI_API_KEY") && (
                      <p className="text-[10px] text-red-600 bg-red-50 p-2.5 rounded border border-red-200 text-left">
                        Please define your <strong>GEMINI_API_KEY</strong> secret value in the Google AI Studio secrets configuration to allow quiz generation.
                      </p>
                    )}
                    <button
                      onClick={() => setQuizError(null)}
                      className="bg-slate-900 hover:bg-slate-800 text-white py-1.5 px-3 rounded font-bold text-xs"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Active Quiz Playing View */}
              {activeQuiz && !quizComplete && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  
                  {/* Quiz header status */}
                  <div className="px-6 py-3 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest">{currentSubject} Assessment</p>
                      <h3 className="font-bold text-slate-900 truncate max-w-md">{activeQuiz.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-700">Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</p>
                      <p className="text-[10px] text-slate-400">Current Score: {correctCount}/{activeQuiz.questions.length}</p>
                    </div>
                  </div>

                  {/* Question and Option lists */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    
                    {/* The Question card */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <span className="text-[9px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded uppercase tracking-wider mb-2.5 inline-block">
                        {activeQuiz.questions[currentQuestionIndex].type === "mcq" ? "Multiple Choice" : "Short Answer"}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                        {activeQuiz.questions[currentQuestionIndex].question}
                      </h4>
                    </div>

                    {/* Inputs */}
                    {activeQuiz.questions[currentQuestionIndex].type === "mcq" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                          const optionCode = option.trim().match(/^([A-D])\)/)?.[1] || ["A", "B", "C", "D"][idx];
                          const isSelected = selectedMcqAnswer === optionCode;
                          const isCorrectAnswer = optionCode === activeQuiz.questions[currentQuestionIndex].correctAnswer;
                          
                          let optionStyle = "border-slate-250 bg-white hover:bg-slate-50 text-slate-700";
                          if (isSelected) {
                            optionStyle = "border-slate-950 bg-slate-50 font-bold text-slate-950 ring-1 ring-slate-950";
                          }
                          if (quizChecked) {
                            if (isCorrectAnswer) {
                              optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-500";
                            } else if (isSelected) {
                              optionStyle = "border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500";
                            } else {
                              optionStyle = "border-slate-200 bg-white opacity-50 text-slate-400";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={quizChecked}
                              onClick={() => setSelectedMcqAnswer(optionCode)}
                              className={`p-3.5 rounded-lg border text-left flex items-start gap-2.5 transition-all text-xs font-semibold ${optionStyle}`}
                            >
                              <span className={`h-5 w-5 shrink-0 rounded flex items-center justify-center font-bold text-[10px] ${
                                isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                              }`}>
                                {optionCode}
                              </span>
                              <span className="flex-1">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-w-xl">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Answer</label>
                        <input
                          type="text"
                          disabled={quizChecked}
                          value={shortAnswerText}
                          onChange={(e) => setShortAnswerText(e.target.value)}
                          placeholder="Type your brief answer or key word/phrase here..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 font-semibold"
                        />
                      </div>
                    )}

                    {/* Grading results block */}
                    <AnimatePresence>
                      {quizChecked && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border flex flex-col gap-2 ${
                            isAnswerCorrect
                              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                              : "bg-amber-50 border-amber-200 text-amber-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isAnswerCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                            )}
                            <h5 className="font-extrabold text-xs sm:text-sm">
                              {isAnswerCorrect ? "Brilliant! Correct Answer!" : `Excellent try! (Correct Answer: ${activeQuiz.questions[currentQuestionIndex].correctAnswer})`}
                            </h5>
                          </div>
                          
                          <div className="text-[11px] leading-relaxed text-slate-700 pt-2 border-t border-slate-200">
                            <p className="font-bold text-slate-800 mb-1">📝 Step-by-Step Breakdown:</p>
                            <div className="space-y-1" dangerouslySetInnerHTML={{ __html: renderMarkdown(activeQuiz.questions[currentQuestionIndex].explanation) }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Quiz action Footer */}
                  <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/60 shrink-0 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (confirm("Quit assessment? Current scores won't be saved.")) {
                          setActiveQuiz(null);
                        }
                      }}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700 transition"
                    >
                      Quit Quiz
                    </button>

                    <div className="flex gap-2">
                      {!quizChecked ? (
                        <button
                          onClick={handleCheckAnswer}
                          className="bg-slate-900 hover:bg-slate-800 text-white rounded px-4 py-1.5 text-xs font-bold transition shadow-sm"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-1.5 text-xs font-bold transition shadow-sm flex items-center gap-1"
                        >
                          <span>{currentQuestionIndex + 1 === activeQuiz.questions.length ? "Finish Assessment" : "Next Question"}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* 5. Scorecard Completed State */}
              {quizComplete && activeQuiz && (
                <div className="flex-1 p-6 md:p-12 overflow-y-auto flex flex-col justify-center items-center text-center">
                  <div className="max-w-md w-full space-y-5">
                    <div className="bg-amber-100 p-3.5 rounded-2xl w-fit mx-auto border border-amber-200 shadow-sm">
                      <Trophy className="h-10 w-10 text-amber-500" />
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Challenge Cleared</span>
                      <h3 className="text-base font-extrabold text-slate-900">{activeQuiz.title}</h3>
                      <p className="text-xs text-slate-500">You completed the session. Review your grading and comments.</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-around gap-2 text-xs">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Score</p>
                        <p className="text-2xl font-extrabold text-slate-950 mt-1">{correctCount} / {activeQuiz.questions.length}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Grade Score</p>
                        <p className="text-2xl font-extrabold text-emerald-600 mt-1">{Math.round((correctCount / activeQuiz.questions.length) * 100)}%</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic max-w-sm mx-auto bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                      {correctCount === activeQuiz.questions.length ? (
                        "🏆 Phenomenal! You reached perfect understanding. LearnMate is incredibly proud of your learning progress!"
                      ) : correctCount >= activeQuiz.questions.length / 2 ? (
                        "🌟 Excellent work! You have robust foundations on this subject. Review the notebook to master remaining concepts."
                      ) : (
                        "📚 Great start! Mistakes are the absolute best way to learn. Review each solution step and retry to clear unit!"
                      )}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        onClick={() => {
                          setActiveQuiz(null);
                          setQuizComplete(false);
                        }}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded text-xs font-bold transition"
                      >
                        Try Another Topic
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("chat");
                          setChatInput(`Explain more concepts about "${quizTopic}" so I can improve my score!`);
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded text-xs font-bold shadow-sm transition"
                      >
                        Discuss in Chat Room
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW C: NOTES, SCOREBOARD AND HISTORIC LOGS */}
          {activeTab === "notes" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* High Density metrics row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Active Streak */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
                  <div className="bg-amber-50 p-2.5 rounded-lg text-amber-500 border border-amber-100">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Continuous Streak</p>
                    <p className="text-base font-bold text-slate-800">{stats.streak} {stats.streak === 1 ? 'Day' : 'Days'}</p>
                  </div>
                </div>

                {/* Quizzes Count */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
                  <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-500 border border-indigo-100">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quizzes Completed</p>
                    <p className="text-base font-bold text-slate-800">{stats.quizzesCompleted}</p>
                  </div>
                </div>

                {/* Avg Grade */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
                  <div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-500 border border-emerald-100">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Score</p>
                    <p className="text-base font-bold text-slate-800">{stats.avgScore}%</p>
                  </div>
                </div>

              </div>

              {/* Notebook & Score log splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Notebook section (Left 7 cols) */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-7 flex flex-col min-h-[350px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs font-semibold">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-500" /> Personal Saved Explanations
                    </h3>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">{savedNotes.length} saved</span>
                  </div>

                  <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {savedNotes.length === 0 ? (
                      <div className="text-center py-10 space-y-2">
                        <Lightbulb className="h-7 w-7 mx-auto text-slate-300" />
                        <p className="text-xs font-bold text-slate-700">Your Notebook is empty</p>
                        <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                          While talking to the AI Tutor, look for "Save to Notebook" link below any model lesson explanation to capture ideas here!
                        </p>
                      </div>
                    ) : (
                      savedNotes.map((note) => (
                        <div key={note.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 relative group hover:border-slate-300 transition">
                          
                          {/* Trash button */}
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="absolute top-3.5 right-3.5 text-slate-300 hover:text-rose-600 p-1 rounded hover:bg-white transition"
                            title="Delete note"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <div className="flex items-center gap-2 mb-2 pr-6">
                            <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {note.subject}
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium">{note.date}</span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 pr-6 mb-2">{note.title}</h4>
                          <div className="text-[11px] text-slate-600 bg-white p-3.5 rounded border border-slate-200 shadow-inner overflow-hidden text-ellipsis max-h-40 overflow-y-auto">
                            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(note.text) }} />
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab("chat");
                              setCurrentSubject(note.subject);
                              setChatInput(`Let's discuss more about: ${note.title}`);
                            }}
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center gap-0.5 mt-2.5 transition"
                          >
                            Discuss this concept in chat room <ChevronRight className="h-3 w-3" />
                          </button>

                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quiz score history (Right 5 cols) */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-5 flex flex-col min-h-[350px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs font-semibold">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" /> Assessment Scoreboard
                    </h3>
                    {quizAttempts.length > 0 && (
                      <button
                        onClick={handleClearAttempts}
                        className="text-[10px] text-rose-600 hover:text-rose-700 font-bold"
                      >
                        Clear logs
                      </button>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {quizAttempts.length === 0 ? (
                      <div className="text-center py-10 space-y-2">
                        <ClipboardList className="h-7 w-7 mx-auto text-slate-300" />
                        <p className="text-xs font-bold text-slate-700">No attempts logged yet</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Complete dynamic quizzes under the Quiz Zone to record scores here!
                        </p>
                      </div>
                    ) : (
                      quizAttempts.map((attempt) => {
                        const scorePercent = Math.round((attempt.score / attempt.total) * 100);
                        let gradeTheme = "bg-rose-50 text-rose-700 border-rose-200";
                        if (scorePercent >= 85) gradeTheme = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        else if (scorePercent >= 55) gradeTheme = "bg-amber-50 text-amber-700 border-amber-200";

                        return (
                          <div key={attempt.id} className="p-3 border border-slate-200 rounded bg-slate-50 flex items-center justify-between text-xs hover:border-slate-300 transition">
                            <div className="min-w-0 pr-2">
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none block">{attempt.subject}</span>
                              <h4 className="font-bold text-slate-800 truncate mt-0.5" title={attempt.title}>{attempt.title}</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5 truncate">Topic: {attempt.topic} • {attempt.date}</p>
                            </div>
                            <div className={`px-2 py-1 rounded border text-center shrink-0 flex flex-col items-center justify-center min-w-12 ${gradeTheme}`}>
                              <span className="text-xs font-extrabold leading-none">{attempt.score}/{attempt.total}</span>
                              <span className="text-[8px] font-bold mt-1 tracking-wider uppercase leading-none">{scorePercent}%</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Minimal compact footer */}
        <footer className="h-10 bg-white border-t border-slate-200 px-6 shrink-0 flex items-center justify-between text-[10px] text-slate-400">
          <span>LearnMate Step-by-Step Tutor • 2026 Academic Edition</span>
          <span>Powered by Gemini AI Model</span>
        </footer>

      </main>

      {/* PRESENTATION MODE FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isPresentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 text-slate-100 z-[100] flex flex-col font-sans overflow-hidden select-none"
          >
            {/* Presentation Header */}
            <header className="h-16 border-b border-slate-850 px-4 sm:px-6 shrink-0 flex items-center justify-between bg-slate-900/60 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-indigo-500 flex items-center justify-center text-white font-black text-sm">LM</div>
                <div>
                  <h1 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">Group 5 Capstone Project Defense</h1>
                  <p className="text-[9px] sm:text-[10px] text-indigo-400 font-bold uppercase tracking-widest">LearnMate AI Tutor Presentation</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsPresentationMode(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-950/40 hover:bg-rose-900/50 active:bg-rose-800/60 text-rose-300 font-bold rounded-lg border border-rose-900/30 text-xs transition"
                aria-label="Exit presentation mode"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Exit Mode</span>
              </button>
            </header>

            {/* Presentation Body: Responsive Sidebar + Content layout */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Slide directory left drawer - hidden on extremely narrow phone screens, scrollable */}
              <aside className="w-56 border-r border-slate-900 bg-slate-900/40 shrink-0 overflow-y-auto hidden md:block">
                <div className="p-4 border-b border-slate-900">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">Presentation Deck</span>
                </div>
                <nav className="p-2 space-y-1">
                  {/* Overview slide item */}
                  <button
                    onClick={() => setPresentationSlide(0)}
                    className={`w-full text-left p-3 rounded-lg text-xs font-bold transition flex items-center gap-2.5 ${
                      presentationSlide === 0
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Project Overview</span>
                  </button>
                  
                  {/* Individual team slides */}
                  {TEAM_MEMBERS.map((member, idx) => {
                    const MemberIcon = member.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => setPresentationSlide(idx + 1)}
                        className={`w-full text-left p-3 rounded-lg text-xs font-bold transition flex items-center gap-2.5 ${
                          presentationSlide === idx + 1
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/25"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }`}
                      >
                        <div className={`p-1 rounded bg-slate-800 ${presentationSlide === idx + 1 ? "bg-indigo-50 text-white" : "text-slate-300"}`}>
                          <MemberIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="truncate">{member.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* MAIN ACTIVE SLIDE SCREEN AREA */}
              <div className="flex-1 flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 sm:p-10 overflow-y-auto relative">
                
                {/* Background ambient logo watermark */}
                <div className="absolute right-10 bottom-10 text-white/[0.02] font-black text-9xl tracking-tighter select-none pointer-events-none hidden lg:block">
                  LM.AI
                </div>

                <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {presentationSlide === 0 ? (
                      /* SLIDE 0: PROJECT OVERVIEW AND CREDITS */
                      <motion.div
                        key="slide-overview"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 sm:space-y-8"
                      >
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                            <Sparkle className="h-4 w-4 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} /> SYSTEM DEMO & OVERVIEW
                          </span>
                          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                            LearnMate AI Tutor
                          </h2>
                          <p className="text-lg sm:text-2xl font-semibold text-indigo-300">
                            Group 5 – AI Powered Tutoring Chatbot Project
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-850">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technical Core Stack</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Leverages Gemini AI on the backend for multi-subject tutoring logic, rendering markdown code, executing standard quizzes, maintaining user scoreboard history, and persistent client-side notebooks.
                            </p>
                          </div>
                          
                          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-850">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Academic Alignment</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Designed to mimic real syllabus materials, offering continuous daily streak tracking, interactive question-by-question explanations, and dedicated subject-specific tutor models.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between text-[11px] text-slate-500">
                          <span>UNIVERSITY CAPSTONE PROJECT</span>
                          <span>GROUP 5 PRESENTATION</span>
                        </div>
                      </motion.div>
                    ) : (
                      /* SLIDE 1-6: INDIVIDUAL CONTRIBUTOR PROFILE */
                      (() => {
                        const member = TEAM_MEMBERS[presentationSlide - 1];
                        const MemberIcon = member.icon;
                        return (
                          <motion.div
                            key={`slide-member-${presentationSlide}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 sm:space-y-8"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-5 border-b border-slate-900">
                              <div className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white shadow-xl shrink-0`}>
                                <MemberIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] sm:text-xs font-mono text-indigo-400 font-extrabold tracking-widest bg-indigo-950/50 border border-indigo-900 px-3 py-1 rounded-md">
                                  ID: {member.id}
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight pt-1">
                                  {member.name}
                                </h2>
                                <p className="text-sm sm:text-lg text-slate-300 font-semibold tracking-wide">
                                  {member.role}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">Core Presentation Deliverables</h3>
                              <ul className="grid grid-cols-1 gap-3 pt-1">
                                {member.contributions.map((bullet, bulletIdx) => (
                                  <li 
                                    key={bulletIdx} 
                                    className="bg-slate-900/30 p-4 rounded-xl border border-slate-850 flex items-start gap-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                                  >
                                    <span className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0 shadow-lg shadow-indigo-500/50" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500">
                              <span>MEMBER {presentationSlide} OF 6</span>
                              <span>GROUP 5 REGISTRY</span>
                            </div>
                          </motion.div>
                        );
                      })()
                    )}
                  </AnimatePresence>
                </div>

                {/* Presentation footer control bar */}
                <div className="mt-auto pt-6 border-t border-slate-900 flex items-center justify-between gap-4">
                  {/* Mobile active indicator dot rail */}
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => setPresentationSlide(0)}
                      className={`h-2 rounded-full transition-all ${presentationSlide === 0 ? "w-6 bg-indigo-500" : "w-2 bg-slate-800 hover:bg-slate-700"}`}
                      title="Overview"
                    />
                    {TEAM_MEMBERS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPresentationSlide(idx + 1)}
                        className={`h-2 rounded-full transition-all ${presentationSlide === idx + 1 ? "w-6 bg-indigo-500" : "w-2 bg-slate-800 hover:bg-slate-700"}`}
                        title={`Member ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPresentationSlide(prev => Math.max(0, prev - 1))}
                      disabled={presentationSlide === 0}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-lg text-xs border border-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setPresentationSlide(prev => Math.min(TEAM_MEMBERS.length, prev + 1))}
                      disabled={presentationSlide === TEAM_MEMBERS.length}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-lg text-xs transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Next Slide →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
