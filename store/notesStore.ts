import { create } from 'zustand';
import { NotesState, Note } from '../types';
import { apiService } from '../services/api';

const useNotesStore = create<NotesState & {
  fetchNotes: () => Promise<void>;
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  selectNote: (note: Note | null) => void;
}>((set, get) => ({
  notes: [],
  selectedNote: null,
  isLoading: false,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getNotes();
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set({ notes: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch notes', isLoading: false });
    }
  },

  createNote: async (note) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.createNote(note);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set((state) => ({
          notes: [...state.notes, response.data!],
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create note', isLoading: false });
    }
  },

  updateNote: async (id, note) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.updateNote(id, note);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? response.data! : n)),
          selectedNote: state.selectedNote?.id === id ? response.data! : state.selectedNote,
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update note', isLoading: false });
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.deleteNote(id);
      if (response.error) {
        throw new Error(response.error);
      }
      set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
        selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete note', isLoading: false });
    }
  },

  selectNote: (note) => {
    set({ selectedNote: note });
  },
}));

export default useNotesStore; 