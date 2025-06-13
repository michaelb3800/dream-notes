import React from 'react';
import { Stack } from 'expo-router';

export default function SubscriptionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Subscription' }} />
    </Stack>
  );
} 