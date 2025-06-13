import { Plan } from '@/types';

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '3 notebooks',
      'Basic note-taking',
      'Limited AI summaries',
      '10 flashcards per note'
    ],
    notebookLimit: 3,
    aiCredits: 10
  },
  {
    id: 'student',
    name: 'Student',
    price: 7.99,
    features: [
      'Unlimited notebooks',
      'AI summaries & insights',
      'Unlimited flashcards',
      'Quiz generation',
      'Basic AI tutor'
    ],
    notebookLimit: Infinity,
    aiCredits: 100
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 11.99,
    features: [
      'Everything in Student',
      'Advanced AI tutor',
      'Practice problem generation',
      'AI image creation',
      'Priority support'
    ],
    notebookLimit: Infinity,
    aiCredits: 250
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 16.99,
    features: [
      'Everything in Standard',
      'Unlimited AI credits',
      'Collaborative notes',
      'Advanced analytics',
      'Early access to new features'
    ],
    notebookLimit: Infinity,
    aiCredits: Infinity
  }
];