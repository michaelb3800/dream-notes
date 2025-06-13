import { API_ENDPOINTS } from '../constants';
import { User, Note, Notebook, Flashcard, Quiz, Progress } from '../types';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

class ApiService {
  private API_BASE_URL: string;

  constructor() {
    this.API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return { data };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : 'Request failed',
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string, name: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async verifyStudent(email: string, institution: string): Promise<ApiResponse<void>> {
    return this.request(API_ENDPOINTS.AUTH.VERIFY_STUDENT, {
      method: 'POST',
      body: JSON.stringify({ email, institution }),
    });
  }

  // Note endpoints
  async getNotes(): Promise<ApiResponse<Note[]>> {
    return this.request(API_ENDPOINTS.NOTES.LIST);
  }

  async getNote(id: string): Promise<ApiResponse<Note>> {
    return this.request(API_ENDPOINTS.NOTES.DETAIL(id));
  }

  async createNote(note: Partial<Note>): Promise<ApiResponse<Note>> {
    return this.request(API_ENDPOINTS.NOTES.CREATE, {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }

  async updateNote(id: string, note: Partial<Note>): Promise<ApiResponse<Note>> {
    return this.request(API_ENDPOINTS.NOTES.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(note),
    });
  }

  async deleteNote(id: string): Promise<ApiResponse<void>> {
    return this.request(API_ENDPOINTS.NOTES.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Notebook endpoints
  async getNotebooks(): Promise<ApiResponse<Notebook[]>> {
    return this.request(API_ENDPOINTS.NOTEBOOKS.LIST);
  }

  async getNotebook(id: string): Promise<ApiResponse<Notebook>> {
    return this.request(API_ENDPOINTS.NOTEBOOKS.DETAIL(id));
  }

  async createNotebook(notebook: Partial<Notebook>): Promise<ApiResponse<Notebook>> {
    return this.request(API_ENDPOINTS.NOTEBOOKS.CREATE, {
      method: 'POST',
      body: JSON.stringify(notebook),
    });
  }

  async updateNotebook(id: string, notebook: Partial<Notebook>): Promise<ApiResponse<Notebook>> {
    return this.request(API_ENDPOINTS.NOTEBOOKS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(notebook),
    });
  }

  async deleteNotebook(id: string): Promise<ApiResponse<void>> {
    return this.request(API_ENDPOINTS.NOTEBOOKS.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Flashcard endpoints
  async getFlashcards(noteId: string): Promise<ApiResponse<Flashcard[]>> {
    return this.request(API_ENDPOINTS.FLASHCARDS.LIST(noteId));
  }

  async createFlashcard(flashcard: Partial<Flashcard>): Promise<ApiResponse<Flashcard>> {
    return this.request(API_ENDPOINTS.FLASHCARDS.CREATE, {
      method: 'POST',
      body: JSON.stringify(flashcard),
    });
  }

  async updateFlashcard(id: string, flashcard: Partial<Flashcard>): Promise<ApiResponse<Flashcard>> {
    return this.request(API_ENDPOINTS.FLASHCARDS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(flashcard),
    });
  }

  async deleteFlashcard(id: string): Promise<ApiResponse<void>> {
    return this.request(API_ENDPOINTS.FLASHCARDS.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Quiz endpoints
  async getQuizzes(noteId: string): Promise<ApiResponse<Quiz[]>> {
    return this.request(API_ENDPOINTS.QUIZZES.LIST(noteId));
  }

  async createQuiz(quiz: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    return this.request(API_ENDPOINTS.QUIZZES.CREATE, {
      method: 'POST',
      body: JSON.stringify(quiz),
    });
  }

  async updateQuiz(id: string, quiz: Partial<Quiz>): Promise<ApiResponse<Quiz>> {
    return this.request(API_ENDPOINTS.QUIZZES.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(quiz),
    });
  }

  async deleteQuiz(id: string): Promise<ApiResponse<void>> {
    return this.request(API_ENDPOINTS.QUIZZES.DELETE(id), {
      method: 'DELETE',
    });
  }

  // Progress endpoints
  async getProgress(userId: string): Promise<ApiResponse<Progress>> {
    return this.request(API_ENDPOINTS.PROGRESS.GET(userId));
  }

  async updateProgress(userId: string, progress: Partial<Progress>): Promise<ApiResponse<Progress>> {
    return this.request(API_ENDPOINTS.PROGRESS.UPDATE(userId), {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  }
}

export const api = new ApiService(); 