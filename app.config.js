module.exports = {
  name: 'Dream Notes',
  slug: 'dream-notes',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.dreamnotes.app',
    buildNumber: '1',
    infoPlist: {
      NSCameraUsageDescription: 'We need access to your camera to take photos of your notes and documents.',
      NSPhotoLibraryUsageDescription: 'We need access to your photo library to import images of your notes and documents.',
      NSMicrophoneUsageDescription: 'We need access to your microphone to record audio notes.'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.dreamnotes.app',
    versionCode: 1,
    permissions: [
      'CAMERA',
      'RECORD_AUDIO',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE'
    ]
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router',
    'expo-document-picker',
    'expo-file-system'
  ],
  experiments: {
    tsconfigPaths: true
  },
  extra: {
    eas: {
      projectId: 'your-project-id'
    }
  },
  owner: 'your-expo-username',
  runtimeVersion: {
    policy: 'sdkVersion'
  },
  updates: {
    url: 'https://u.expo.dev/your-project-id'
  }
}; 