import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome to Dream Notes</Text>
        <Text style={styles.subtitle}>
          Your AI-powered study companion for better learning and retention
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="book-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Smart Note Taking</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="bulb-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>AI-Powered Learning</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="trophy-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Study Smarter</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding/create-account')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  footer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  loginButton: {
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#666',
    fontSize: 14,
  },
});