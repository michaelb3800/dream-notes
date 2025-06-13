import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Brain, Sparkles } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

const { width } = Dimensions.get('window');

const tutorialSteps = [
  {
    title: 'Create Notebooks',
    description: 'Organize your notes by course or subject with custom notebooks',
    icon: <BookOpen size={48} color={colors.primary} />,
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Take Smart Notes',
    description: 'Write or import notes and let AI help you understand and organize them',
    icon: <Brain size={48} color={colors.secondary} />,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Study Smarter',
    description: 'Use AI-generated flashcards, quizzes, and summaries to master any subject',
    icon: <Sparkles size={48} color={colors.warning} />,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function TutorialScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      if (user) {
        updateUser({ onboardComplete: true });
      }
      router.replace('/');
    }
  };

  const handleSkip = () => {
    // Complete onboarding
    if (user) {
      updateUser({ onboardComplete: true });
    }
    router.replace('/');
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <Button
          title="Skip"
          onPress={handleSkip}
          variant="ghost"
          size="sm"
        />
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: currentTutorial.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.iconContainer}>
          {currentTutorial.icon}
        </View>

        <Text style={styles.title}>{currentTutorial.title}</Text>
        <Text style={styles.description}>{currentTutorial.description}</Text>

        <View style={styles.pagination}>
          {tutorialSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentStep && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title={currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.nextButton}
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
  skipContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  footer: {
    padding: theme.spacing.xl,
  },
  nextButton: {
    width: '100%',
  },
});