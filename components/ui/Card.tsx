import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof theme.spacing | number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'md',
}) => {
  const paddingValue = typeof padding === 'number' ? padding : theme.spacing[padding];
  
  return (
    <View
      style={[
        styles.card,
        styles[variant],
        { padding: paddingValue },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.card,
  },
  elevated: {
    backgroundColor: colors.card,
    ...theme.shadows.md,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
});