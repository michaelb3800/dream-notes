import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNotebooksStore } from '@/store/notebooksStore';
import { useAuthStore } from '@/store/authStore';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { notebookId, noteId } = useLocalSearchParams<{ notebookId: string; noteId: string }>();
  const { user } = useAuthStore();
  const { 
    notebooks, 
    notes, 
    addNote, 
    updateNote, 
    isLoading 
  } = useNotebooksStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const notebook = notebooks.find(n => n.id === notebookId);
  const note = noteId ? notes.find(n => n.id === noteId) : null;
  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSaveNote = async () => {
    if (!title.trim()) {
      setError('Please enter a note title');
      return;
    }
    
    if (!content.trim()) {
      setError('Please enter note content');
      return;
    }
    
    if (!user || !notebookId) {
      setError('Missing required information');
      return;
    }
    
    try {
      if (isEditing && note) {
        await updateNote(note.id, {
          title: title.trim(),
          content: content.trim(),
        });
        router.push(`/note/${note.id}`);
      } else {
        const newNote = await addNote({
          notebookId,
          userId: user.id,
          title: title.trim(),
          content: content.trim(),
        });
        router.push(`/note/${newNote.id}`);
      }
    } catch (error) {
      setError('Failed to save note');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: isEditing ? 'Edit Note' : 'Create Note' }} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {notebook && (
            <View style={styles.notebookInfo}>
              <Text style={styles.emoji}>{notebook.emoji}</Text>
              <Text style={styles.notebookTitle}>{notebook.title}</Text>
            </View>
          )}

          <Input
            label="Note Title"
            placeholder="Enter a title for your note"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setError('');
            }}
          />

          <Text style={styles.contentLabel}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write your note content here..."
            value={content}
            onChangeText={(text) => {
              setContent(text);
              setError('');
            }}
            multiline
            textAlignVertical="top"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title={isEditing ? "Save Changes" : "Create Note"}
            onPress={handleSaveNote}
            loading={isLoading}
            disabled={isLoading}
            style={styles.saveButton}
          />
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
  },
  form: {
    padding: theme.spacing.md,
  },
  notebookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
  },
  emoji: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  notebookTitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
  },
  contentLabel: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  contentInput: {
    height: 300,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.background,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
  },
  saveButton: {
    marginTop: theme.spacing.md,
  },
});