import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircle, Search, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { NotebookCard } from '@/components/NotebookCard';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useNotebooksStore } from '@/store/notebooksStore';
import { Notebook } from '@/types';

export default function NotebooksScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { notebooks, fetchNotebooks, setCurrentNotebook } = useNotebooksStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchNotebooks();
    }
  }, [user]);

  const filteredNotebooks = searchQuery
    ? notebooks.filter(notebook => 
        notebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notebook.course && notebook.course.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : notebooks;

  const handleNotebookPress = (notebook: Notebook) => {
    setCurrentNotebook(notebook.id);
    router.push(`/notebook/${notebook.id}`);
  };

  const handleCreateNotebook = () => {
    router.push('/create-notebook');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Notebooks</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateNotebook}
          activeOpacity={0.7}
        >
          <PlusCircle size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Input
        placeholder="Search notebooks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search size={20} color={colors.textSecondary} />}
        containerStyle={styles.searchContainer}
      />

      {notebooks.length === 0 ? (
        <EmptyState
          title="No notebooks yet"
          description="Create your first notebook to start taking notes and studying more effectively."
          icon={<BookOpen size={64} color={colors.primary} />}
          actionLabel="Create Notebook"
          onAction={handleCreateNotebook}
        />
      ) : (
        <FlatList
          data={filteredNotebooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotebookCard notebook={item} onPress={handleNotebookPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No notebooks found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
  },
  createButton: {
    padding: theme.spacing.xs,
  },
  searchContainer: {
    marginBottom: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  noResultsText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});