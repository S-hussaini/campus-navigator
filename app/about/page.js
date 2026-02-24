"use client";

import PageHeader from "../../components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-['Lexend'] antialiased">
      {/* Required for Lexend Font & Material Icons */}
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />

      <PageHeader />

      <main>
        {/* Hero Section: Our Mission */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-slate-900">
              Empowering Your <span className="text-blue-900">Educational Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
              Our mission is to help every student find their perfect fit among Alberta's 26 premier institutions. 
              We provide a friendly platform designed to simplify your search for higher education through 
              data-driven clarity and student-first tools.
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-24 h-1.5 bg-blue-900 rounded-full"></div>
              <div className="w-12 h-1.5 bg-green-800 rounded-full"></div>
              <div className="w-6 h-1.5 bg-slate-200 rounded-full"></div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#1152d4]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-3xl"></div>
        </section>

        {/* Comparison Section: What We Do vs What We Don't Do */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* What This Platform Does */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[#22c55e] text-3xl font-bold"></span>
                  <h3 className="text-2xl font-black tracking-tight">What This Platform Does</h3>
                </div>
                <div className="grid gap-4">
                  {[
                    { title: "26 Institutions", desc: "Lists all 26 publicly funded post-secondary institutions in Alberta in one searchable place." },
                   
                    { title: "Official Access", desc: "Provides direct links to official websites and the Alberta account application page."}
                  ].map((item, idx) => (
                    <div key={idx} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#22c55e]/30 transition-all">
                      <div className="flex gap-4">
                        <div className="p-2 bg-[#22c55e]/10 text-[#22c55e] rounded-xl h-fit">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What This Platform Does Not Do */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[#1152d4] text-3xl font-bold"></span>
                  <h3 className="text-2xl font-black tracking-tight">What We Do Not Do</h3>
                </div>
                <div className="grid gap-4">
                  {[
                    { title: "No Application Processing", desc: "We do not process applications or collect personal admission data."},
                    { title: "No Admission Gatekeeping", desc: "We do not replace ApplyAlberta; we guide you to it." },
                    
                  ].map((item, idx) => (
                    <div key={idx} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#1152d4]/30 transition-all">
                      <div className="flex gap-4">
                        <div className="p-2 bg-[#1152d4]/10 text-[#1152d4] rounded-xl h-fit">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Transparency & Trust Section */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl font-black tracking-tight">Transparency & <span className="text-blue-900">Trust</span></h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe students deserve clear, honest information. That’s why 
                this platform focuses on guidance, not gatekeeping. We focus on providing 
                hard facts and official data rather than flashy marketing.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Every data point on Campus Navigator is verified against official 
                institutional reports. We are an independent entity, meaning our 
                loyalty is to the student, not a university's marketing department.
              </p>
              <div className="pt-6 flex gap-8">
                <div>
                  <p className="text-4xl font-black text-blue-900">26</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutions</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-4xl font-black text-green-800">100%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Unbiased</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-4xl font-black text-slate-900">Free</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">For Students</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  alt="Group of students studying together on campus" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1152d4]/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
}