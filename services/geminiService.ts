
import { GoogleGenAI } from '@google/genai';
import { Fund } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and will show an alert.
  // In a real production environment, the API_KEY should be securely managed.
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeFundWithGemini = async (fund: Fund): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject("API Key for Gemini is not configured.");
  }
  
  try {
    const prompt = `
      Analyze the following mutual fund for a potential retail investor. Provide the analysis in Markdown format.
      The analysis should be objective and should NOT include any financial advice or guarantees of future performance.
      
      Structure your response with the following sections:
      - **Fund Overview:** A brief summary of the fund's nature.
      - **Potential Strengths:** 2-3 bullet points on possible advantages based on its structure and factors.
      - **Potential Considerations:** 2-3 bullet points on risks or things an investor should be aware of.
      - **Concluding Thought:** A neutral concluding sentence.

      ---
      **Fund Details:**
      - **Name:** ${fund.name}
      - **Structure:** ${fund.structure}
      - **Stated Risk Level:** ${fund.riskLevel}
      - **Key Investment Factors:** ${fund.factors.join(', ')}
      ---
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
};
