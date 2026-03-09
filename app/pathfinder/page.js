"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCareerGuidance } from "@/lib/gemini";

// 1. Career Mapping Data
const careerDetails = {
  Builder: {
    title: "Technical & Trades Specialist",
    icon: "⚡",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    list: [
      "Civil Engineering Tech",
      "Aircraft Mechanic",
      "Power Engineer",
      "Construction Manager",
      "Renewable Energy Tech",
    ],
  },
  Healer: {
    title: "Health & Wellness Professional",
    icon: "❤️",
    color: "bg-red-50 text-red-600 border-red-100",
    list: ["Registered Nurse", "Diagnostic Sonographer", "Paramedic", "Pharmacist", "Kinesiologist"],
  },
  Creator: {
    title: "Creative & Digital Innovator",
    icon: "🎨",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    list: ["UX/UI Designer", "Digital Media Producer", "Animator", "Interior Designer", "Marketing Content Lead"],
  },
  Strategist: {
    title: "Business & Systems Leader",
    icon: "📈",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    list: ["Data Analyst", "Project Manager", "Financial Advisor", "Cyber Security Analyst", "Supply Chain Lead"],
  },
};

const questions = [
  {
    question: "What's your ideal work environment?",
    options: [
      { text: "Hands-on in a workshop or industrial site", category: "Builder" },
      { text: "A high-stakes clinical or hospital setting", category: "Healer" },
      { text: "A high-end creative studio or digital space", category: "Creator" },
      { text: "A fast-paced corporate office or firm", category: "Strategist" },
    ],
  },
  {
    question: "How do you prefer to tackle a challenge?",
    options: [
      { text: "I build or fix a physical solution", category: "Builder" },
      { text: "I provide care and support to others", category: "Healer" },
      { text: "I create a new visual or concept", category: "Creator" },
      { text: "I analyze the data and lead the team", category: "Strategist" },
    ],
  },
  {
    question: "Which high school subject did you enjoy most?",
    options: [
      { text: "Applied Tech, Shop, or Physics", category: "Builder" },
      { text: "Biology, Chemistry, or Social Studies", category: "Healer" },
      { text: "Art, Design, or Media Studies", category: "Creator" },
      { text: "Business, Law, or Mathematics", category: "Strategist" },
    ],
  },
];

