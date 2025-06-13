import ENV from '../config/env';
import { Note, Flashcard, Quiz, Question } from '../types';
import { api } from './api';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class AIService {
  private readonly API_KEY: string;
  private readonly API_URL: string;

  constructor() {
    this.API_KEY = ENV.AI.OPENAI_API_KEY;
    this.API_URL = 'https://api.openai.com/v1';
  }

  private async makeRequest<T>(endpoint: string, data: any): Promise<OpenAIResponse> {
    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    return response.json() as Promise<OpenAIResponse>;
  }

  async generateSummary(note: Note): Promise<string> {
    const prompt = `Summarize the following note in a concise way:\n\n${note.content}`;
    
    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant that creates concise summaries.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  }

  async generateFlashcards(note: Note): Promise<Flashcard[]> {
    const prompt = `Create 5 flashcards from the following note. Format each flashcard as JSON with 'front' and 'back' fields:\n\n${note.content}`;
    
    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant that creates effective flashcards.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });

    const flashcards = JSON.parse(response.choices[0].message.content);
    return flashcards.map((card: any) => ({
      id: `flashcard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      noteId: note.id,
      front: card.front,
      back: card.back,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  async generateQuiz(note: Note): Promise<Quiz> {
    const prompt = `Create a quiz with 5 multiple-choice questions from the following note. Format as JSON with 'title' and 'questions' array. Each question should have 'text', 'options' array, and 'correctOption' index:\n\n${note.content}`;
    
    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant that creates effective quizzes.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
    });

    const quizData = JSON.parse(response.choices[0].message.content);
    return {
      id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      noteId: note.id,
      title: quizData.title,
      questions: quizData.questions.map((q: any) => ({
        id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: q.text,
        options: q.options,
        correctOption: q.correctOption,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async analyzeHandwriting(imageUrl: string): Promise<string> {
    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Convert this handwritten note to text. Be as accurate as possible.' },
            { type: 'image_url', image_url: imageUrl },
          ],
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  }

  async suggestImprovements(note: Note): Promise<string[]> {
    const prompt = `Analyze this note and suggest 3 specific improvements for better understanding and retention:\n\n${note.content}`;
    
    const response = await this.makeRequest('/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant that provides specific improvement suggestions.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content.split('\n').filter(Boolean);
  }
}

export const aiService = new AIService(); 