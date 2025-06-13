import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Note } from '@/types';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { formatDistanceToNow } from '@/utils/date';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  // Calculate the number of study tools available
  const toolsCount = [
    note.flashcards && note.flashcards.length > 0,
    note.summary,
    note.needToKnow && note.needToKnow.length > 0,
    note.extraInsights && note.extraInsights.length > 0,
  ].filter(Boolean).length;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(note)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {note.title}
        </Text>
        {note.lastStudied && (
          <Text style={styles.lastStudied}>
            Studied {formatDistanceToNow(note.lastStudied)}
          </Text>
        )}
      </View>
      
      {note.summary && (
        <Text style={styles.summary} numberOfLines={2}>
          {note.summary}
        </Text>
      )}
      
      <View style={styles.footer}>
        <View style={styles.toolsContainer}>
          {toolsCount > 0 && (
            <Text style={styles.toolsText}>
              {toolsCount} {toolsCount === 1 ? 'tool' : 'tools'} available
            </Text>
          )}
        </View>
        <Text style={styles.updatedAt}>
          Updated {formatDistanceToNow(note.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginRight: theme.spacing.sm,
  },
  lastStudied: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
  summary: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolsText: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: "500",
    
  },
  updatedAt: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
});