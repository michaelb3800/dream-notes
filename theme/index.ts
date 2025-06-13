import { UI } from '../constants';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { Theme } from '../types';

export const lightTheme = {
  colors: {
    primary: UI.COLORS.PRIMARY,
    secondary: UI.COLORS.SECONDARY,
    success: UI.COLORS.SUCCESS,
    warning: UI.COLORS.WARNING,
    error: UI.COLORS.ERROR,
    background: UI.COLORS.BACKGROUND,
    text: UI.COLORS.TEXT,
    textSecondary: UI.COLORS.TEXT_SECONDARY,
    border: UI.COLORS.BORDER,
  },
  spacing: UI.SPACING,
  borderRadius: UI.BORDER_RADIUS,
  fontSize: UI.FONT_SIZE,
  animation: UI.ANIMATION,
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#000000',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
} as const;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const useThemeSetup = () => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const toggleTheme = useCallback(async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, newIsDark ? 'dark' : 'light');
  }, [isDark]);

  const theme = isDark ? darkTheme : lightTheme;

  return {
    theme,
    isDark,
    toggleTheme,
  };
};

interface ThemeProviderProps {
  children: ReactNode;
  value: ThemeContextType;
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}; 