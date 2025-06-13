import React from 'react';
import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Study Games' }} />
    </Stack>
  );
} 