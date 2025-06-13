import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { mockUser } from '@/mocks/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firebase Auth
          // For now, we'll simulate a successful login with mock data
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email && password) {
            set({ 
              user: mockUser,
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call to Firebase Auth
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email && password && name) {
            const newUser: User = {
              ...mockUser,
              id: 'new_user_id',
              email,
              name,
              planId: 'free',
              isStudent: email.endsWith('.edu'),
              onboardComplete: false,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            
            set({ 
              user: newUser,
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            throw new Error('Please fill in all required fields');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Sign up failed',
            isLoading: false 
          });
        }
      },

      logout: () => {
        // In a real app, this would call Firebase Auth signOut
        set({ 
          user: null,
          isAuthenticated: false,
          error: null 
        });
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would call Firebase Auth sendPasswordResetEmail
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email) {
            set({ isLoading: false });
            return Promise.resolve();
          } else {
            throw new Error('Please enter a valid email');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Password reset failed',
            isLoading: false 
          });
          return Promise.reject(error);
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...userData,
              updatedAt: Date.now(),
            },
          });
        }
      },
    }),
    {
      name: 'dream-notes-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);