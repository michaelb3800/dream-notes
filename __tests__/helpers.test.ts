import { truncateText, shuffleArray } from '../utils/helpers';

describe('truncateText', () => {
  it('returns the original text if shorter than the limit', () => {
    const text = 'Hello world';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('truncates and adds ellipsis when text exceeds the limit', () => {
    const text = 'This is a long sentence that needs truncating';
    expect(truncateText(text, 10)).toBe('This is a ...');
  });
});

describe('shuffleArray', () => {
  it('returns a new array with the same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    expect(shuffled).not.toBe(original); // should be a new array
    expect(shuffled).toHaveLength(original.length);
    expect(shuffled).toEqual(expect.arrayContaining(original));
  });
});
