import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { plans } from '@/mocks/plans';

export default function PlanSelectionScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(user?.planId || 'free');

  const handleContinue = () => {
    if (user) {
      updateUser({ planId: selectedPlanId as 'free' | 'student' | 'standard' | 'premium' });
    }
    router.push('/onboarding/tutorial');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Select the plan that best fits your needs
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlanId === plan.id && styles.selectedPlanCard,
              ]}
              onPress={() => setSelectedPlanId(plan.id)}
              activeOpacity={0.8}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                {selectedPlanId === plan.id && (
                  <View style={styles.selectedIndicator}>
                    <Check size={16} color="white" />
                  </View>
                )}
              </View>
              
              <Text style={styles.planPrice}>
                {plan.price === 0 ? 'Free' : `$${plan.price}/month`}
              </Text>
              
              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureCheckmark}>
                      <Check size={14} color={colors.primary} />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              {plan.id === 'student' && (
                <View style={styles.studentBadge}>
                  <Text style={styles.studentBadgeText}>Student Discount</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
            icon={<ArrowRight size={20} color="white" />}
            iconPosition="right"
            size="lg"
          />
          
          <Text style={styles.disclaimer}>
            You can change your plan at any time from your profile settings.
            {selectedPlanId !== 'free' && " You won't be charged until after your free trial."}
          </Text>
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
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  plansContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  planCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.sm,
  },
  selectedPlanCard: {
    borderColor: colors.primary,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  planName: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
  },
  selectedIndicator: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.full,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planPrice: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: theme.spacing.lg,
  },
  planFeatures: {
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureCheckmark: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
  },
  studentBadge: {
    backgroundColor: colors.secondary + '20',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  studentBadgeText: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "500",
    color: colors.secondary,
  },
  footer: {
    padding: theme.spacing.xl,
  },
  continueButton: {
    marginBottom: theme.spacing.md,
  },
  disclaimer: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});