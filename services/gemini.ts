
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWizardHelp = async (userPrompt: string) => {
  if (!process.env.API_KEY) return "I cannot assist without a magical essence (API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Wizard Grandmaster of the "Wizard" programming language.
      The syntax is as follows:
      - invoke book of picture (Must be first)
      - enchant background "color"
      - conjure circle at x y size r color "color"
      - manifest square at x y size s color "color"
      - cast line from x1 y1 to x2 y2 color "color" width w
      - scribble text "string" at x y color "color"

      User wants to know: ${userPrompt}
      Respond as a helpful, mystical wizard. Provide code snippets using only the Wizard syntax. Keep it brief.`,
    });

    return response.text;
  } catch (err) {
    console.error(err);
    return "The stars are obscured... I cannot see your future code right now.";
  }
};
