import Image from 'next/image';
import Link from 'next/link';
import PageHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-['Lexend'] antialiased text-slate-900">
      {/* Font & Icon Imports */}
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      <PageHeader />

      <main className="grow">
        {/* HERO SECTION: Refined & Minimalist */}
        <section className="relative px-6 pt-24 pb-32 overflow-hidden bg-[#F8FAFC]">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent -z-10" />
          <div className="max-w-5xl mx-auto text-center">
           

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 mb-6 tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="text-blue-900">Future in Alberta</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Navigate 26 premier institutions with precision. Discover specialized programs, funding, and your path to a career.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="relative flex bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 items-center">
                <div className="pl-4 text-slate-400">
                  <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input
                  type="text"
                  placeholder="Find a university or career..."
                  className="grow px-4 py-4 text-lg text-slate-800 focus:outline-none bg-transparent placeholder:text-slate-300"
                />
                <button className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID: Card Modernization */}
        <section className="max-w-6xl mx-auto px-6 -mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pb-24 relative z-20">
          {/* Card 1: Funding */}
          <div className="group p-10 rounded-[2.5rem] bordershadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-14 h-14 text-slate-950 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Alberta Student Aid</h3>
              <p className="text-slate-500 leading-relaxed mb-10">
                Access curated financial aid opportunities across Alberta's diverse academic landscape.
              </p>
            </div>
            <a href="#" className="relative z-10 flex items-center gap-2 text-blue-900 font-bold group/link  hover:bg-blue-50 ">
              Explore Funding <span className="material-symbols-outlined text-xl transition-transform group-hover/link:translate-x-1">arrow_forward</span>
            </a>
            
          </div>

          {/* Card 2: Quiz */}
          <div className="group  p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-14 h-14 text-slate-950 rounded-2xl flex items-center justify-center mb-8">
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Pathfinder Quiz</h3>
              <p className="text-slate-400 leading-relaxed mb-10">
                Match your interests with high-demand industries in Alberta's growing economy.
              </p>
            </div>
            <button className="relative z-10 w-fit px-8 py-3 text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Start Assessment
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </section>

      </main>
    </div>
  );
}