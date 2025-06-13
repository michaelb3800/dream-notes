import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, CreditCard, Lightbulb, Zap, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { useNotebooksStore } from '@/store/notebooksStore';

export default function StudyScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { notebooks } = useNotebooksStore();

  // Calculate total flashcards across all notes
  const totalFlashcards = 0; // In a real app, this would be calculated from the notes

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Study Tools</Text>
          <Text style={styles.subtitle}>
            Boost your learning with AI-powered study tools
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>{notebooks.length}</Text>
            <Text style={styles.statLabel}>Notebooks</Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>
              {notebooks.reduce((sum, notebook) => sum + notebook.notesCount, 0)}
            </Text>
            <Text style={styles.statLabel}>Notes</Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>{totalFlashcards}</Text>
            <Text style={styles.statLabel}>Flashcards</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Study Methods</Text>
        
        <TouchableOpacity
          style={[styles.studyCard, { backgroundColor: colors.primary + '15' }]}
          onPress={() => router.push('/flashcards')}
          activeOpacity={0.7}
        >
          <View style={styles.studyCardIcon}>
            <CreditCard size={32} color={colors.primary} />
          </View>
          <View style={styles.studyCardContent}>
            <Text style={styles.studyCardTitle}>Flashcards</Text>
            <Text style={styles.studyCardDescription}>
              Review key concepts with spaced repetition flashcards
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.studyCard, { backgroundColor: colors.secondary + '15' }]}
          onPress={() => router.push('/quizzes')}
          activeOpacity={0.7}
        >
          <View style={styles.studyCardIcon}>
            <Brain size={32} color={colors.secondary} />
          </View>
          <View style={styles.studyCardContent}>
            <Text style={styles.studyCardTitle}>Quizzes</Text>
            <Text style={styles.studyCardDescription}>
              Test your knowledge with AI-generated quizzes
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.studyCard, { backgroundColor: colors.info + '15' }]}
          onPress={() => router.push('/ai-tutor')}
          activeOpacity={0.7}
        >
          <View style={styles.studyCardIcon}>
            <Lightbulb size={32} color={colors.info} />
          </View>
          <View style={styles.studyCardContent}>
            <Text style={styles.studyCardTitle}>AI Tutor</Text>
            <Text style={styles.studyCardDescription}>
              Get personalized help from your AI study assistant
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.studyCard, { backgroundColor: colors.warning + '15' }]}
          onPress={() => router.push('/games')}
          activeOpacity={0.7}
        >
          <View style={styles.studyCardIcon}>
            <Zap size={32} color={colors.warning} />
          </View>
          <View style={styles.studyCardContent}>
            <Text style={styles.studyCardTitle}>Study Games</Text>
            <Text style={styles.studyCardDescription}>
              Make learning fun with interactive study games
            </Text>
          </View>
        </TouchableOpacity>

        {notebooks.length === 0 && (
          <TouchableOpacity
            style={styles.createNotebookCard}
            onPress={() => router.push('/create-notebook')}
            activeOpacity={0.7}
          >
            <BookOpen size={32} color={colors.primary} />
            <Text style={styles.createNotebookText}>
              Create your first notebook to start studying
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
  },
  statValue: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  studyCard: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  studyCardIcon: {
    marginRight: theme.spacing.md,
    justifyContent: 'center',
  },
  studyCardContent: {
    flex: 1,
  },
  studyCardTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  studyCardDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  createNotebookCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  createNotebookText: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "500",
    color: colors.primary,
    textAlign: 'center',
  },
});