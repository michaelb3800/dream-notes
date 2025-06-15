import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { verifyStudentID } from '@/utils/sheerid';

export default function UploadID() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!res.canceled && res.assets.length > 0) {
      const uri = res.assets[0].uri;
      setImage(uri);
      const result = await verifyStudentID(uri);
      setVerified(result.verified);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>Upload Student ID</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 120, alignSelf: 'center' }} />}
      <Button title={image ? 'Reupload' : 'Upload'} onPress={pick} style={styles.button} />
      <Button title="Next" disabled={!verified} onPress={() => router.push('/onboarding/enable-notifications')} style={styles.button} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  button: { marginTop: 12 },
});
