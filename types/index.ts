// User types
export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  isStudent: boolean;
  planId: 'free' | 'student' | 'standard' | 'premium';
  stripeCustomerId?: string;
  onboardComplete: boolean;
  createdAt: number;
  updatedAt: number;
}

// Notebook types
export interface Notebook {
  id: string;
  userId: string;
  title: string;
  emoji: string;
  color: string;
  course?: string;
  notesCount: number;
  lastUpdated: number;
  createdAt: number;
}

// Note types
export interface Note {
  id: string;
  notebookId: string;
  userId: string;
  title: string;
  content: string;
  summary?: string;
  needToKnow?: string[];
  extraInsights?: ExtraInsight[];
  flashcards?: Flashcard[];
  aiImages?: AIImage[];
  lastStudied?: number;
  createdAt: number;
  updatedAt: number;
}

export interface ExtraInsight {
  text: string;
  citation?: string;
}

export interface AIImage {
  url: string;
  prompt: string;
  section: string;
}

// Study tools types
export interface Flashcard {
  id: string;
  noteId: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: number;
  repetitions: number;
  easeFactor: number;
  interval: number;
  createdAt: number;
}

export interface Quiz {
  id: string;
  noteId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'shortAnswer' | 'labeling';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

// User progress types
export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: number;
  masteryScores: Record<string, number>; // noteId -> mastery percentage
  quizScores: QuizScore[];
}

export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: number;
}

// Subscription plans
export interface Plan {
  id: 'free' | 'student' | 'standard' | 'premium';
  name: string;
  price: number;
  features: string[];
  notebookLimit: number;
  aiCredits: number;
}