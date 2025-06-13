import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HandwritingInput from '../components/HandwritingInput';
import { Note } from '../types';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addNote, isLoading } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isHandwritingMode, setIsHandwritingMode] = useState(false);
  const [error, setError] = useState('');

  const handleTextRecognized = (text: string) => {
    setContent(prev => prev + (prev ? '\n' : '') + text);
    setIsHandwritingMode(false);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to create a note');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.id,
        title: title.trim(),
        content: content.trim(),
        tags: [],
        course: undefined,
        topic: undefined,
      };
      const addedNote = await addNote(newNote);
      router.push(`/note/${addedNote.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create note');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Create Note',
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setIsHandwritingMode(!isHandwritingMode)}
              >
                <Ionicons
                  name={isHandwritingMode ? 'create-outline' : 'pencil-outline'}
                  size={24}
                  color="#007AFF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleSave}
                disabled={isLoading}
              >
                <Ionicons
                  name="save-outline"
                  size={24}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>
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

        {isHandwritingMode ? (
          <View style={styles.handwritingContainer}>
            <HandwritingInput
              onTextRecognized={handleTextRecognized}
              onError={handleError}
            />
          </View>
        ) : (
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
        )}

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
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
  headerButtons: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerButton: {
    marginLeft: 16,
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
  handwritingContainer: {
    height: 300,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  errorText: {
    color: '#ff3b30',
    marginTop: 8,
    fontSize: 14,
  },
});