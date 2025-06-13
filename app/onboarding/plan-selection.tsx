import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { plans } from '@/mocks/plans';
import { verifyEduEmail, verifyISIC } from '../../utils/sheerid';
import { Ionicons } from '@expo/vector-icons';

export default function PlanSelectionScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(user?.planId || 'free');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'isic' | null>(null);
  const [email, setEmail] = useState('');
  const [isicNumber, setIsicNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    if (planId === 'student') {
      setVerificationMethod(null);
    } else {
      setVerificationMethod(null);
    }
  };

  const handleVerification = async () => {
    if (!verificationMethod) return;

    setIsVerifying(true);
    try {
      let verificationResult;
      if (verificationMethod === 'email') {
        verificationResult = await verifyEduEmail(email);
      } else {
        verificationResult = await verifyISIC(isicNumber);
      }

      if (verificationResult.success && verificationResult.isStudent) {
        updateUser({ planId: 'student' });
        router.push('/onboarding/tutorial');
      } else {
        Alert.alert(
          'Verification Failed',
          'We could not verify your student status. Please try again or choose a different plan.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during verification. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
    if (selectedPlanId === 'student' && !verificationMethod) {
      Alert.alert('Verification Required', 'Please verify your student status to continue.');
      return;
    }

    if (selectedPlanId === 'student' && verificationMethod) {
      handleVerification();
      return;
    }

    updateUser({ planId: selectedPlanId as 'free' | 'student' | 'standard' | 'premium' });
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
              onPress={() => handlePlanSelect(plan.id)}
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

        {selectedPlanId === 'student' && (
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationTitle}>Verify Student Status</Text>
            
            <View style={styles.verificationMethods}>
              <TouchableOpacity
                style={[
                  styles.verificationMethod,
                  verificationMethod === 'email' && styles.selectedMethod,
                ]}
                onPress={() => setVerificationMethod('email')}
              >
                <Ionicons name="mail" size={24} color="#333" />
                <Text style={styles.methodText}>Email Verification</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.verificationMethod,
                  verificationMethod === 'isic' && styles.selectedMethod,
                ]}
                onPress={() => setVerificationMethod('isic')}
              >
                <Ionicons name="card" size={24} color="#333" />
                <Text style={styles.methodText}>ISIC Card</Text>
              </TouchableOpacity>
            </View>

            {verificationMethod === 'email' && (
              <TextInput
                style={styles.input}
                placeholder="Enter your .edu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}

            {verificationMethod === 'isic' && (
              <TextInput
                style={styles.input}
                placeholder="Enter your ISIC card number"
                value={isicNumber}
                onChangeText={setIsicNumber}
                keyboardType="number-pad"
              />
            )}
          </View>
        )}

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
            icon={<ArrowRight size={20} color="white" />}
            iconPosition="right"
            size="lg"
            disabled={isVerifying}
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
  verificationContainer: {
    padding: theme.spacing.xl,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  verificationTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  verificationMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  verificationMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  selectedMethod: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  methodText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
});