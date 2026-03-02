import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

let ai: GoogleGenAI | null = null;

async function main(prompt: string) {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined. Gemini features will not work.');
      return '{"error": "API Key missing"}';
    }
    ai = new GoogleGenAI({ apiKey });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Updated to a more standard model name if 2.5 was a placeholder or typo
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export default main;
