import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: `You are the Campus Navigator Assistant. 
      1. Use **bold text** for important keywords or school names. 
      2. Use bulleted lists for program suggestions. 
      3. Keep paragraphs short (max 2-3 sentences).
      4. Never use headers (# H1) as they are too large for a chatbox.
      5. Always be encouraging and use a professional tone.`,
    });

    const firstUserIndex = history.findIndex(m => m.role === "user");
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory || [],
      generationConfig: { maxOutputTokens: 2000 },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Failed to connect to Gemini" }, { status: 500 });
  }
}