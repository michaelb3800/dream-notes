import { summarizeNote, generateFlashcards, explainConcept } from '../services/ai';

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ choices: [{ message: { content: '{"a":"b"}' } }] }) })
) as any;

describe('AI service', () => {
  it('summarizeNote returns text', async () => {
    const text = await summarizeNote('hello');
    expect(text).toBe('{"a":"b"}');
  });

  it('generateFlashcards parses JSON', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ choices: [{ message: { content: '[{"front":"f","back":"b"}]' } }] }) });
    const cards = await generateFlashcards('note');
    expect(cards[0].front).toBe('f');
  });

  it('explainConcept returns text', async () => {
    const text = await explainConcept('concept');
    expect(text).toBe('{"a":"b"}');
  });
});
