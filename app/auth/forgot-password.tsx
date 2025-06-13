import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    // Validation
    if (!email) {
      setValidationError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {isSubmitted ? (
          <View style={styles.successContainer}>
            <CheckCircle size={64} color={colors.success} />
            <Text style={styles.successTitle}>Email Sent</Text>
            <Text style={styles.successMessage}>
              We've sent password reset instructions to {email}. Please check your inbox.
            </Text>
            <Button
              title="Back to Login"
              onPress={() => router.push('/auth/login')}
              style={styles.backToLoginButton}
            />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setValidationError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={20} color={colors.textSecondary} />}
              />

              {(validationError || error) && (
                <Text style={styles.errorText}>{validationError || error}</Text>
              )}

              <Button
                title="Send Reset Link"
                onPress={handleResetPassword}
                loading={isLoading}
                disabled={isLoading}
                style={styles.resetButton}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  form: {
    marginBottom: theme.spacing.xxl,
  },
  errorText: {
    color: colors.error,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    marginTop: theme.spacing.md,
  },
  successContainer: {
    alignItems: 'center',
  },
  successTitle: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  successMessage: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  backToLoginButton: {
    marginTop: theme.spacing.lg,
    minWidth: 200,
  },
});