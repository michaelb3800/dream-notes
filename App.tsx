import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetworkStatus } from './components/NetworkStatus';
import { analytics } from './services/analytics';
import { useTheme } from './theme/ThemeProvider';
import { AppNavigator } from './navigation';
import { ThemeProvider } from './theme/ThemeProvider';
import { StatusBar } from 'react-native';

const AppContent: React.FC = () => {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    analytics.initialize();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <NetworkStatus />
        <AppNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
} 