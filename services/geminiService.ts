import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Check if API key is valid
const getApiKey = (): string | null => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return apiKey;
};

// Lazy initialization - only create client when API key is available
let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const initializeClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set. Please set it in .env.local file.');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const client = initializeClient();
    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Check if API key is available before attempting to use it
    const apiKey = getApiKey();
    if (!apiKey) {
      return "API key not configured. Please set GEMINI_API_KEY in your .env.local file.";
    }
    
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm receiving some interference. Could you repeat that?";
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes('API Key')) {
      return "API key not configured. Please set GEMINI_API_KEY in your .env.local file.";
    }
    return "Connection to the neural link failed. Please try again later.";
  }
};