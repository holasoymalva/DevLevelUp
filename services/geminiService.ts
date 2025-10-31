
import { GoogleGenAI } from "@google/genai";

export const fetchCodeQualityTip = async (): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "API key not configured. Please set your API_KEY environment variable.";
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Give me a concise, actionable code quality tip for a software engineer. Focus on a single concept like clean code, testing, or design patterns. The tip should be no more than 2 sentences and formatted as plain text.'
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching code quality tip:", error);
    return "Could not fetch a tip right now. But here's a timeless one: 'Always leave the code better than you found it.'";
  }
};
