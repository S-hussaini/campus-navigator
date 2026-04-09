"use client";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "../../components/SiteHeader";
import { generateDynamicQuestions, evaluateQuizResults } from "@/lib/gemini";

// Visual themes for the final results
const themeMap = {
  Builder: { icon: "⚡", color: "bg-orange-50 text-orange-600 border-orange-100" },
  Healer: { icon: "❤️", color: "bg-red-50 text-red-600 border-red-100" },
  Creator: { icon: "🎨", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  Strategist: { icon: "📈", color: "bg-blue-50 text-blue-600 border-blue-100" },
};

export default function PathfinderPage() {
  const [step, setStep] = useState(-1);
  
  // AI States
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [resultData, setResultData] = useState(null);
  
  // Loading States
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);

  // Triggered when user clicks "Begin Assessment"
  const handleStartQuiz = async () => {
    setIsGeneratingQuiz(true);
    try {
      const generatedQuestions = await generateDynamicQuestions();
      generatedQuestions.forEach(q => q.options.sort(() => Math.random() - 0.5));
      setQuestions(generatedQuestions);
      setStep(0);
    } catch (error) {
      console.error("Failed to generate questions", error);
      alert("Uh oh! AI is taking a break. Try again in a moment.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Triggered when user clicks an answer
  const handleAnswer = async (questionText, selectedOption) => {
    const newAnswers = [
      ...userAnswers, 
      { question: questionText, answer: selectedOption.text, category: selectedOption.category }
    ];
    setUserAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
      setIsAssessing(true);
      try {
        const assessment = await evaluateQuizResults(newAnswers);
        setResultData(assessment);
      } catch (error) {
        console.error("Failed to evaluate results", error);
      } finally {
        setIsAssessing(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] antialiased flex flex-col">
      {/* 1. STICKY HEADER */}
      {/* <nav className="w-full border-b border-gray-100 py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-100">
        <Link href="/campus" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#b22222] rounded-full flex items-center justify-center text-white font-bold text-xs transition-transform group-hover:scale-110">
            A
          </div>
          <span className="font-black tracking-tighter text-xl uppercase">Campus Navigator</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/" className="hover:text-[#b22222]">Home</Link>
          <Link href="/campus" className="hover:text-[#b22222]">Campuses</Link>
          <Link href="/careers" className="hover:text-blue-900">Careers</Link>
          <Link href="/contact" className="border-2 border-[#1a1a1a] px-4 py-2 rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all text-[#1a1a1a]">
            Request Info
          </Link>
        </div>
      </nav> */}
      <PageHeader />

      {/* 2. MAIN CONTENT AREA */}
      <div className="grow">
        {step === -1 ? (
          /* YOUR ORIGINAL HERO SECTION */
          <div className="flex flex-col animate-in fade-in duration-700">
            <div className="max-w-5xl mx-auto w-full px-6 mt-10">
              <div className="w-full h-75 md:h-100 relative overflow-hidden rounded-[2.5rem] shadow-xl border border-gray-100">
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
                onClick={handleStartQuiz}
                disabled={isGeneratingQuiz}
                className="px-12 py-5 bg-[#002855] text-white font-black rounded-full hover:bg-blue-800 transition-all uppercase tracking-widest text-sm shadow-lg shadow-blue-100 disabled:opacity-70 disabled:cursor-wait"
              >
                {isGeneratingQuiz ? "Generating Quiz..." : "Begin Assessment"}
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
              <span className="text-gray-300 font-mono text-xl">{step + 1}/{questions.length}</span>
            </div>

            <div className="grid gap-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(questions[step].question, opt)}
                  className="w-full p-8 text-left rounded-3xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50/30 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-white transition-all mr-6 font-bold text-sm">0{i + 1}</span>
                    <span className="text-xl font-bold text-slate-700">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT PHASE */
          <div className="max-w-4xl mx-auto px-8 py-20 text-center">
            {isAssessing || !resultData ? (
               <div className="py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  <h2 className="text-2xl font-bold text-blue-900">AI is analyzing your answers...</h2>
               </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-700">
                <div className={`w-20 h-20 ${themeMap[resultData.archetype]?.color || 'bg-gray-100 text-gray-600'} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border`}>
                  {themeMap[resultData.archetype]?.icon || '✨'}
                </div>

                <h2 className="text-6xl font-black mb-2 text-slate-900 tracking-tighter italic">The {resultData.archetype}</h2>
                <h3 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">{resultData.title}</h3>

                <div className="max-w-2xl mx-auto mb-12 p-8 bg-blue-50/50 rounded-4xl border border-blue-100 text-left">
                  <p className="text-slate-700 leading-relaxed mb-6 italic">{resultData.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3">Careers</h4>
                      <ul className="space-y-2">
                        {resultData.careers.map((career, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-blue-500">✦</span> {career}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3">Programs</h4>
                      <ul className="space-y-2">
                        {resultData.courses.map((course, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-blue-500">✦</span> {course}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-blue-100">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Focus Skill:</span>
                    <p className="font-bold text-slate-800">{resultData.futureSkill}</p>
                  </div>
                </div>

                <button onClick={() => window.location.reload()} className="text-xs font-bold text-gray-400 hover:text-[#b22222] uppercase tracking-widest transition-colors mt-4">
                  ↺ Retake Assessment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. FOOTER */}
      <footer className="w-full border-t border-gray-100 py-10 text-center bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Use</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
          </div>
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Designed for Alberta Students © 2026
          </p>
        </div>
      </footer>
    </main>
  );
}