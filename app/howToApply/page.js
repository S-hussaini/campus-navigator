"use client";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import {
  UserIcon,
  ClipboardDocumentIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  GlobeAmericasIcon,
  IdentificationIcon,
  LanguageIcon,
  AcademicCapIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";

const localSteps = [
  { title: "Alberta.ca Account", icon: <UserIcon className="w-12 h-12 text-blue-900 mb-4" />, description: "Sign in with a basic Alberta.ca account. No verified account is required for initial applications." },
  { title: "Profile & ASN", icon: <ClipboardDocumentIcon className="w-12 h-12 text-blue-900 mb-4" />, description: "Enter your Alberta Student Number (ASN). If you don't have one, the system will generate it automatically." },
  { title: "Select Programs", icon: <DocumentCheckIcon className="w-12 h-12 text-blue-900 mb-4" />, description: "Choose your institution and major. You can apply to multiple schools; fees are paid per application." },
  { title: "Transcripts", icon: <BanknotesIcon className="w-12 h-12 text-blue-900 mb-4" />, description: "Alberta high school transcripts are sent automatically. No manual upload is usually needed." }
];

const internationalSteps = [
  { title: "Educational Credential", icon: <AcademicCapIcon className="w-12 h-12 text-[#b22222] mb-4" />, description: "Provide certified translations of your high school or university transcripts for evaluation." },
  { title: "English Proficiency", icon: <LanguageIcon className="w-12 h-12 text-[#b22222] mb-4" />, description: "Submit valid IELTS, TOEFL, or Duolingo scores as required by your chosen Alberta institution." },
  { title: "Study Permit (IRCC)", icon: <GlobeAmericasIcon className="w-12 h-12 text-[#b22222] mb-4" />, description: "Apply for your Canadian Study Permit once you receive your Letter of Acceptance (LOA)." },
  { title: "Health Insurance", icon: <IdentificationIcon className="w-12 h-12 text-[#b22222] mb-4" />, description: "International students must arrange for private or provincial health coverage during their stay." }
];

export default function HowToApplyPage() {
  const [activeTab, setActiveTab] = useState("local");
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = (e) => {
    if (activeTab === "local") {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased font-ligth">
      <PageHeader />

      {/* DOMESTIC CHOICE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-100lex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            
            <div className="text-center mb-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Tailor your application</h3>
              <p className="text-slate-500 font-medium">Which path best describes you?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/adultlearners" className="group p-8 rounded-4xl bg-slate-50 border border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-1">Adult Learner</h4>
                <p className="text-slate-500 text-xs font-medium">Returning to study or changing careers.</p>
              </Link>

              <a href="https://account.alberta.ca/ui/sign-in/signin" className="group p-8 rounded-4xl-slate-50 border border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <AcademicCapIcon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-1">Student</h4>
                <p className="text-slate-500 text-xs font-medium">Applying from High School.</p>
              </a>
            </div>
          </div>
        </div>
      )}

      <header className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Process & Timeline</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Your Journey <span className="text-blue-600 font-light italic">Starts Here.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Step-by-step instructions for domestic and international applicants to Alberta's 26 premier institutions.
          </p>
        </div>
      </header>

      <main className="grow max-w-6xl mx-auto px-6 pb-24 w-full relative">
        <div className="flex justify-center mb-16 relative z-10">
          <div className="bg-white p-2 rounded-3xl flex gap-1 border border-slate-200 shadow-xl">
            <button
              onClick={() => setActiveTab("local")}
              className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === "local" ? "bg-blue-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-950"}`}
            >
              Domestic Students
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === "international" ? "bg-[#b22222] text-white shadow-lg" : "text-slate-400 hover:text-slate-950"}`}
            >
              International Students
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative z-10">
          {(activeTab === "local" ? localSteps : internationalSteps).map((step, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-50 flex flex-col items-center text-center group hover:-translate-y-3 transition-all duration-500">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                {step.icon}
              </div>
              <h2 className={`text-xl font-black mb-4 tracking-tight ${activeTab === "local" ? "text-blue-950" : "text-[#b22222]"}`}>{step.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 rounded-[3rem] overflow-hidden shadow-2xl relative min-h-87.5">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1500&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Students" />
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/90 via-blue-900/20 to-transparent flex items-end p-10">
                    <p className="text-white font-bold italic text-lg leading-tight">"The application was the first step toward my career in Canada."</p>
                </div>
            </div>

            <section className="lg:col-span-3 bg-slate-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-white/5">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-6 tracking-tight">Ready to apply?</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
                        {activeTab === "local" ? "Join thousands of students who have launched their careers through Alberta's streamlined portal." : "Start your international adventure. Ensure you have your visa requirements checked."}
                    </p>
                    
                    <a
                        href={activeTab === "local" ? "#" : "/international-guide"}
                        onClick={handleCTAClick}
                        className={`inline-block px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === "local" ? "bg-blue-600 hover:bg-blue-500" : "bg-[#b22222] hover:bg-red-500"} text-white shadow-xl hover:scale-105 active:scale-95`}
                    >
                        {activeTab === "local" ? "Start Domestic Application" : "International Student Guide"}
                    </a>
                </div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
            </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}