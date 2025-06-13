import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useNotebooksStore } from '@/store/notebooksStore';
import { useProgressStore } from '@/store/progressStore';
import { Flashcard } from '@/types';

const { width } = Dimensions.get('window');

export default function FlashcardsScreen() {
  const router = useRouter();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const { notes } = useNotebooksStore();
  const { addXP } = useProgressStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [completed, setCompleted] = useState(false);
  
  const note = noteId ? notes.find(n => n.id === noteId) : null;

  useEffect(() => {
    if (note?.flashcards) {
      setFlashcards(note.flashcards);
    } else {
      // If no specific note is provided, gather flashcards from all notes
      const allFlashcards: Flashcard[] = [];
      notes.forEach(note => {
        if (note.flashcards) {
          allFlashcards.push(...note.flashcards);
        }
      });
      setFlashcards(allFlashcards);
    }
  }, [note, notes]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // End of flashcards
      setCompleted(true);
      addXP(50); // Award XP for completing the flashcard session
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
  };

  if (flashcards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Flashcards' }} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Flashcards Available</Text>
          <Text style={styles.emptyText}>
            Generate flashcards from your notes to start studying.
          </Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Flashcards' }} />
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Great Job!</Text>
          <Text style={styles.completedText}>
            You've completed all {flashcards.length} flashcards.
          </Text>
          <Text style={styles.xpText}>+50 XP</Text>
          <View style={styles.completedButtons}>
            <Button
              title="Study Again"
              onPress={handleRestart}
              icon={<RotateCcw size={20} color="white" />}
              style={styles.restartButton}
            />
            <Button
              title="Back to Notes"
              onPress={() => router.back()}
              variant="outline"
              style={styles.backButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Flashcards' }} />
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {flashcards.length}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleFlip}
        activeOpacity={0.9}
      >
        <View style={[
          styles.card,
          isFlipped ? styles.cardBack : styles.cardFront,
        ]}>
          <Text style={styles.cardText}>
            {isFlipped ? currentFlashcard.back : currentFlashcard.front}
          </Text>
          <Text style={styles.tapHint}>Tap to {isFlipped ? 'see question' : 'see answer'}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={currentIndex === 0 ? colors.textSecondary : colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <ArrowRight size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  progressText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  card: {
    width: width - 40,
    height: 400,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  cardFront: {
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  cardBack: {
    backgroundColor: colors.secondary + '10',
    borderWidth: 1,
    borderColor: colors.secondary + '30',
  },
  cardText: {
    fontSize: theme.typography.fontSizes.xl,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  tapHint: {
    position: 'absolute',
    bottom: theme.spacing.md,
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  completedTitle: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: theme.spacing.md,
  },
  completedText: {
    fontSize: theme.typography.fontSizes.lg,
    color: colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  xpText: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.success,
    marginBottom: theme.spacing.xl,
  },
  completedButtons: {
    width: '100%',
    gap: theme.spacing.md,
  },
  restartButton: {
    width: '100%',
  },
  backButton: {
    width: '100%',
  },
});