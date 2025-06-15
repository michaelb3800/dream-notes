# Dream Notes

An AI-powered note-taking and study companion app.

## Features

- Smart note-taking with AI assistance
- Handwriting recognition
- File upload support
- Educational verification
- Study tools (flashcards, quizzes)
- Progress tracking
- Social features

## Prerequisites

- Node.js 16 or later
- npm or yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Apple Developer Account (for App Store submission)
- Google Play Developer Account (for Play Store submission)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/rork/dream-notes.git
cd dream-notes
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
SHEERID_API_KEY=your_sheerid_api_key
AI_SERVICE_API_KEY=your_ai_service_api_key
```

4. Start the development server:
```bash
npm start
```

## Building for Production

### iOS

1. Update version and build number in `app.json`
2. Build the app:
```bash
npm run build:ios
```

3. Submit to App Store:
```bash
npm run submit:ios
```

### Android

1. Update version and versionCode in `app.json`
2. Build the app:
```bash
npm run build:android
```

3. Submit to Play Store:
```bash
npm run submit:android
```

## App Store Requirements

Before submitting to the App Store, ensure you have:

1. App Store Connect account set up
2. App privacy details completed
3. App Store screenshots and preview videos
4. App description and keywords
5. Support URL
6. Marketing URL
7. Privacy Policy URL
8. App Store rating questionnaire completed

## Play Store Requirements

Before submitting to the Play Store, ensure you have:

1. Play Console account set up
2. App content rating questionnaire completed
3. Store listing details
4. App screenshots and feature graphic
5. Privacy Policy URL
6. App signing key

## Testing

Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
