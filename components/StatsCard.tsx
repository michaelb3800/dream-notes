import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { Card } from './ui/Card';
import { ProgressRing } from './ProgressRing';

interface StatsCardProps {
  xp: number;
  level: number;
  streak: number;
  masteryAverage: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  xp,
  level,
  streak,
  masteryAverage,
}) => {
  // Calculate XP needed for next level (simple formula)
  const xpForNextLevel = 1000 * (level + 1);
  const xpProgress = Math.min(100, (xp / xpForNextLevel) * 100);

  return (
    <Card variant="elevated" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ProgressRing 
            progress={masteryAverage} 
            size={70} 
            strokeWidth={7}
            color={colors.success}
          />
          <Text style={styles.statLabel}>Mastery</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>{level}</Text>
            <Text style={styles.levelLabel}>Level</Text>
          </View>
          <View style={styles.xpContainer}>
            <View style={styles.xpBarContainer}>
              <View style={[styles.xpBar, { width: `${xpProgress}%` }]} />
            </View>
            <Text style={styles.xpText}>{xp} / {xpForNextLevel} XP</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.streakContainer}>
            <Text style={styles.streakValue}>{streak}</Text>
            <Text style={styles.streakLabel}>day{streak !== 1 ? 's' : ''}</Text>
          </View>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  levelText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  levelLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
  xpContainer: {
    alignItems: 'center',
    width: 120,
  },
  xpBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: 4,
  },
  xpBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  xpText: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.textSecondary,
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: colors.warning + '20', // Add transparency
    borderRadius: theme.borderRadius.full,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  streakValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.warning,
  },
  streakLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: colors.warning,
  },
});