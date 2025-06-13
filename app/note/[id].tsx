import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Edit, Trash2, CreditCard, Brain, Sparkles, ChevronDown, ChevronUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useNotebooksStore } from '@/store/notebooksStore';
import { formatDate } from '@/utils/date';
import { Ionicons } from '@expo/vector-icons';
import { useNotesStore } from '../../store/notesStore';
import { useAuthStore } from '../../store/authStore';
import { Note } from '../../types';

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const { getNote, deleteNote, isLoading } = useNotesStore();
  const { notes, notebooks, generateSummary, generateFlashcards } = useNotebooksStore();
  
  const [showSummary, setShowSummary] = useState(true);
  const [showNeedToKnow, setShowNeedToKnow] = useState(true);
  const [showExtraInsights, setShowExtraInsights] = useState(true);
  
  const [note, setNote] = useState<Note | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const foundNote = getNote(id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        setError('Note not found');
      }
    }
  }, [id, getNote]);

  const notebook = note ? notebooks.find(n => n.id === note.notebookId) : null;

  const handleDelete = async () => {
    if (!note) return;

    try {
      await deleteNote(note.id);
      router.back();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete note');
    }
  };

  const handleEdit = () => {
    if (!note) return;
    router.push({
      pathname: '/create-note',
      params: { noteId: note.id }
    });
  };

  const handleGenerateSummary = async () => {
    await generateSummary(note.id);
  };

  const handleGenerateFlashcards = async () => {
    await generateFlashcards(note.id);
  };

  const handleViewFlashcards = () => {
    router.push({
      pathname: '/flashcards',
      params: { noteId: note.id }
    });
  };

  // Convert markdown headers to styled text (simple version)
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={styles.h1}>
            {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={styles.h2}>
            {line.substring(3)}
          </Text>
        );
      } else if (line.startsWith('### ')) {
        return (
          <Text key={index} style={styles.h3}>
            {line.substring(4)}
          </Text>
        );
      } else if (line.startsWith('- ')) {
        return (
          <Text key={index} style={styles.listItem}>
            • {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('1. ')) {
        return (
          <Text key={index} style={styles.listItem}>
            {line}
          </Text>
        );
      } else if (line.trim() === '') {
        return <View key={index} style={styles.emptyLine} />;
      } else {
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
    });
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Note' }} />
        <View style={styles.content}>
          <Text style={styles.errorText}>{error || 'Loading...'}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: note.title,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleEdit}
                disabled={isLoading}
              >
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleDelete}
                disabled={isLoading}
              >
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.notebookInfo}>
            <Text style={styles.emoji}>{notebook?.emoji}</Text>
            <Text style={styles.notebookTitle}>{notebook?.title}</Text>
          </View>
          <Text style={styles.date}>
            {formatDate(note.updatedAt)}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{note.title}</Text>
          
          {note.aiImages && note.aiImages.length > 0 && (
            <Image
              source={{ uri: note.aiImages[0].url }}
              style={styles.image}
              contentFit="cover"
            />
          )}
          
          {renderContent(note.content)}
        </View>

        <View style={styles.aiTools}>
          <Text style={styles.aiToolsTitle}>AI Study Tools</Text>
          
          {note.summary ? (
            <Card style={styles.summaryCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setShowSummary(!showSummary)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionTitle}>Summary</Text>
                {showSummary ? (
                  <ChevronUp size={20} color={colors.text} />
                ) : (
                  <ChevronDown size={20} color={colors.text} />
                )}
              </TouchableOpacity>
              
              {showSummary && (
                <Text style={styles.summaryText}>{note.summary}</Text>
              )}
            </Card>
          ) : (
            <Card style={styles.generateCard}>
              <View style={styles.generateContent}>
                <Sparkles size={24} color={colors.primary} />
                <Text style={styles.generateText}>
                  Generate an AI summary of this note
                </Text>
              </View>
              <Button
                title="Generate"
                onPress={handleGenerateSummary}
                size="sm"
              />
            </Card>
          )}
          
          {note.needToKnow && note.needToKnow.length > 0 && (
            <Card style={styles.summaryCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setShowNeedToKnow(!showNeedToKnow)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionTitle}>Need to Know</Text>
                {showNeedToKnow ? (
                  <ChevronUp size={20} color={colors.text} />
                ) : (
                  <ChevronDown size={20} color={colors.text} />
                )}
              </TouchableOpacity>
              
              {showNeedToKnow && (
                <View style={styles.needToKnowList}>
                  {note.needToKnow.map((item, index) => (
                    <Text key={index} style={styles.needToKnowItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              )}
            </Card>
          )}
          
          {note.extraInsights && note.extraInsights.length > 0 && (
            <Card style={styles.summaryCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setShowExtraInsights(!showExtraInsights)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionTitle}>Extra Insights</Text>
                {showExtraInsights ? (
                  <ChevronUp size={20} color={colors.text} />
                ) : (
                  <ChevronDown size={20} color={colors.text} />
                )}
              </TouchableOpacity>
              
              {showExtraInsights && (
                <View style={styles.insightsList}>
                  {note.extraInsights.map((insight, index) => (
                    <View key={index} style={styles.insightItem}>
                      <Text style={styles.insightText}>{insight.text}</Text>
                      {insight.citation && (
                        <Text style={styles.insightCitation}>
                          Source: {insight.citation}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </Card>
          )}
          
          {note.flashcards && note.flashcards.length > 0 ? (
            <Card style={styles.flashcardsCard}>
              <View style={styles.flashcardsHeader}>
                <View style={styles.flashcardsInfo}>
                  <CreditCard size={24} color={colors.primary} />
                  <Text style={styles.flashcardsTitle}>
                    {note.flashcards.length} Flashcards Available
                  </Text>
                </View>
                <Button
                  title="Study"
                  onPress={handleViewFlashcards}
                  size="sm"
                />
              </View>
            </Card>
          ) : (
            <Card style={styles.generateCard}>
              <View style={styles.generateContent}>
                <CreditCard size={24} color={colors.primary} />
                <Text style={styles.generateText}>
                  Generate flashcards from this note
                </Text>
              </View>
              <Button
                title="Generate"
                onPress={handleGenerateFlashcards}
                size="sm"
              />
            </Card>
          )}
          
          <Card style={styles.generateCard}>
            <View style={styles.generateContent}>
              <Brain size={24} color={colors.secondary} />
              <Text style={styles.generateText}>
                Generate a quiz to test your knowledge
              </Text>
            </View>
            <Button
              title="Generate"
              onPress={() => {}}
              size="sm"
            />
          </Card>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notebookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: theme.spacing.xs,
  },
  notebookTitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  date: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.lg,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  h1: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  h2: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  h3: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  paragraph: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
  },
  emptyLine: {
    height: theme.spacing.sm,
  },
  aiTools: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  aiToolsTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  summaryCard: {
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  summaryText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginTop: theme.spacing.sm,
  },
  needToKnowList: {
    marginTop: theme.spacing.xs,
  },
  needToKnowItem: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.sm,
  },
  insightsList: {
    marginTop: theme.spacing.xs,
  },
  insightItem: {
    marginBottom: theme.spacing.md,
  },
  insightText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.xs,
  },
  insightCitation: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  generateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  generateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  generateText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    marginLeft: theme.spacing.sm,
  },
  flashcardsCard: {
    marginBottom: theme.spacing.md,
  },
  flashcardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashcardsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashcardsTitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    fontWeight: "500",
    marginLeft: theme.spacing.sm,
  },
});