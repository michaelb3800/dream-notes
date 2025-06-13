import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, Sparkles, Zap } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // If user has already completed onboarding, redirect to home
    if (user?.onboardComplete) {
      router.replace('/');
    }
  }, [user]);

  const handleContinue = () => {
    router.push('/onboarding/plan-selection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=2835&auto=format&fit=crop' }} 
          style={styles.logo} 
        />
        
        <Text style={styles.title}>Welcome to Dream Notes</Text>
        <Text style={styles.subtitle}>
          Your AI-powered study companion
        </Text>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
              <Brain size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Study Tools</Text>
              <Text style={styles.featureDescription}>
                AI-generated summaries, flashcards, and quizzes
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.secondary + '20' }]}>
              <Sparkles size={24} color={colors.secondary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>AI Tutor</Text>
              <Text style={styles.featureDescription}>
                Get personalized help and explanations
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: colors.warning + '20' }]}>
              <Zap size={24} color={colors.warning} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Gamified Learning</Text>
              <Text style={styles.featureDescription}>
                Earn XP, track streaks, and level up your knowledge
              </Text>
            </View>
          </View>
        </View>

        <Button
          title="Get Started"
          onPress={handleContinue}
          style={styles.continueButton}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  features: {
    width: '100%',
    marginBottom: theme.spacing.xxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
  },
  continueButton: {
    width: '100%',
  },
});