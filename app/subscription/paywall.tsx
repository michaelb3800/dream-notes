import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function Paywall() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>DreamNotes Pro</Text>
      <Text style={styles.subtitle}>Create unlimited notebooks and access AI features.</Text>
      <Button title="Subscribe" onPress={() => {}} style={styles.button} />
      <Button title="Restore" variant="outline" onPress={() => {}} style={styles.button} />
      <Button title="Maybe Later" variant="ghost" onPress={() => router.back()} style={styles.button} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginVertical: 12 },
  button: { marginTop: 12 },
});
