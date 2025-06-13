import React from 'react';
import { Stack } from 'expo-router';

export default function QuizzesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Quizzes' }} />
    </Stack>
  );
} 