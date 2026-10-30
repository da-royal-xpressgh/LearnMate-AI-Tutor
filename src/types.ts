export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "short";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  title: string;
  subject: string;
  topic: string;
  score: number;
  total: number;
  date: string;
}

export interface SavedNote {
  id: string;
  subject: string;
  title: string;
  text: string;
  date: string;
}

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  quizzesCompleted: number;
  avgScore: number;
  questionsAnswered: number;
}
