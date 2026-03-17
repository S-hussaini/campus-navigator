"use client";
import PageHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  BriefcaseIcon, 
  ClockIcon, 
  LightBulbIcon, 
  AcademicCapIcon,
  ArrowPathIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

export default function AdultLearnersPage() {
  const features = [
    {
      title: "Flexible Delivery",
      desc: "Choose from evening classes, weekend intensives, or 100% online programs designed for working professionals.",
      icon: <ClockIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Prior Learning (PLAR)",
      desc: "Get academic credit for your years of work experience. Don't start from zero—fast-track your credential.",
      icon: <ArrowPathIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Micro-Credentials",
      desc: "Short, stackable certificates that prove your skills in specific areas like AI, Project Management, or Green Tech.",
      icon: <LightBulbIcon className="w-6 h-6 text-indigo-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased font-light">
      <PageHeader />
      
      <main className="grow">
        {/* HERO SECTION - Professional & Focused */}
        <header className="pt-24 pb-16 px-6 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Upskill • Reskill • Advance
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
              The Next Chapter <br />
              <span className="text-indigo-600 italic font-light">of your career.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Alberta’s institutions offer specialized pathways for mature students returning to education after years in the workforce.
            </p>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-20">
          {/* THREE CORE PILLARS */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-200 transition-all">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* DYNAMIC CONTENT BLOCK: FUNDING FOR ADULTS */}
          <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-16 text-white relative overflow-hidden mb-24">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-6">
                  <CurrencyDollarIcon className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Grant Opportunities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Alberta Canada <br/> Job Grant</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Did you know your employer can receive up to <span className="text-white font-bold">$10,000</span> to cover 2/3 of your training costs? High-demand skills are prioritized.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-900/40">
                  Check Eligibility
                </button>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden rotate-3 shadow-2xl border-8 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                  alt="Adult learners in a boardroom setting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          </div>

          {/* MATURE STUDENT PATHWAY */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">How to Return to Study</h2>
            <p className="text-slate-500 font-medium">Four steps to balancing life, work, and growth.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {[
              { step: "01", title: "Assessment", text: "Book a free advising session to review your goals." },
              { step: "02", title: "PLAR Review", text: "Submit your resume to see which credits you already own." },
              { step: "03", title: "Sponsorship", text: "Apply for the Job Grant or Student Aid for Adults." },
              { step: "04", title: "Enroll", text: "Start your program with a cohort of like-minded peers." }
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative group hover:bg-white hover:shadow-lg transition-all">
                <span className="text-4xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors block mb-4">{s.step}</span>
                <h4 className="font-black text-slate-900 mb-2 tracking-tight">{s.title}</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-indigo-50 py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8">
                <BriefcaseIcon className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Not sure which path to take?</h2>
            <p className="text-slate-500 text-lg mb-10 font-medium">Our Pathfinder Quiz includes specific logic for mature learners and industry transitions.</p>
            <button 
              onClick={() => window.location.href = '/pathfinder'}
              className="bg-indigo-900 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl"
            >
              Take the Pathfinder Quiz
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}