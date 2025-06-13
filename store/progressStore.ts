import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, QuizScore } from '@/types';
import { mockUserProgress } from '@/mocks/user';

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

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: null,
      isLoading: false,
      error: null,

      fetchProgress: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use mock data for now
          set({ 
            progress: { ...mockUserProgress, userId },
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch progress',
            isLoading: false 
          });
        }
      },

      addXP: (amount: number) => {
        const { progress } = get();
        if (!progress) return;
        
        // Calculate new XP and level
        const newXP = progress.xp + amount;
        
        // Simple level calculation (adjust as needed)
        // Level 1: 0-999 XP, Level 2: 1000-1999 XP, etc.
        const newLevel = Math.floor(newXP / 1000) + 1;
        
        set({
          progress: {
            ...progress,
            xp: newXP,
            level: newLevel,
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
            lastActive: now.getTime(),
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
            lastActive: Date.now(),
          },
        });
      },
    }),
    {
      name: 'dream-notes-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);