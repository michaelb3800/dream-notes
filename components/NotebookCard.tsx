import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Notebook } from '@/types';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { formatDistanceToNow } from '@/utils/date';

interface NotebookCardProps {
  notebook: Notebook;
  onPress: (notebook: Notebook) => void;
}

export const NotebookCard: React.FC<NotebookCardProps> = ({ notebook, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: notebook.color + '15' }]} // Add transparency to color
      onPress={() => onPress(notebook)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{notebook.emoji}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {notebook.title}
          </Text>
          {notebook.course && (
            <Text style={styles.course} numberOfLines={1}>
              {notebook.course}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.notesCount}>
          {notebook.notesCount} {notebook.notesCount === 1 ? 'note' : 'notes'}
        </Text>
        <Text style={styles.lastUpdated}>
          Updated {formatDistanceToNow(notebook.lastUpdated)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emoji: {
    fontSize: 32,
    marginRight: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  course: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notesCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  lastUpdated: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
});