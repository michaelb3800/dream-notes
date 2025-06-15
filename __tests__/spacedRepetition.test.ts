import { scheduleNextReview } from '../utils/spacedRepetition';

describe('SM-2 scheduler', () => {
  it('increases repetition on good quality', () => {
    const updated = scheduleNextReview({ id: '1', noteId: 'n', front: 'f', back: 'b', tags: [], createdAt: '', updatedAt: '' } as any, 5);
    expect(updated.repetitions).toBe(1);
    expect(updated.nextReview).toBeGreaterThan(Date.now());
  });
});
