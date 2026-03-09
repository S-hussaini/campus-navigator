import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getCareerGuidance(category, scores) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    The user just took a career quiz and scored as a "${category}". 
    Their full score profile was: ${JSON.stringify(scores)}.
    
    Task:
    1. Provide a 2-sentence encouraging summary of why they fit this profile.
    2. Suggest 3 specific high-growth degree or diploma programs available in Alberta, Canada that fit this category.
    3. Mention one "Future Skill" they should focus on.
    
    Keep the tone professional, bold, and encouraging. Format the response as a JSON object with keys: "summary", "courses" (array), and "futureSkill".
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().replace(/```json|```/g, "");
  return JSON.parse(text);
}