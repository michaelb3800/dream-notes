import React from 'react';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ title: 'Account Settings' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications Settings' }} />
      <Stack.Screen name="payment" options={{ title: 'Payment Settings' }} />
      <Stack.Screen name="privacy" options={{ title: 'Privacy Settings' }} />
    </Stack>
  );
} 