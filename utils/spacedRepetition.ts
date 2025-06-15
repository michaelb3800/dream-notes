import { Flashcard } from '@/types';

export function scheduleNextReview(card: Flashcard, quality: number): Flashcard {
  const q = Math.max(0, Math.min(5, quality));
  const repetitions = (card.repetitions ?? 0) + (q >= 3 ? 1 : 0);
  const ease = Math.max(1.3, (card.easeFactor ?? 2.5) + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  const interval = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.round((card.interval ?? 1) * ease);
  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

  return {
    ...card,
    repetitions,
    easeFactor: ease,
    interval,
    nextReview,
  };
}
