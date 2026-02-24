"use client";

import PageHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-['Lexend'] antialiased">
      {/* Font & Icon Imports */}
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      <PageHeader />

      <main className="grow">
        {/* REFINED HERO: Minimalist with a Mesh Gradient */}
        <section className="relative pt-24 pb-40 px-6 overflow-hidden bg-white">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-indigo-600 font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Support Hub</span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-950 mb-8 tracking-tighter leading-none">
              Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-900">connect.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              Have a question about Alberta's post-secondary landscape? Our team is here to help you navigate your journey.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION: Floating Card with Depth */}
        <section className="max-w-7xl mx-auto px-6 -mt-24 pb-32 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Glassmorphism Form */}
            <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Send a Message</h2>
                <p className="text-slate-400 font-light mb-12 uppercase tracking-widest text-[10px]">Average response time: 2 hours</p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50/50 border-b border-slate-100 px-1 py-4 focus:outline-none focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@university.ca"
                      className="w-full bg-slate-50/50 border-b border-slate-100 px-1 py-4 focus:outline-none focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-300"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Inquiry Category</label>
                    <select className="w-full bg-transparent border-b border-slate-100 py-4 focus:outline-none focus:border-indigo-600 transition-all text-slate-500 appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Admissions Help</option>
                      <option>Technical Support</option>
                      <option>Scholarship Info</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Your Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you're looking for..."
                      className="w-full bg-slate-50/50 border-b border-slate-100 px-1 py-4 focus:outline-none focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-300 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button className="w-full md:w-auto bg-blue-950 text-white px-12 py-5 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-2xl flex items-center justify-center gap-3">
                      Submit Request
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: High-Density Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Contact Card */}
              <div className="bg-white rounded-[2.5rem] p-10 text-blue-900 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-8">Direct Contact</h3>
                  <div className="space-y-8">
                    <div className="flex gap-5 group/item">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-900 uppercase tracking-widest font-bold mb-1">Email</p>
                        <p className="text-sm font-medium">support@campusnav.ca</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-8 tracking-tight">Quick Resources</h3>
                <div className="space-y-6">
                  {['Admissions Timeline', 'Scholarship Deadlines', 'Transfer Guides'].map((q, i) => (
                    <div key={i} className="group cursor-pointer flex items-center justify-between">
                      <span className="text-sm text-slate-500 group-hover:text-indigo-600 transition-colors font-medium">{q}</span>
                      <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform text-sm">north_east</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}