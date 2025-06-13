import { create } from 'zustand';
import { FlashcardsState, Flashcard } from '../types';
import { apiService } from '../services/api';

const useFlashcardsStore = create<FlashcardsState & {
  fetchFlashcards: (noteId: string) => Promise<void>;
  generateFlashcards: (noteId: string) => Promise<void>;
  updateFlashcard: (id: string, flashcard: Partial<Flashcard>) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
}>((set, get) => ({
  flashcards: [],
  isLoading: false,
  error: null,

  fetchFlashcards: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getFlashcards(noteId);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set({ flashcards: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch flashcards', isLoading: false });
    }
  },

  generateFlashcards: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.generateFlashcards(noteId);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set({ flashcards: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to generate flashcards', isLoading: false });
    }
  },

  updateFlashcard: async (id, flashcard) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.updateFlashcard(id, flashcard);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set((state) => ({
          flashcards: state.flashcards.map((f) => (f.id === id ? response.data! : f)),
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update flashcard', isLoading: false });
    }
  },

  deleteFlashcard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.deleteFlashcard(id);
      if (response.error) {
        throw new Error(response.error);
      }
      set((state) => ({
        flashcards: state.flashcards.filter((f) => f.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete flashcard', isLoading: false });
    }
  },
}));

export default useFlashcardsStore; 