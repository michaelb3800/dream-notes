import { create } from 'zustand';
import { QuizState, Quiz } from '../types';
import { apiService } from '../services/api';

const useQuizStore = create<QuizState & {
  fetchQuizzes: (noteId: string) => Promise<void>;
  generateQuiz: (noteId: string) => Promise<void>;
  updateQuiz: (id: string, quiz: Partial<Quiz>) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  selectQuiz: (quiz: Quiz | null) => void;
}>((set, get) => ({
  quizzes: [],
  currentQuiz: null,
  isLoading: false,
  error: null,

  fetchQuizzes: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getQuizzes(noteId);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set({ quizzes: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch quizzes', isLoading: false });
    }
  },

  generateQuiz: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.generateQuiz(noteId);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set({ currentQuiz: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to generate quiz', isLoading: false });
    }
  },

  updateQuiz: async (id, quiz) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.updateQuiz(id, quiz);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set((state) => ({
          quizzes: state.quizzes.map((q) => (q.id === id ? response.data! : q)),
          currentQuiz: state.currentQuiz?.id === id ? response.data! : state.currentQuiz,
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update quiz', isLoading: false });
    }
  },

  deleteQuiz: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.deleteQuiz(id);
      if (response.error) {
        throw new Error(response.error);
      }
      set((state) => ({
        quizzes: state.quizzes.filter((q) => q.id !== id),
        currentQuiz: state.currentQuiz?.id === id ? null : state.currentQuiz,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete quiz', isLoading: false });
    }
  },

  selectQuiz: (quiz) => {
    set({ currentQuiz: quiz });
  },
}));

export default useQuizStore; 