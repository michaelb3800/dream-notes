import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../theme';
import { HandwritingInput } from '../components/HandwritingInput';
import { RecognizedText } from '../components/RecognizedText';
import { FEATURES } from '../constants';

export const HandwritingScreen: React.FC = () => {
  const { theme } = useTheme();
  const [recognizedText, setRecognizedText] = useState<string>('');

  const handleTextRecognized = (text: string) => {
    setRecognizedText(text);
  };

  const handleEditText = (text: string) => {
    setRecognizedText(text);
  };

  if (!FEATURES.HANDWRITING) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <HandwritingInput onTextRecognized={handleTextRecognized} />
        
        {recognizedText ? (
          <RecognizedText
            text={recognizedText}
            onEdit={handleEditText}
          />
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
}); 