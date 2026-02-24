"use client";

import { useState } from "react";
import PageHeader from "../../components/SiteHeader";

const albertaInstitutions = [
  // Comprehensive Academic and Research Universities
  { name: "University of Alberta", link: "https://www.ualberta.ca", logo: "/UniversityofAlberta.png", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800" },
  { name: "University of Calgary", link: "https://www.ucalgary.ca", logo: "/AZ-university-of-calgary.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
  { name: "University of Lethbridge", link: "https://www.ulethbridge.ca", logo: "/UoL-logo.png", type: "University", location: "Lethbridge", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
  { name: "Athabasca University", link: "https://www.athabascau.ca", logo: "/AU-athabasca-university.jpg", type: "University", location: "Online", image: "https://images.unsplash.com/photo-1501503060445-738875b1017c?q=80&w=800" },

  // Undergraduate Universities
  { name: "MacEwan University", link: "https://www.macewan.ca", logo: "/MacEwan-.png", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800" },
  { name: "Mount Royal University", link: "https://www.mtroyal.ca", logo: "/MRU-TripleStack-CMYK.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1498243639359-f7c895171f5f?q=80&w=800" },
  { name: "Alberta University of the Arts", link: "https://www.auarts.ca", logo: "/auarts.jpg", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" },

  // Polytechnics
  { name: "SAIT", link: "https://www.sait.ca", logo: "/SAIT-Logo-1.png", type: "Polytechnic", location: "Calgary", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" },
  { name: "NAIT", link: "https://www.nait.ca", logo: "/nait-logo-png_seeklogo-239183.png", type: "Polytechnic", location: "Edmonton", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" },
  { name: "Lethbridge Polytechnic", link: "https://lethbridgecollege.ca", logo: "/Lethbridge.png", type: "Polytechnic", location: "Lethbridge", image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800" },
  { name: "Red Deer Polytechnic", link: "https://rdpolytech.ca", logo: "/rdp.png", type: "Polytechnic", location: "Red Deer", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
  { name: "Northwestern Polytechnic", link: "https://www.nwpolytech.ca", logo: "/nwp.png", type: "Polytechnic", location: "Grande Prairie", image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=800" },
  { name: "Lakeland Polytechnic", link: "https://www.lakelandcollege.ca", logo: "/lakeland.png", type: "Polytechnic", location: "Vermilion", image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800" },

  // Comprehensive Community Colleges
  { name: "Bow Valley College", link: "https://bowvalleycollege.ca", logo: "/blob.png", type: "College", location: "Calgary", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800" },
  { name: "NorQuest College", link: "https://www.norquest.ca", logo: "/norquest-college.png", type: "College", location: "Edmonton", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" },
  { name: "Olds College", link: "https://www.oldscollege.ca", logo: "/olds.png", type: "College", location: "Olds", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800" },
  { name: "Keyano College", link: "https://www.keyano.ca", logo: "/Keyano_College.png", type: "College", location: "Fort McMurray", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
  { name: "Medicine Hat College", link: "https://www.mhc.ab.ca", logo: "/mhc.jpg", type: "College", location: "Medicine Hat", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800" },
  { name: "Portage College", link: "https://www.portagecollege.ca", logo: "/portage.jpg", type: "College", location: "Lac La Biche", image: "https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?q=80&w=800" },

  // Specialized Arts & Culture / Independent
  { name: "Ambrose University", link: "https://ambrose.edu", logo: "/ambrose.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800" },
  { name: "Burman University", link: "https://www.burmanu.ca", logo: "/burman.png", type: "University", location: "Lacombe", image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=800" },
  { name: "Concordia University of Edmonton", link: "https://www.concordia.ab.ca", logo: "/concordia.avif", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1568219656418-1593299c3f9b?q=80&w=800" },
  { name: "The King's University", link: "https://www.kingsu.ca", logo: "/kings.jpg", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?q=80&w=800" },
  { name: "St. Mary's University", link: "https://www.stmarys.ca", logo: "/stmarys.jpeg", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800" },
  { name: "Northern Lakes College", link: "https://www.northernlakescollege.ca", logo: "/nlc.png", type: "College", location: "Slave Lake", image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800" },
  { name: "Grande Prairie Regional College", link: "https://www.nwpolytech.ca", logo: "/nwp.png", type: "College", location: "Grande Prairie", image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800" },
];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = albertaInstitutions.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || 
                          i.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || i.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-['Lexend'] antialiased">
      {/* Font & Icon Imports */}
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />

      <PageHeader />

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-900 font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block">Alberta Education Portal</span>
            <h1 className="text-5xl font-extrabold text-slate-950 tracking-tight leading-none mb-4">
              Explore Institutions
            </h1>
            <p className="text-slate-500 font-light text-lg">
              Discover your path across Alberta's <span className="font-semibold text-slate-900">26 publicly-funded</span> post-secondary campuses.
            </p>
          </div>

          {/* Trendy Search Bar */}
          <div className="w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-white group-focus-within:text-blue-900 transition-colors"></span>
            </div>
            <input
              type="text" 
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2outline-none transition-all placeholder:text-slate-400 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Filter Chips - Muted Colors */}
        <div className="flex flex-wrap gap-2 mb-12">
          {["All", "University", "College", "Polytechnic"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all border ${
                activeFilter === filter 
                  ? "bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-200" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-indigo-600 hover:text-indigo-600"
              }`}
            >
              {filter === "University" ? "Universities" : filter === "College" ? "Colleges" : filter === "Polytechnic" ? "Polytechnics" : "All Schools"}
            </button>
          ))}
        </div>

        {/* Institutions Grid: Compact & Cinematic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((inst) => (
            <div 
              key={inst.name}
              className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              {/* Image Container: 16:9 Aspect Ratio */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={inst.image} 
                  alt={inst.name} 
                  className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800"; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                    {inst.type}
                  </span>
                </div>

                {/* Overlapping Logo */}
                <div className="absolute -bottom-6 right-6 w-14 h-14 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-50 z-10 group-hover:-translate-y-2 transition-transform duration-500">
                  <img src={inst.logo} alt="" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 pt-10 flex flex-col grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                  {inst.name}
                </h3>
                
                <div className="flex items-center text-slate-400 mb-8 gap-1.5">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="text-xs font-semibold tracking-wide uppercase">{inst.location}, AB</span>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a
                    href={inst.link}
                    target="_blank"
                    className="flex items-center justify-center py-3 border border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wider"
                  >
                    Website
                  </a>
                  <a
                    href="https://applyalberta.ca"
                    target="_blank"
                    className="flex items-center justify-center py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-[11px] uppercase tracking-wider shadow-lg shadow-indigo-100"
                  >
                    Apply
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-slate-400 font-medium italic">No institutions found matching "{search}"</p>
            <button onClick={() => setSearch("")} className="mt-4 text-blue-900 font-bold hover:underline">Reset Search</button>
          </div>
        )}
      </main>
    </div>
  );
}