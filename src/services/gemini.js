import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getMovieRecommendations = async (movies) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Recommend 3 movies similar to these: ${movies.join(', ')}. 
    For each recommendation, provide:
    - Title
    - Year
    - Brief reason for recommendation
    Format as JSON array with keys: title, year, reason`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json|```/g, '');
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get recommendations');
  }
};
