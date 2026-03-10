import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateDynamicQuestions() {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const prompt = `
    Generate 3 unique multiple-choice career aptitude questions for a high school student. 
    For each question, provide exactly 4 options. 
    Each option MUST subtly map to one of these 4 categories: "Builder", "Healer", "Creator", "Strategist".
    
    CRITICAL RULES:
    1. Keep the option text VERY short and punchy (maximum 4 to 6 words per option).
    2. Make the scenarios relatable to a high schooler's daily life, hobbies, or group projects.
    
    Return ONLY a valid JSON array of objects with this exact structure:
    [
      {
        "question": "Question text here?",
        "options": [
          { "text": "Short option 1", "category": "Builder" },
          { "text": "Short option 2", "category": "Healer" },
          { "text": "Short option 3", "category": "Creator" },
          { "text": "Short option 4", "category": "Strategist" }
        ]
      }
    ]
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const cleanedText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedText);
}

export async function evaluateQuizResults(userAnswers) {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const prompt = `
    The user took a career quiz and provided these answers:
    ${JSON.stringify(userAnswers)}
    
    Based on their answers, determine their dominant career archetype (Builder, Healer, Creator, or Strategist).
    
    EXPANDED DEFINITIONS (Think outside the box):
    - Builder: Software engineering, robotics, trades, architecture, agriculture tech, civil engineering.
    - Healer: Healthcare, psychology, teaching, human resources, environmental conservation, social work.
    - Creator: UX/UI design, digital marketing, culinary arts, game development, video production, writing.
    - Strategist: Data science, business, finance, law, cybersecurity, supply chain logistics, AI prompting.
    
    Return a comprehensive career assessment as a JSON object with this exact structure:
    {
      "archetype": "The winning archetype (e.g., Builder)",
      "title": "A professional title (e.g., Technical & Systems Innovator)",
      "summary": "2 encouraging sentences explaining why they fit this based on their specific answers.",
      "careers": ["List of 6 highly diverse, in-demand careers in Alberta spanning different industries within this archetype"],
      "courses": ["List of 4 specific post-secondary programs in Alberta (include specific schools like SAIT, NAIT, UofC, UofA, Mount Royal, or MacEwan)"],
      "futureSkill": "One highly specific future-proof skill they should focus on (e.g., 'Python for Data Analysis' instead of just 'Coding')"
    }
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const cleanedText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedText);
}