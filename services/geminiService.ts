import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize the client
// Constraint: API Key must come from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
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
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm receiving some interference. Could you repeat that?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the neural link failed. Please try again later.";
  }
};