import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircle, Search, FileText } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { NoteCard } from '@/components/NoteCard';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/EmptyState';
import { useNotebooksStore } from '@/store/notebooksStore';
import { Note } from '@/types';

export default function NotebookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { notebooks, notes, fetchNotes, setCurrentNote } = useNotebooksStore();
  const [searchQuery, setSearchQuery] = useState('');

  const notebook = notebooks.find(n => n.id === id);

  useEffect(() => {
    if (id) {
      fetchNotes(id);
    }
  }, [id]);

  const filteredNotes = searchQuery
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  const handleNotePress = (note: Note) => {
    setCurrentNote(note.id);
    router.push(`/note/${note.id}`);
  };

  const handleCreateNote = () => {
    router.push({
      pathname: '/create-note',
      params: { notebookId: id }
    });
  };

  if (!notebook) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Notebook not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: notebook.title,
          headerRight: () => (
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateNote}
              activeOpacity={0.7}
            >
              <PlusCircle size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.header}>
        <View style={styles.notebookInfo}>
          <Text style={styles.emoji}>{notebook.emoji}</Text>
          <View>
            {notebook.course && (
              <Text style={styles.course}>{notebook.course}</Text>
            )}
            <Text style={styles.notesCount}>
              {notebook.notesCount} {notebook.notesCount === 1 ? 'note' : 'notes'}
            </Text>
          </View>
        </View>
      </View>

      <Input
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search size={20} color={colors.textSecondary} />}
        containerStyle={styles.searchContainer}
      />

      {notes.length === 0 ? (
        <EmptyState
          title="No notes yet"
          description="Create your first note to start studying more effectively."
          icon={<FileText size={64} color={colors.primary} />}
          actionLabel="Create Note"
          onAction={handleCreateNote}
        />
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={handleNotePress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No notes found</Text>
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
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notebookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  course: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  notesCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  createButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  searchContainer: {
    margin: theme.spacing.md,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  noResults: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});