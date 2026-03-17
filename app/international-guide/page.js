"use client";
import { useState } from "react";
import PageHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  BookOpenIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  TruckIcon,
  KeyIcon,
  CreditCardIcon,
  CloudIcon
} from "@heroicons/react/24/outline";

export default function InternationalGuide() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const arrivalSteps = [
    { id: 'bank', title: "Open a Bank Account", icon: <CreditCardIcon className="w-5 h-5"/>, desc: "Visit RBC, TD, or Scotiabank with your Study Permit." },
    { id: 'sin', title: "Get your SIN", icon: <ShieldCheckIcon className="w-5 h-5"/>, desc: "Apply for a Social Insurance Number to work off-campus." },
    { id: 'phone', title: "Canadian SIM Card", icon: <GlobeAltIcon className="w-5 h-5"/>, desc: "Get a local number for job apps and housing." },
    { id: 'id', title: "Alberta ID Card", icon: <CheckBadgeIcon className="w-5 h-5"/>, desc: "Official gov photo ID so you don't carry your passport." },
  ];

  const guides = [
    {
      title: "Legal Authority",
      subtitle: "Study Permits & Visas",
      icon: <GlobeAltIcon className="w-6 h-6 text-[#b22222]" />,
      requirement: "Letter of Acceptance (LOA)",
      details: [
        "Must be from a Designated Learning Institution (DLI).",
        "Apply via IRCC as soon as you get your LOA.",
        "Ensure your passport is valid for at least 6 months."
      ]
    },
    {
      title: "Language Skills",
      subtitle: "English Proficiency",
      icon: <BookOpenIcon className="w-6 h-6 text-[#b22222]" />,
      requirement: "IELTS 6.5 or Equivalent",
      isInteractive: true,
      details: [
        "TOEFL (iBT) 90+ is generally accepted.",
        "Scores must be less than 2 years old."
      ],
      links: [
        { name: "Take Duolingo Test", url: "https://englishtest.duolingo.com/", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        { name: "IELTS Practice", url: "https://www.ielts.org/for-test-takers/sample-test-questions", color: "text-blue-600 bg-blue-50 border-blue-100" }
      ]
    },
    {
      title: "Financial Proof",
      subtitle: "Tuition & Living Costs",
      icon: <CurrencyDollarIcon className="w-6 h-6 text-[#b22222]" />,
      requirement: "$20,635 CAD + Tuition",
      details: [
        "Show proof of funds for 1 full year of tuition.",
        "Federal requirement: $20,635 for living expenses.",
        "Bank statements must show at least 4 months of history."
      ]
    },
    {
      title: "Health Security",
      subtitle: "Healthcare Coverage",
      icon: <ShieldCheckIcon className="w-6 h-6 text-[#b22222]" />,
      requirement: "AHCIP or Private Insurance",
      details: [
        "12-month study permit holders get free Alberta Healthcare.",
        "Shorter stays require mandatory private health plans.",
        "Check if your institution includes insurance in fees."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased font-light">
      <PageHeader />
      
      <main className="grow max-w-6xl mx-auto px-6 py-20">
        
        {/* WELCOME SECTION */}
        <div className="mb-16 text-center relative">
          <div className="flex justify-center gap-4 mb-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
             <span className="text-4xl">🇨🇦</span><span className="text-4xl">🇮🇳</span><span className="text-4xl">🇳🇬</span><span className="text-4xl">🇵🇭</span><span className="text-4xl">🇨🇳</span><span className="text-4xl">🇲🇽</span><span className="text-4xl">🇧🇷</span><span className="text-4xl">🇻🇳</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#b22222] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b22222]">International Success Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter mb-4">
            Global Student <span className="text-[#b22222]">Checklist</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Everything you need to navigate from your home country to your first week in Alberta.</p>
        </div>

        {/* FEATURED GLOBAL IMAGE */}
        <div className="w-full h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl relative border border-slate-200">
            <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
                alt="Diverse International Students" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-12">
                <div className="max-w-xl">
                    <h2 className="text-white text-3xl font-black mb-2 tracking-tight">Alberta Welcomes You</h2>
                    <p className="text-slate-300 font-medium">Join a vibrant community of scholars from over 150 nations.</p>
                </div>
            </div>
        </div>

        {/* GUIDES GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {guides.map((item, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col hover:border-red-100 transition-all group">
              <div className="p-8 pb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-[#b22222] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.title}</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{item.subtitle}</h3>
                  </div>
                </div>
              </div>

              <div className="mx-8 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3">
                <CheckBadgeIcon className="w-5 h-5 text-[#b22222]" />
                <span className="text-xs font-bold text-[#b22222] uppercase tracking-wide">Must Have: {item.requirement}</span>
              </div>

              <div className="p-8 pt-6 grow">
                <ul className="space-y-3 mb-6">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex gap-3 text-sm text-slate-600 font-medium">
                      <span className="text-slate-300">•</span> {detail}
                    </li>
                  ))}
                </ul>

                {item.isInteractive && (
                  <div className="flex flex-col gap-2 mt-4">
                    {item.links.map((link, lIdx) => (
                      <a 
                        key={lIdx}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all hover:shadow-md active:scale-95 ${link.color}`}
                      >
                        {link.name}
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* THE "SETTLING IN" INTERACTIVE TRACKER */}
        <section className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <TruckIcon className="w-8 h-8 text-blue-600" />
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Your First Week</h2>
                    </div>
                    <p className="text-slate-500 mb-8 font-medium">Once you land in Alberta, complete these four essential tasks to set up your new life. Click them as you finish!</p>
                    
                    <div className="space-y-3">
                        {arrivalSteps.map((step) => (
                            <button 
                                key={step.id}
                                onClick={() => toggleItem(step.id)}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                                    checkedItems[step.id] 
                                    ? "bg-emerald-50 border-emerald-200" 
                                    : "bg-slate-50 border-slate-100 hover:border-blue-200"
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                    checkedItems[step.id] ? "bg-emerald-500 text-white" : "bg-white text-slate-400 shadow-sm"
                                }`}>
                                    {checkedItems[step.id] ? "✓" : step.icon}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${checkedItems[step.id] ? "text-emerald-900 line-through opacity-60" : "text-slate-900"}`}>{step.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{step.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* WINTER READINESS CARD */}
                <div className="bg-slate-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <CloudIcon className="w-12 h-12 text-blue-400 mb-6" />
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Alberta Winter Ready?</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">Alberta can reach -30°C in winter. Don't worry, we're built for it! Follow the 3-layer rule:</p>
                    
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                            <div>
                                <p className="font-bold text-sm uppercase tracking-widest text-blue-400">Base Layer</p>
                                <p className="text-xs text-slate-500">Thermal wear to wick away moisture.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                            <div>
                                <p className="font-bold text-sm uppercase tracking-widest text-blue-400">Mid Layer</p>
                                <p className="text-xs text-slate-500">Fleece or wool for insulation.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
                            <div>
                                <p className="font-bold text-sm uppercase tracking-widest text-blue-400">Outer Shell</p>
                                <p className="text-xs text-slate-500">Windproof and waterproof parka.</p>
                            </div>
                        </li>
                    </ul>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]" />
                </div>
            </div>
        </section>

        {/* WORLD PHOTOS MASONRY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover shadow-lg border border-white" alt="Student Life" />
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover shadow-lg mt-8 border border-white" alt="Student Fun" />
            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover shadow-lg border border-white" alt="Group Study" />
           
        </div>

        {/* FINAL CTA */}
        <div className=" p-12 text-center text-black relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Ready to start your adventure?</h2>
            <button 
              onClick={() => window.location.href = '/campus'}
              className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Browse Campus Locations
            </button>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}