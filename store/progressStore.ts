import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, QuizScore, Progress } from '@/types';
import { mockUserProgress } from '@/mocks/user';
import { api } from '../services/api';

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  
  // Progress actions
  fetchProgress: (userId: string) => Promise<void>;
  addXP: (amount: number) => void;
  updateMasteryScore: (noteId: string, score: number) => void;
  addQuizScore: (quizScore: QuizScore) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const useProgressStore = create<ProgressState & {
  updateProgress: (userId: string, progress: Partial<UserProgress>) => Promise<void>;
}>((set, get) => ({
  progress: null,
  isLoading: false,
  error: null,

  fetchProgress: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getProgress(userId);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        // Convert Progress to UserProgress
        const userProgress: UserProgress = {
          ...response.data,
          totalNotes: response.data.totalNotes || 0,
          totalFlashcards: response.data.totalFlashcards || 0,
          totalQuizzes: response.data.totalQuizzes || 0,
          totalPracticeProblems: response.data.totalPracticeProblems || 0,
          studyStreak: response.data.studyStreak || 0,
        };
        set({ progress: userProgress, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch progress', isLoading: false });
    }
  },

  updateProgress: async (userId, progress) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.updateProgress(userId, progress);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        // Convert Progress to UserProgress
        const userProgress: UserProgress = {
          ...response.data,
          totalNotes: response.data.totalNotes || 0,
          totalFlashcards: response.data.totalFlashcards || 0,
          totalQuizzes: response.data.totalQuizzes || 0,
          totalPracticeProblems: response.data.totalPracticeProblems || 0,
          studyStreak: response.data.studyStreak || 0,
        };
        set({ progress: userProgress, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update progress', isLoading: false });
    }
  },

  addXP: (amount: number) => {
    const { progress } = get();
    if (!progress) return;

    const totalXP = progress.xp + amount;
    const level = Math.floor(Math.sqrt(totalXP / 10));

    set({
      progress: {
        ...progress,
        xp: totalXP,
        level,
      },
    });
  },

  updateMasteryScore: (noteId: string, score: number) => {
    const { progress } = get();
    if (!progress) return;
    
    set({
      progress: {
        ...progress,
        masteryScores: {
          ...progress.masteryScores,
          [noteId]: score,
        },
      },
    });
  },

  addQuizScore: (quizScore: QuizScore) => {
    const { progress } = get();
    if (!progress) return;
    
    set({
      progress: {
        ...progress,
        quizScores: [...progress.quizScores, quizScore],
      },
    });
    
    // Add XP based on quiz performance
    const xpGained = Math.round((quizScore.score / quizScore.totalQuestions) * 100);
    get().addXP(xpGained);
  },

  incrementStreak: () => {
    const { progress } = get();
    if (!progress) return;
    
    // Check if the last active date was yesterday
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastActiveDate = new Date(progress.lastActive);
    
    // Reset dates to midnight for comparison
    yesterday.setHours(0, 0, 0, 0);
    lastActiveDate.setHours(0, 0, 0, 0);
    
    // If last active was yesterday, increment streak
    // If last active was today, keep streak the same
    // Otherwise, reset streak to 1
    
    let newStreak = progress.streak;
    
    if (lastActiveDate.getTime() === yesterday.getTime()) {
      // Last active was yesterday, increment streak
      newStreak = progress.streak + 1;
    } else if (lastActiveDate.getTime() < yesterday.getTime()) {
      // Last active was before yesterday, reset streak
      newStreak = 1;
    }
    
    set({
      progress: {
        ...progress,
        streak: newStreak,
        lastActive: now.toISOString(),
      },
    });
    
    // Add XP for maintaining streak
    if (newStreak > progress.streak) {
      get().addXP(10 * newStreak); // More XP for longer streaks
    }
  },

  resetStreak: () => {
    const { progress } = get();
    if (!progress) return;
    
    set({
      progress: {
        ...progress,
        streak: 0,
        lastActive: new Date().toISOString(),
      },
    });
  },
}));

export default useProgressStore;