// User types
export type PlanType = 'free' | 'student' | 'pro';

export interface User {
  id: string;
  email: string;
  name: string;
  institution?: string;
  isStudent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Notebook types
export interface Notebook {
  id: string;
  title: string;
  description: string;
  userId: string;
  notes: string[]; // Note IDs
  createdAt: string;
  updatedAt: string;
}

// Note types
export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  notebookId?: string;
  tags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
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
  tags: string[];
  lastReviewed?: string;
  nextReview?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  noteId: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

// User progress types
export interface UserProgress {
  userId: string;
  totalNotes: number;
  totalFlashcards: number;
  totalQuizzes: number;
  totalPracticeProblems: number;
  studyStreak: number;
  lastStudyDate?: string;
  xp: number;
  level: number;
  streak: number;
  masteryScores: Record<string, number>;
  quizScores: QuizScore[];
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudySession {
  id: string;
  userId: string;
  type: 'flashcard' | 'quiz' | 'practice';
  content: Flashcard[] | Quiz | PracticeProblem[];
  score?: number;
  duration: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PracticeProblem {
  id: string;
  noteId: string;
  question: string;
  solution: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
  avatar?: string;
  lastUpdated: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  members: string[];
  notebooks: string[];
  createdAt: string;
  updatedAt: string;
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

export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface Progress {
  id: string;
  userId: string;
  xp: number;
  level: number;
  streak: number;
  masteryScores: Record<string, number>; // Note ID -> Mastery Score
  quizScores: QuizScore[];
  lastActive: string;
  totalNotes: number;
  totalFlashcards: number;
  totalQuizzes: number;
  totalPracticeProblems: number;
  studyStreak: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  isLoading: boolean;
  error: string | null;
}

export interface NotebooksState {
  notebooks: Notebook[];
  selectedNotebook: Notebook | null;
  isLoading: boolean;
  error: string | null;
}

export interface FlashcardsState {
  flashcards: Flashcard[];
  isLoading: boolean;
  error: string | null;
}

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProgressState {
  progress: Progress | null;
  isLoading: boolean;
  error: string | null;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio';
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  spacing: {
    XS: number;
    SM: number;
    MD: number;
    LG: number;
    XL: number;
  };
  borderRadius: {
    SM: number;
    MD: number;
    LG: number;
    XL: number;
  };
  fontSize: {
    XS: number;
    SM: number;
    MD: number;
    LG: number;
    XL: number;
    XXL: number;
  };
  animation: {
    DURATION: number;
  };
}