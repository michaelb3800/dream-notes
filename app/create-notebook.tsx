import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useNotebooksStore } from '@/store/notebooksStore';
import { useAuthStore } from '@/store/authStore';

const emojis = ['📚', '📝', '🧠', '🔬', '🧪', '🧮', '📊', '🌍', '🧬', '💻', '🔢', '📖', '🎨', '🎭', '🎵', '⚽️', '🏀', '🎯', '🏆', '💼'];

const colorOptions = [
  '#10B981', // Green
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#F97316', // Orange
];

export default function CreateNotebookScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addNotebook, isLoading } = useNotebooksStore();
  
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📚');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [error, setError] = useState('');

  const handleCreateNotebook = async () => {
    if (!title.trim()) {
      setError('Please enter a notebook title');
      return;
    }
    
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      const newNotebook = await addNotebook({
        userId: user.id,
        title: title.trim(),
        emoji: selectedEmoji,
        color: selectedColor,
        course: course.trim() || undefined,
        notesCount: 0,
      });
      
      router.push(`/notebook/${newNotebook.id}`);
    } catch (error) {
      setError('Failed to create notebook');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Create Notebook' }} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.previewContainer}>
          <View 
            style={[
              styles.previewCard, 
              { backgroundColor: selectedColor + '15' } // Add transparency
            ]}
          >
            <Text style={styles.previewEmoji}>{selectedEmoji}</Text>
            <Text style={styles.previewTitle}>
              {title || 'Notebook Title'}
            </Text>
            {course && <Text style={styles.previewCourse}>{course}</Text>}
          </View>
        </View>

        <View style={styles.form}>
          <Input
            label="Notebook Title"
            placeholder="Enter a title for your notebook"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setError('');
            }}
          />

          <Input
            label="Course (Optional)"
            placeholder="Enter course name"
            value={course}
            onChangeText={setCourse}
          />

          <Text style={styles.sectionTitle}>Choose an Emoji</Text>
          <View style={styles.emojiGrid}>
            {emojis.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiItem,
                  selectedEmoji === emoji && styles.selectedEmojiItem,
                ]}
                onPress={() => setSelectedEmoji(emoji)}
                activeOpacity={0.7}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Choose a Color</Text>
          <View style={styles.colorGrid}>
            {colorOptions.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorItem,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorItem,
                ]}
                onPress={() => setSelectedColor(color)}
                activeOpacity={0.7}
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title="Create Notebook"
            onPress={handleCreateNotebook}
            loading={isLoading}
            disabled={isLoading}
            style={styles.createButton}
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
  previewContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  previewCard: {
    width: '100%',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  previewEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  previewTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  previewCourse: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  emojiItem: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.xs,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedEmojiItem: {
    borderColor: colors.primary,
  },
  emoji: {
    fontSize: 24,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.xl,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    margin: theme.spacing.xs,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorItem: {
    borderColor: colors.text,
  },
  errorText: {
    color: colors.error,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
  },
  createButton: {
    marginTop: theme.spacing.md,
  },
});