import React from 'react';
import { Stack } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingLayout() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.onboardComplete) {
      router.replace('/');
    }
  }, [user?.onboardComplete]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="select-subjects" />
      <Stack.Screen name="upload-id" />
      <Stack.Screen name="enable-notifications" />
      <Stack.Screen name="plan-selection" />
      <Stack.Screen name="tutorial" />
    </Stack>
  );
}