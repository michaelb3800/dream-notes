import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { api } from '../services/api';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  verifyStudent: (email: string, institution: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.login(email, password);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.signup(email, password, name);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed',
            isLoading: false,
          });
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          // Placeholder implementation
          await new Promise((resolve) => setTimeout(resolve, 500));
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Password reset failed',
            isLoading: false,
          });
        }
      },

      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : state.user,
        }));
      },

      verifyStudent: async (email: string, institution: string) => {
        try {
          set({ isLoading: true, error: null });
          await api.verifyStudent(email, institution);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Verification failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Backwards compatibility
export const useAuth = useAuthStore;
