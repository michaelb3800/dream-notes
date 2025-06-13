import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notebook, Note } from '@/types';
import { mockNotebooks } from '@/mocks/notebooks';
import { mockNotes } from '@/mocks/notes';
import { apiService } from '../services/api';

interface NotebooksState {
  notebooks: Notebook[];
  notes: Note[];
  currentNotebookId: string | null;
  currentNoteId: string | null;
  isLoading: boolean;
  error: string | null;
  selectedNotebook: Notebook | null;
  
  // Notebook actions
  fetchNotebooks: () => Promise<void>;
  createNotebook: (notebook: Omit<Notebook, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNotebook: (id: string, notebook: Partial<Notebook>) => Promise<void>;
  deleteNotebook: (id: string) => Promise<void>;
  selectNotebook: (notebook: Notebook | null) => void;
  
  // Note actions
  fetchNotes: (notebookId: string) => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Note>;
  updateNote: (id: string, data: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setCurrentNote: (id: string | null) => void;
  
  // AI actions
  generateSummary: (noteId: string) => Promise<void>;
  generateFlashcards: (noteId: string) => Promise<void>;
}

const useNotebooksStore = create<NotebooksState>()(
  persist(
    (set, get) => ({
      notebooks: [],
      notes: [],
      currentNotebookId: null,
      currentNoteId: null,
      isLoading: false,
      error: null,
      selectedNotebook: null,

      fetchNotebooks: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.getNotebooks();
          if (response.error) {
            throw new Error(response.error);
          }
          if (response.data) {
            set({ notebooks: response.data, isLoading: false });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch notebooks', isLoading: false });
        }
      },

      createNotebook: async (notebook) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.createNotebook(notebook);
          if (response.error) {
            throw new Error(response.error);
          }
          if (response.data) {
            set((state) => ({
              notebooks: [...state.notebooks, response.data!],
              isLoading: false,
            }));
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create notebook', isLoading: false });
        }
      },

      updateNotebook: async (id, notebook) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.updateNotebook(id, notebook);
          if (response.error) {
            throw new Error(response.error);
          }
          if (response.data) {
            set((state) => ({
              notebooks: state.notebooks.map((n) => (n.id === id ? response.data! : n)),
              selectedNotebook: state.selectedNotebook?.id === id ? response.data! : state.selectedNotebook,
              isLoading: false,
            }));
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update notebook', isLoading: false });
        }
      },

      deleteNotebook: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.deleteNotebook(id);
          if (response.error) {
            throw new Error(response.error);
          }
          set((state) => ({
            notebooks: state.notebooks.filter((n) => n.id !== id),
            selectedNotebook: state.selectedNotebook?.id === id ? null : state.selectedNotebook,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete notebook', isLoading: false });
        }
      },

      selectNotebook: (notebook) => {
        set({ selectedNotebook: notebook });
      },

      fetchNotes: async (notebookId) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const filteredNotes = mockNotes.filter(note => note.notebookId === notebookId);
          set({ notes: filteredNotes, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch notes',
            isLoading: false 
          });
        }
      },

      addNote: async (noteData) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const newNote: Note = {
            id: `note_${Date.now()}`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            ...noteData,
          };
          
          set(state => {
            // Update the notebook's notesCount
            const updatedNotebooks = state.notebooks.map(notebook => 
              notebook.id === noteData.notebookId 
                ? { 
                    ...notebook, 
                    notesCount: notebook.notesCount + 1,
                    lastUpdated: Date.now(),
                  } 
                : notebook
            );
            
            return {
              notes: [...state.notes, newNote],
              notebooks: updatedNotebooks,
              isLoading: false,
            };
          });
          
          return newNote;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add note',
            isLoading: false 
          });
          throw error;
        }
      },

      updateNote: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => {
            const updatedNotes = state.notes.map(note => 
              note.id === id 
                ? { ...note, ...data, updatedAt: Date.now() } 
                : note
            );
            
            // Find the updated note to get its notebookId
            const updatedNote = updatedNotes.find(note => note.id === id);
            
            // Update the notebook's lastUpdated timestamp if the note was found
            const updatedNotebooks = updatedNote 
              ? state.notebooks.map(notebook => 
                  notebook.id === updatedNote.notebookId 
                    ? { ...notebook, lastUpdated: Date.now() } 
                    : notebook
                )
              : state.notebooks;
            
            return {
              notes: updatedNotes,
              notebooks: updatedNotebooks,
              isLoading: false,
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update note',
            isLoading: false 
          });
          throw error;
        }
      },

      deleteNote: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firestore
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => {
            // Find the note to get its notebookId before deleting
            const noteToDelete = state.notes.find(note => note.id === id);
            
            if (!noteToDelete) {
              return { ...state, isLoading: false };
            }
            
            // Update the notebook's notesCount
            const updatedNotebooks = state.notebooks.map(notebook => 
              notebook.id === noteToDelete.notebookId 
                ? { 
                    ...notebook, 
                    notesCount: Math.max(0, notebook.notesCount - 1),
                    lastUpdated: Date.now(),
                  } 
                : notebook
            );
            
            return {
              notes: state.notes.filter(note => note.id !== id),
              notebooks: updatedNotebooks,
              currentNoteId: state.currentNoteId === id ? null : state.currentNoteId,
              isLoading: false,
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete note',
            isLoading: false 
          });
          throw error;
        }
      },

      setCurrentNote: (id) => {
        set({ currentNoteId: id });
      },

      generateSummary: async (noteId) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would call an API to generate a summary using AI
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Find the note
          const note = get().notes.find(note => note.id === noteId);
          
          if (!note) {
            throw new Error('Note not found');
          }
          
          // Generate a mock summary
          const summary = 'This is an AI-generated summary of the note content. It highlights the key points and main ideas from the text in a concise format.';
          
          // Update the note with the summary
          await get().updateNote(noteId, { 
            summary,
            needToKnow: [
              'Key point 1 from the note',
              'Key point 2 from the note',
              'Key point 3 from the note',
            ],
            extraInsights: [
              {
                text: 'Additional insight related to the topic',
                citation: 'Source (2023)'
              }
            ]
          });
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to generate summary',
            isLoading: false 
          });
        }
      },

      generateFlashcards: async (noteId) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would call an API to generate flashcards using AI
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Find the note
          const note = get().notes.find(note => note.id === noteId);
          
          if (!note) {
            throw new Error('Note not found');
          }
          
          // Generate mock flashcards
          const flashcards = [
            {
              id: `flashcard_${Date.now()}_1`,
              noteId,
              front: 'What is the main concept discussed in this note?',
              back: 'The main concept is...',
              difficulty: 'medium' as const,
              nextReview: Date.now() + 86400000, // 1 day from now
              repetitions: 0,
              easeFactor: 2.5,
              interval: 1,
              createdAt: Date.now(),
            },
            {
              id: `flashcard_${Date.now()}_2`,
              noteId,
              front: 'Define the key term from this note',
              back: 'The key term is defined as...',
              difficulty: 'easy' as const,
              nextReview: Date.now() + 86400000, // 1 day from now
              repetitions: 0,
              easeFactor: 2.5,
              interval: 1,
              createdAt: Date.now(),
            },
          ];
          
          // Update the note with the flashcards
          await get().updateNote(noteId, { 
            flashcards: [...(note.flashcards || []), ...flashcards]
          });
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to generate flashcards',
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'dream-notes-notebooks',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useNotebooksStore;