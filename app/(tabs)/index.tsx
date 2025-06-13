import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircle, BookOpen, Brain } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { StatsCard } from '@/components/StatsCard';
import { NotebookCard } from '@/components/NotebookCard';
import { useAuthStore } from '@/store/authStore';
import { useNotebooksStore } from '@/store/notebooksStore';
import { useProgressStore } from '@/store/progressStore';
import { Notebook } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { notebooks, fetchNotebooks, setCurrentNotebook } = useNotebooksStore();
  const { progress, fetchProgress } = useProgressStore();

  useEffect(() => {
    if (user) {
      fetchNotebooks();
      fetchProgress(user.id);
    }
  }, [user]);

  // Calculate average mastery score
  const masteryAverage = progress?.masteryScores
    ? Object.values(progress.masteryScores).reduce((sum, score) => sum + score, 0) / 
      Object.values(progress.masteryScores).length
    : 0;

  const recentNotebooks = notebooks.slice(0, 3);

  const handleNotebookPress = (notebook: Notebook) => {
    setCurrentNotebook(notebook.id);
    router.push(`/notebook/${notebook.id}`);
  };

  const handleCreateNotebook = () => {
    router.push('/create-notebook');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {user?.name?.split(' ')[0] || 'Student'}
          </Text>
          <Text style={styles.subGreeting}>
            Ready to boost your learning today?
          </Text>
        </View>

        {progress && (
          <StatsCard
            xp={progress.xp}
            level={progress.level}
            streak={progress.streak}
            masteryAverage={Math.round(masteryAverage)}
          />
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notebooks</Text>
            <TouchableOpacity onPress={() => router.push('/notebooks')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {recentNotebooks.length > 0 ? (
            recentNotebooks.map((notebook) => (
              <NotebookCard
                key={notebook.id}
                notebook={notebook}
                onPress={handleNotebookPress}
              />
            ))
          ) : (
            <TouchableOpacity
              style={styles.createNotebookCard}
              onPress={handleCreateNotebook}
              activeOpacity={0.7}
            >
              <PlusCircle size={32} color={colors.primary} />
              <Text style={styles.createNotebookText}>Create your first notebook</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/notebooks')}
              activeOpacity={0.7}
            >
              <BookOpen size={24} color={colors.primary} />
              <Text style={styles.actionText}>All Notebooks</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/study')}
              activeOpacity={0.7}
            >
              <Brain size={24} color={colors.secondary} />
              <Text style={styles.actionText}>Study Tools</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  greeting: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  subGreeting: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  seeAllText: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500",
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
    gap: theme.spacing.md,
  },
  createNotebookText: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "500",
    color: colors.primary,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
    gap: theme.spacing.sm,
  },
  actionText: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "500",
    color: colors.text,
    textAlign: 'center',
  },
});