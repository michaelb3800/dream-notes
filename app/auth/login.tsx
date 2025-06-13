import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleLogin = async () => {
    // Simple validation
    if (!email || !password) {
      setValidationError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=2835&auto=format&fit=crop' }} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Dream Notes</Text>
          <Text style={styles.subtitle}>
            AI-powered study tools to boost your learning
          </Text>
        </View>

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

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
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
            title="Log In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
            icon={<ArrowRight size={20} color="white" />}
            iconPosition="right"
          />

          <TouchableOpacity
            onPress={() => router.push('/auth/forgot-password')}
            style={styles.forgotPasswordLink}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxxl,
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
    marginBottom: theme.spacing.xxl,
  },
  errorText: {
    color: colors.error,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    marginTop: theme.spacing.md,
  },
  forgotPasswordLink: {
    alignSelf: 'center',
    marginTop: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: theme.typography.fontSizes.sm,
    color: colors.primary,
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
  signupLink: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
    color: colors.primary,
  },
});