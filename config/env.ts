const ENV = {
  API_URL: process.env.API_URL || 'https://api.dreamnotes.app',
  AUTH: {
    DOMAIN: process.env.AUTH_DOMAIN || 'auth.dreamnotes.app',
    CLIENT_ID: process.env.AUTH_CLIENT_ID || 'your-client-id',
  },
  AI: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY || '',
  },
  STORAGE: {
    BUCKET: process.env.STORAGE_BUCKET || 'dreamnotes-storage',
    REGION: process.env.STORAGE_REGION || 'us-east-1',
  },
  ANALYTICS: {
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
  },
  FEATURES: {
    AI_SUMMARY: true,
    AI_FLASHCARDS: true,
    AI_QUIZ: true,
    HANDWRITING: true,
    FILE_ATTACHMENTS: true,
    COLLABORATION: false,
  },
} as const;

export default ENV;

// Type-safe access to environment variables
export const getEnvVar = (key: keyof typeof ENV) => {
  return ENV[key];
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof ENV.FEATURES) => {
  return ENV.FEATURES[feature];
};

// Helper function to check if all required environment variables are set
export const validateEnv = () => {
  const requiredVars = [
    'EXPO_PUBLIC_API_URL',
    'EXPO_PUBLIC_AUTH_DOMAIN',
    'EXPO_PUBLIC_AUTH_CLIENT_ID',
  ];

  const missingVars = requiredVars.filter(
    (key) => !process.env[key]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}; 