export default function PathfinderPage() {
  const [step, setStep] = useState(-1);
  const [scores, setScores] = useState({ Builder: 0, Healer: 0, Creator: 0, Strategist: 0 });

  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleAnswer = (cat) => {
    setScores((prev) => ({ ...prev, [cat]: prev[cat] + 1 }));
    setStep(step + 1);
  };

  const winnerKey = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const result = careerDetails[winnerKey];

  useEffect(() => {
    if (step === questions.length) {
      fetchAIRecommendation();
    }
  }, [step]);

  const fetchAIRecommendation = async () => {
    setIsLoadingAi(true);
    try {
      const data = await getCareerGuidance(winnerKey, scores);
      setAiRecommendation(data);
    } catch (error) {
      console.error("AI Fetch Error:", error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] antialiased flex flex-col">
      {/* 1. STICKY HEADER */}
      <nav className="w-full border-b border-gray-100 py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
        <Link href="/campus" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#b22222] rounded-full flex items-center justify-center text-white font-bold text-xs transition-transform group-hover:scale-110">
            A
          </div>
          <span className="font-black tracking-tighter text-xl uppercase">Campus Navigator</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/campus" className="hover:text-[#b22222]">
            Campuses
          </Link>
          <Link href="/careers" className="hover:text-blue-900">
            Careers
          </Link>
          <Link
            href="/contact"
            className="border-2 border-[#1a1a1a] px-4 py-2 rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all text-[#1a1a1a]"
          >
            Request Info
          </Link>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-grow">
        {step === -1 ? (
          /* INTRO / HERO SECTION */
          <div className="flex flex-col animate-in fade-in duration-700">
            <div className="max-w-5xl mx-auto w-full px-6 mt-10">
              <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden rounded-[2.5rem] shadow-xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1471"
                  alt="Students studying"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-16 text-center md:text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">
                Major Discovery Tool
              </span>
              <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">Take the Path Finder Quiz</h1>
              <div className="w-12 h-1 bg-[#b22222] mb-8 mx-auto md:mx-0" />
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Everyone learns differently. Answer a few questions about your habits and preferences to find the best
                industry and learning format for the way you live.
              </p>
              <button
                onClick={() => setStep(0)}
                className="px-12 py-5 bg-[#002855] text-white font-black rounded-full hover:bg-blue-800 transition-all uppercase tracking-widest text-sm shadow-lg shadow-blue-100"
              >
                Begin Assessment
              </button>
              <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Takes about 3 minutes
              </p>
            </div>
          </div>
        ) : step < questions.length ? (
          /* QUESTION PHASE */
          <div className="max-w-3xl mx-auto px-8 py-20 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <span className="text-[#b22222] font-black text-xs tracking-[0.3em] uppercase">Phase 0{step + 1}</span>
                <h2 className="text-4xl font-black text-slate-900 mt-4 leading-tight">{questions[step].question}</h2>
              </div>
              <span className="text-gray-300 font-mono text-xl">
                {step + 1}/{questions.length}
              </span>
            </div>

            <div className="grid gap-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.category)}
                  className="w-full p-8 text-left rounded-3xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50/30 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-white transition-all mr-6 font-bold text-sm">
                      0{i + 1}
                    </span>
                    <span className="text-xl font-bold text-slate-700">{opt.text}</span>
                  </div>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 text-blue-600">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT PHASE */
          <div className="max-w-4xl mx-auto px-8 py-20 text-center animate-in zoom-in-95 duration-700">
            <div
              className={`w-20 h-20 ${result.color} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border`}
            >
              {result.icon}
            </div>

            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4 border border-blue-100">
              Analysis Complete
            </span>

            <h2 className="text-6xl font-black mb-4 text-slate-900 tracking-tighter italic">The {winnerKey}</h2>

            <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
              Your profile aligns perfectly with high-demand roles in Alberta. Based on your {winnerKey} traits, explore
              these careers:
            </p>

            {isLoadingAi ? (
              <div className="py-10 animate-pulse text-blue-600 font-bold">Gemini is analyzing your path...</div>
            ) : (
              aiRecommendation && (
                <div className="max-w-2xl mx-auto mb-12 p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 text-left">
                  <h3 className="text-blue-900 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    AI Tailored Insights
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-6 italic">{aiRecommendation.summary}</p>

                  <div className="grid grid-cols-1 gap-4">
                    <h4 className="font-bold text-slate-900 text-sm uppercase">Recommended Alberta Programs:</h4>
                    {aiRecommendation.courses.map((course, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                        <span className="text-blue-500">✦</span> {course}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-blue-100">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Focus Skill:</span>
                    <p className="font-bold text-slate-800">{aiRecommendation.futureSkill}</p>
                  </div>
                </div>
              )
            )}

            {/* CAREER LIST GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12 max-w-2xl mx-auto">
              {result.list.map((job, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:border-blue-200 hover:bg-white transition-all group"
                >
                  <span className="w-8 h-8 rounded-full bg-white group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100 transition-colors">
                    0{i + 1}
                  </span>
                  <span className="font-bold text-slate-700 text-left">{job}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <Link href={`/campus?search=${winnerKey}`} className="w-full max-w-md">
                <button className="w-full py-6 bg-[#1a1a1a] text-white font-black rounded-2xl text-xl uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-gray-100">
                  View My Schools
                </button>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="text-xs font-bold text-gray-400 hover:text-[#b22222] uppercase tracking-widest transition-colors mt-4"
              >
                ↺ Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER */}
      <footer className="w-full border-t border-gray-100 py-10 text-center bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-gray-900">
              Contact
            </Link>
          </div>
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Designed for Alberta Students © 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
