import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    try {
      await signUp(email, password, name);
      router.replace('/onboarding');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=2835&auto=format&fit=crop' }} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join Dream Notes to supercharge your learning
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setValidationError('');
            }}
            leftIcon={<User size={20} color={colors.textSecondary} />}
          />

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

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setValidationError('');
            }}
            secureTextEntry
            showPasswordToggle
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setValidationError('');
            }}
            secureTextEntry
            showPasswordToggle
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />

          {(validationError || error) && (
            <Text style={styles.errorText}>{validationError || error}</Text>
          )}

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            style={styles.signupButton}
            icon={<ArrowRight size={20} color="white" />}
            iconPosition="right"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
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
  scrollContent: {
    padding: theme.spacing.xl,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  errorText: {
    color: colors.error,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
  },
  signupButton: {
    marginTop: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  loginLink: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
    color: colors.primary,
  },
});