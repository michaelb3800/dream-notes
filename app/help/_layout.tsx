import React from 'react';
import { Stack } from 'expo-router';

export default function HelpLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Help & Support' }} />
    </Stack>
  );
} 