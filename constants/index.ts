// App-wide constants
export const APP_NAME = 'Dream Notes';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_STUDENT: '/auth/verify-student',
  },
  NOTES: {
    LIST: '/notes',
    DETAIL: (id: string) => `/notes/${id}`,
    CREATE: '/notes',
    UPDATE: (id: string) => `/notes/${id}`,
    DELETE: (id: string) => `/notes/${id}`,
  },
  NOTEBOOKS: {
    LIST: '/notebooks',
    DETAIL: (id: string) => `/notebooks/${id}`,
    CREATE: '/notebooks',
    UPDATE: (id: string) => `/notebooks/${id}`,
    DELETE: (id: string) => `/notebooks/${id}`,
  },
  FLASHCARDS: {
    LIST: (noteId: string) => `/notes/${noteId}/flashcards`,
    CREATE: '/flashcards',
    UPDATE: (id: string) => `/flashcards/${id}`,
    DELETE: (id: string) => `/flashcards/${id}`,
  },
  QUIZZES: {
    LIST: (noteId: string) => `/notes/${noteId}/quizzes`,
    CREATE: '/quizzes',
    UPDATE: (id: string) => `/quizzes/${id}`,
    DELETE: (id: string) => `/quizzes/${id}`,
  },
  PROGRESS: {
    GET: (userId: string) => `/users/${userId}/progress`,
    UPDATE: (userId: string) => `/users/${userId}/progress`,
  },
  AI: {
    SUMMARY: (noteId: string) => `/ai/summary/${noteId}`,
    FLASHCARDS: (noteId: string) => `/ai/flashcards/${noteId}`,
    QUIZ: (noteId: string) => `/ai/quiz/${noteId}`,
    HANDWRITING: '/ai/handwriting',
  },
} as const;

// Navigation routes
export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    VERIFY_STUDENT: 'VerifyStudent',
  },
  MAIN: {
    HOME: 'Home',
    NOTES: 'Notes',
    NOTEBOOKS: 'Notebooks',
    STUDY: 'Study',
    PROFILE: 'Profile',
  },
  NOTES: {
    DETAIL: 'NoteDetail',
    EDIT: 'NoteEdit',
    CREATE: 'NoteCreate',
  },
  NOTEBOOKS: {
    DETAIL: 'NotebookDetail',
    EDIT: 'NotebookEdit',
    CREATE: 'NotebookCreate',
  },
  STUDY: {
    FLASHCARDS: 'Flashcards',
    QUIZ: 'Quiz',
    PROGRESS: 'Progress',
  },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH: 'dream-notes-auth',
  USER_DATA: 'user-data',
  ONBOARDING_COMPLETE: 'onboarding-complete',
  THEME: 'theme',
  NOTIFICATIONS_ENABLED: 'notifications-enabled',
} as const;

// Feature flags
export const FEATURES = {
  AI_SUMMARY: 'ai_summary',
  AI_FLASHCARDS: 'ai_flashcards',
  AI_QUIZ: 'ai_quiz',
  HANDWRITING: 'handwriting',
  FILE_ATTACHMENTS: 'file_attachments',
  COLLABORATION: 'collaboration',
} as const;

// Validation constants
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL: true,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },
  NOTE: {
    TITLE_MAX_LENGTH: 100,
    CONTENT_MAX_LENGTH: 10000,
  },
} as const;

// UI constants
export const UI = {
  ANIMATION: {
    DURATION: 300,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
  },
  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
  },
  COLORS: {
    PRIMARY: '#007AFF',
    SECONDARY: '#5856D6',
    SUCCESS: '#34C759',
    WARNING: '#FF9500',
    ERROR: '#FF3B30',
    BACKGROUND: '#FFFFFF',
    TEXT: '#000000',
    TEXT_SECONDARY: '#8E8E93',
    BORDER: '#C6C6C8',
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_IN_USE: 'Email is already in use',
    WEAK_PASSWORD: 'Password is too weak',
    INVALID_EMAIL: 'Invalid email format',
    NETWORK_ERROR: 'Network error. Please try again',
  },
  NOTES: {
    FETCH_ERROR: 'Failed to fetch notes',
    CREATE_ERROR: 'Failed to create note',
    UPDATE_ERROR: 'Failed to update note',
    DELETE_ERROR: 'Failed to delete note',
  },
  NOTEBOOKS: {
    FETCH_ERROR: 'Failed to fetch notebooks',
    CREATE_ERROR: 'Failed to create notebook',
    UPDATE_ERROR: 'Failed to update notebook',
    DELETE_ERROR: 'Failed to delete notebook',
  },
  STUDY: {
    GENERATE_ERROR: 'Failed to generate study materials',
    SAVE_ERROR: 'Failed to save progress',
  },
  GENERAL: {
    UNKNOWN_ERROR: 'An unknown error occurred',
    NETWORK_ERROR: 'Network error. Please check your connection',
    PERMISSION_ERROR: 'Permission denied',
  },
} as const; 