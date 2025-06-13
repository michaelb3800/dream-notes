import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme';
import { useAI } from '../hooks/useAI';
import { Note } from '../types';
import { FEATURES } from '../constants';

interface AIFeaturesProps {
  note: Note;
  onSummaryGenerated: (summary: string) => void;
  onFlashcardsGenerated: (flashcards: any[]) => void;
  onQuizGenerated: (quiz: any) => void;
  onImprovementsSuggested: (improvements: string[]) => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  note,
  onSummaryGenerated,
  onFlashcardsGenerated,
  onQuizGenerated,
  onImprovementsSuggested,
}) => {
  const { theme } = useTheme();
  const {
    isLoading,
    error,
    generateSummary,
    generateFlashcards,
    generateQuiz,
    suggestImprovements,
  } = useAI();

  const handleGenerateSummary = async () => {
    try {
      const summary = await generateSummary(note);
      onSummaryGenerated(summary);
    } catch (err) {
      console.error('Failed to generate summary:', err);
    }
  };

  const handleGenerateFlashcards = async () => {
    try {
      const flashcards = await generateFlashcards(note);
      onFlashcardsGenerated(flashcards);
    } catch (err) {
      console.error('Failed to generate flashcards:', err);
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      const quiz = await generateQuiz(note);
      onQuizGenerated(quiz);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
    }
  };

  const handleSuggestImprovements = async () => {
    try {
      const improvements = await suggestImprovements(note);
      onImprovementsSuggested(improvements);
    } catch (err) {
      console.error('Failed to suggest improvements:', err);
    }
  };

  if (!FEATURES.AI_SUMMARY && !FEATURES.AI_FLASHCARDS && !FEATURES.AI_QUIZ) {
    return null;
  }

  return (
    <View style={styles.container}>
      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
      )}

      <View style={styles.buttonContainer}>
        {FEATURES.AI_SUMMARY && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleGenerateSummary}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Generate Summary</Text>
            )}
          </TouchableOpacity>
        )}

        {FEATURES.AI_FLASHCARDS && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.secondary }]}
            onPress={handleGenerateFlashcards}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Generate Flashcards</Text>
            )}
          </TouchableOpacity>
        )}

        {FEATURES.AI_QUIZ && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.success }]}
            onPress={handleGenerateQuiz}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Generate Quiz</Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.warning }]}
          onPress={handleSuggestImprovements}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Suggest Improvements</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
}); 