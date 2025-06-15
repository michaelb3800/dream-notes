import ENV from '../config/env';

const OPENAI_API = 'https://api.openai.com/v1';

interface ChatChoice {
  message: { content: string };
}

interface ChatResponse {
  choices: ChatChoice[];
}

async function requestWithBackoff(url: string, options: RequestInit & { timeout?: number }, retries = 2, delay = 1000): Promise<any> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout ?? 10000);
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      throw new Error(`status ${res.status}`);
    }
    return res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, delay));
      return requestWithBackoff(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ENV.AI.OPENAI_API_KEY}`,
};

export async function summarizeNote(text: string): Promise<string> {
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Summarize the provided note in a concise paragraph.' },
      { role: 'user', content: text },
    ],
    max_tokens: 150,
  };
  const data: ChatResponse = await requestWithBackoff(`${OPENAI_API}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(body) });
  return data.choices[0].message.content.trim();
}

export async function generateFlashcards(text: string): Promise<Array<{ front: string; back: string }>> {
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Create 5 study flashcards as JSON with front and back.' },
      { role: 'user', content: text },
    ],
    max_tokens: 300,
  };
  const data: ChatResponse = await requestWithBackoff(`${OPENAI_API}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(body) });
  return JSON.parse(data.choices[0].message.content);
}

export async function explainConcept(concept: string): Promise<string> {
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Explain the concept in simple terms for a student.' },
      { role: 'user', content: concept },
    ],
    max_tokens: 200,
  };
  const data: ChatResponse = await requestWithBackoff(`${OPENAI_API}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(body) });
  return data.choices[0].message.content.trim();
}

export async function createIllustration(prompt: string): Promise<string> {
  const body = { prompt, n: 1, size: '1024x1024' };
  const data = await requestWithBackoff(`${OPENAI_API}/images/generations`, { method: 'POST', headers, body: JSON.stringify(body) });
  return data.data[0].url as string;
}
