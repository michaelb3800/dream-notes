import { useState } from 'react';
import { Note, Flashcard, Quiz } from '../types';
import { aiService } from '../services/ai';

interface UseAIResult {
  isLoading: boolean;
  error: string | null;
  generateSummary: (note: Note) => Promise<string>;
  generateFlashcards: (note: Note) => Promise<Flashcard[]>;
  generateQuiz: (note: Note) => Promise<Quiz>;
  analyzeHandwriting: (imageUrl: string) => Promise<string>;
  suggestImprovements: (note: Note) => Promise<string[]>;
}

export const useAI = (): UseAIResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAIRequest = async <T>(
    request: () => Promise<T>
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await request();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = (note: Note) =>
    handleAIRequest(() => aiService.generateSummary(note));

  const generateFlashcards = (note: Note) =>
    handleAIRequest(() => aiService.generateFlashcards(note));

  const generateQuiz = (note: Note) =>
    handleAIRequest(() => aiService.generateQuiz(note));

  const analyzeHandwriting = (imageUrl: string) =>
    handleAIRequest(() => aiService.analyzeHandwriting(imageUrl));

  const suggestImprovements = (note: Note) =>
    handleAIRequest(() => aiService.suggestImprovements(note));

  return {
    isLoading,
    error,
    generateSummary,
    generateFlashcards,
    generateQuiz,
    analyzeHandwriting,
    suggestImprovements,
  };
}; 