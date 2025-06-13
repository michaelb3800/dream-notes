import { Notebook } from '@/types';

export const mockNotebooks: Notebook[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Biology 101',
    emoji: '🧬',
    color: '#10B981',
    course: 'Introduction to Biology',
    notesCount: 12,
    lastUpdated: Date.now() - 86400000, // 1 day ago
    createdAt: Date.now() - 2592000000, // 30 days ago
  },
  {
    id: '2',
    userId: 'user1',
    title: 'World History',
    emoji: '🌍',
    color: '#3B82F6',
    course: 'History 202',
    notesCount: 8,
    lastUpdated: Date.now() - 172800000, // 2 days ago
    createdAt: Date.now() - 1728000000, // 20 days ago
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Calculus II',
    emoji: '📊',
    color: '#F59E0B',
    course: 'Math 201',
    notesCount: 15,
    lastUpdated: Date.now() - 259200000, // 3 days ago
    createdAt: Date.now() - 1296000000, // 15 days ago
  },
  {
    id: '4',
    userId: 'user1',
    title: 'Computer Science',
    emoji: '💻',
    color: '#6366F1',
    course: 'CS 101',
    notesCount: 10,
    lastUpdated: Date.now() - 432000000, // 5 days ago
    createdAt: Date.now() - 864000000, // 10 days ago
  },
  {
    id: '5',
    userId: 'user1',
    title: 'Psychology',
    emoji: '🧠',
    color: '#EC4899',
    course: 'PSY 110',
    notesCount: 6,
    lastUpdated: Date.now() - 604800000, // 7 days ago
    createdAt: Date.now() - 432000000, // 5 days ago
  }
];