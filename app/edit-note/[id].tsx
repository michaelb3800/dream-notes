import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Note } from '../../types';
import { useNotesStore } from '../../store/notesStore';
import { useAuthStore } from '../../store/authStore';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const { getNote, updateNote, isLoading } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const note = getNote(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else {
        setError('Note not found');
      }
    }
  }, [id, getNote]);

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to edit a note');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const updatedNote = await updateNote(id, {
        title: title.trim(),
        content: content.trim(),
      });
      router.push(`/note/${updatedNote.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update note');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Edit Note',
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Ionicons name="save-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          value={title}
          onChangeText={text => {
            setTitle(text);
            setError('');
          }}
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Start writing your note..."
          value={content}
          onChangeText={text => {
            setContent(text);
            setError('');
          }}
          multiline
          textAlignVertical="top"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  headerButton: {
    marginRight: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 8,
  },
  errorText: {
    color: '#ff3b30',
    marginTop: 8,
    fontSize: 14,
  },
}); 