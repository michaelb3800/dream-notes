import { User, UserProgress } from '@/types';

export const mockUser: User = {
  id: 'user1',
  email: 'student@university.edu',
  name: 'Alex Johnson',
  photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  isStudent: true,
  planId: 'student',
  stripeCustomerId: 'cus_123456789',
  onboardComplete: true,
  createdAt: Date.now() - 2592000000, // 30 days ago
  updatedAt: Date.now() - 86400000 // 1 day ago
};

export const mockUserProgress: UserProgress = {
  userId: 'user1',
  xp: 1250,
  level: 5,
  streak: 7,
  lastActive: Date.now() - 86400000, // 1 day ago
  masteryScores: {
    '1': 85, // noteId -> mastery percentage
    '2': 62
  },
  quizScores: [
    {
      quizId: 'q1',
      score: 8,
      totalQuestions: 10,
      completedAt: Date.now() - 172800000 // 2 days ago
    },
    {
      quizId: 'q2',
      score: 9,
      totalQuestions: 10,
      completedAt: Date.now() - 259200000 // 3 days ago
    }
  ]
};