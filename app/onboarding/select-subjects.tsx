import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function SelectSubjects() {
  const router = useRouter();
  const [subjects, setSubjects] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>Select Subjects</Text>
      <TextInput
        placeholder="e.g. Math, Biology"
        style={styles.input}
        value={subjects}
        onChangeText={setSubjects}
      />
      <Button title="Next" onPress={() => router.push('/onboarding/upload-id')} style={styles.button} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { marginTop: 12 },
});
