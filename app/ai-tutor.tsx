import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Brain, Sparkles } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export default function AITutorScreen() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI tutor. How can I help you with your studies today?",
      sender: 'ai',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock response
      const aiResponse = generateMockResponse(userMessage.text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Scroll to bottom again after response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (question: string): string => {
    // Simple mock responses based on keywords in the question
    if (question.toLowerCase().includes('cell')) {
      return "Cells are the basic structural and functional units of all living organisms. They come in two main types: prokaryotic (like bacteria, without a nucleus) and eukaryotic (like plant and animal cells, with a nucleus). Each cell contains organelles that perform specific functions, such as mitochondria (energy production), ribosomes (protein synthesis), and in plant cells, chloroplasts (photosynthesis). Would you like me to explain any specific aspect of cell biology in more detail?";
    } else if (question.toLowerCase().includes('dna') || question.toLowerCase().includes('rna')) {
      return "DNA (deoxyribonucleic acid) is the genetic material that carries the instructions for development, functioning, growth, and reproduction in all living organisms. RNA (ribonucleic acid) acts as a messenger carrying instructions from DNA for controlling protein synthesis. The key differences between DNA and RNA include: DNA is double-stranded while RNA is single-stranded, DNA contains deoxyribose sugar while RNA contains ribose sugar, and DNA uses the base thymine where RNA uses uracil. Is there a specific aspect of DNA or RNA you'd like to explore further?";
    } else if (question.toLowerCase().includes('math') || question.toLowerCase().includes('calculus')) {
      return "Calculus is a branch of mathematics focused on the study of rates of change and accumulation. It has two main branches: differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and areas under curves). The fundamental theorem of calculus connects these two branches. Would you like me to help with a specific calculus concept or problem?";
    } else {
      return "That's an interesting question! To give you the most helpful response, I'd need to understand what specific aspect you're curious about. Could you provide more details or context? I'm here to help with explanations, examples, or practice problems related to your studies.";
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      {item.sender === 'ai' && (
        <View style={styles.aiAvatar}>
          <Brain size={20} color="white" />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userText : styles.aiText
        ]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'AI Tutor',
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Sparkles size={20} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask your study question..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Send size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.xs,
  },
  messageBubble: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: theme.typography.fontSizes.md,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
    alignSelf: 'flex-end',
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
});