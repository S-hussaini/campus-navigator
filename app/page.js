"use client";
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { 
  AcademicCapIcon, 
  SparklesIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col antialiased text-slate-900 font-light">
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <PageHeader />

      <main className="grow">
        {/* HERO SECTION */}
        <section className="relative px-6 pt-32 pb-40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.05),transparent)] -z-10" />
          
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <SparklesIcon className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Alberta's Official 2026 Guide</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-950 mb-8 tracking-tighter leading-[0.9]">
              Your Future <br />
              <span className="text-blue-900">Starts in Alberta.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Whether you're local or joining us from across the globe, find your place in Alberta’s 26 world-class institutions.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-3xl mx-auto relative group mb-12">
              <div className="relative flex bg-white rounded-4xl shadow-2xl border border-slate-100 p-3 items-center transition-all focus-within:ring-4 focus-within:ring-blue-100">
                <input
                  type="text"
                  placeholder="Ask about programs, visas, or scholarships..."
                  className="grow px-6 py-4 text-lg text-slate-800 focus:outline-none bg-transparent placeholder:text-slate-300"
                />
                <button className="bg-blue-900 hover:bg-slate-950 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-xs transition-all shadow-lg">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE PATHS */}
        <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "High Schoolers", desc: "Grades 10-12 planning for university.", icon: <AcademicCapIcon className="w-6 h-6"/>, link: "/howToApply" },
                { title: "International", desc: "Coming to Alberta from abroad.", icon: <GlobeAltIcon className="w-6 h-6"/>, link: "/international-guide" },
                { title: "Adult Learners", desc: "Returning to study or upskilling.", icon: <UserGroupIcon className="w-6 h-6"/>, link: "/adultlearners" }
            ].map((path, i) => (
                <Link href={path.link} key={i}>
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all">
                            {path.icon}
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">{path.title}</h4>
                        <p className="text-slate-500 text-sm font-medium mb-4">{path.desc}</p>
                        <div className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                            Explore Path <ArrowRightIcon className="w-3 h-3" />
                        </div>
                    </div>
                </Link>
            ))}
        </section>

        {/* SPLASH IMAGE GALLERY SECTION */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Discover Alberta</h2>
              <p className="text-slate-500 font-medium">Explore the cities and campuses you'll call home.</p>
            </div>
            <Link href="/campus" className="hidden md:flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-blue-900 bg-blue-50 px-6 py-3 rounded-xl border border-blue-100">
              View All Locations
            </Link>
          </div>

          <div className="flex gap-6 px-6 overflow-x-auto pb-8 no-scrollbar">
            {[
              { img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846", city: "Calgary", tag: "Tech & Business" },
              { img: "https://images.unsplash.com/photo-152305085306e-8a3d3efaf58d", city: "Edmonton", tag: "Research & Arts" },
              { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", city: "Lethbridge", tag: "Community & Science" },
              { img: "https://images.unsplash.com/photo-1498243639359-f7c89517fa01", city: "Medicine Hat", tag: "Innovation Hub" }
            ].map((item, i) => (
              <div key={i} className="min-w-75 md:min-w-100 h-125 rounded-[2.5rem] overflow-hidden relative group">
                <img src={`${item.img}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.city} />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.tag}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">{item.city}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE TOOLS SECTION */}
        <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20 mt-12">
          {/* Card 1: Funding */}
          <div className="group p-12 rounded-[3rem] bg-slate-950 text-white shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
                 <span className="text-2xl font-black text-blue-400">$</span>
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Alberta Student Aid</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                Access curated financial aid, grants, and bursaries across Alberta's academic landscape.
              </p>
            </div>
            <Link href="/funding" className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10 w-fit">
              Explore Funding
            </Link>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
          </div>

          {/* Card 2: Quiz */}
          <div className="group p-12 rounded-[3rem] bg-white border border-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center mb-8 border border-blue-100">
                <SparklesIcon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-slate-950 mb-6 tracking-tight">Pathfinder Quiz</h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                Not sure where to start? Match your interests with high-demand industries in 2 minutes.
              </p>
            </div>
            <Link href="/pathfinder">
              <button className="relative z-10 w-full py-6 bg-blue-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-3xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">
                Start Assessment
              </button>
            </Link>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px]" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}