import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { isAuthenticated, user } = useAuthStore();

  // If the user is authenticated but hasn't completed onboarding, redirect to onboarding
  if (isAuthenticated && user && !user.onboardComplete) {
    return <Redirect href="/onboarding" />;
  }

  // If the user is authenticated and has completed onboarding, redirect to the tabs
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise, redirect to login
  return <Redirect href="/auth/login" />;
}