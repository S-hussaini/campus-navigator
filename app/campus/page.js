"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { useSearchParams } from "next/navigation"; // Added useSearchParams
import PageHeader from "../../components/SiteHeader";
import Link from "next/link";

const albertaInstitutions = [
  // ... your data stays exactly as it was
  { name: "University of Alberta", link: "https://www.ualberta.ca", logo: "/UniversityofAlberta.png", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800", careers: ["Doctor", "Engineer", "Lawyer", "Scientist", "Pharmacist"] },
  { name: "University of Calgary", link: "https://www.ucalgary.ca", logo: "/AZ-university-of-calgary.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", careers: ["Architect", "Veterinarian", "Nurse", "Software Developer", "Business Lead"] },
  { name: "University of Lethbridge", link: "https://www.ulethbridge.ca", logo: "/UoL-logo.png", type: "University", location: "Lethbridge", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", careers: ["Neuroscientist", "Teacher", "Artist", "Financial Analyst", "Political Scientist"] },
  { name: "Athabasca University", link: "https://www.athabascau.ca", logo: "/AU-athabasca-university.jpg", type: "University", location: "Online", image: "https://images.unsplash.com/photo-1501503060445-738875b1017c?q=80&w=800", careers: ["Accountant", "Psychologist", "HR Manager", "Writer", "Data Scientist"] },
  { name: "MacEwan University", link: "https://www.macewan.ca", logo: "/MacEwan-.png", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800", careers: ["Journalist", "Nurse", "Police Officer", "Social Worker", "Musician"] },
  { name: "Mount Royal University", link: "https://www.mtroyal.ca", logo: "/MRU-TripleStack-CMYK.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1498243639359-f7c895171f5f?q=80&w=800", careers: ["Pilot", "Public Relations", "Interior Designer", "Environmental Scientist"] },
  { name: "Alberta University of the Arts", link: "https://www.auarts.ca", logo: "/auarts.jpg", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800", careers: ["Graphic Designer", "Illustrator", "Photographer", "Animator", "Fashion Designer"] },
  { name: "SAIT", link: "https://www.sait.ca", logo: "/SAIT-Logo-1.png", type: "Polytechnic", location: "Calgary", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", careers: ["Chef", "Aircraft Mechanic", "Cyber Security", "Electrician", "Civil Tech"] },
  { name: "NAIT", link: "https://www.nait.ca", logo: "/nait-logo-png_seeklogo-239183.png", type: "Polytechnic", location: "Edmonton", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800", careers: ["Construction Manager", "Dental Tech", "Forensic Investigator", "Baker", "Power Engineer"] },
  { name: "Lethbridge Polytechnic", link: "https://lethbridgecollege.ca", logo: "/Lethbridge.png", type: "Polytechnic", location: "Lethbridge", image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800", careers: ["Conservation Officer", "Mechanic", "Practical Nurse", "Digital Media"] },
  { name: "Red Deer Polytechnic", link: "https://rdpolytech.ca", logo: "/rdp.png", type: "Polytechnic", location: "Red Deer", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", careers: ["Manufacturing Engineer", "Welder", "Kinesiologist", "Business Admin"] },
  { name: "Northwestern Polytechnic", link: "https://www.nwpolytech.ca", logo: "/nwp.png", type: "Polytechnic", location: "Grande Prairie", image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=800", careers: ["Plumber", "Forestry Tech", "Office Admin", "Heavy Equipment Op"] },
  { name: "Lakeland Polytechnic", link: "https://www.lakelandcollege.ca", logo: "/lakeland.png", type: "Polytechnic", location: "Vermilion", image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800", careers: ["Farm Manager", "Firefighter", "Vet Tech", "Esthetician"] },
  { name: "Bow Valley College", link: "https://bowvalleycollege.ca", logo: "/blob.png", type: "College", location: "Calgary", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800", careers: ["Health Care Aide", "Early Childhood Educator", "Legal Assistant", "Addictions Worker"] },
  { name: "NorQuest College", link: "https://www.norquest.ca", logo: "/norquest-college.png", type: "College", location: "Edmonton", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800", careers: ["LPN", "Social Services Worker", "Pharmacy Assistant", "ESL Teacher"] },
  { name: "Olds College", link: "https://www.oldscollege.ca", logo: "/olds.png", type: "College", location: "Olds", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800", careers: ["Landscaper", "Horticulturist", "Brewmaster", "Equine Trainer"] },
  { name: "Keyano College", link: "https://www.keyano.ca", logo: "/Keyano_College.png", type: "College", location: "Fort McMurray", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800", careers: ["Crane Operator", "Process Operator", "Resource Manager", "Emergency Med Tech"] },
  { name: "Medicine Hat College", link: "https://www.mhc.ab.ca", logo: "/mhc.jpg", type: "College", location: "Medicine Hat", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800", careers: ["Paramedic", "Occupational Therapist", "Small Business Owner", "Technician"] },
  { name: "Portage College", link: "https://www.portagecollege.ca", logo: "/portage.jpg", type: "College", location: "Lac La Biche", image: "https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?q=80&w=800", careers: ["Forestry Tech", "Natural Resources", "Carpenter", "Hairstylist"] },
  { name: "Northern Lakes College", link: "https://www.northernlakescollege.ca", logo: "/nlc.png", type: "College", location: "Slave Lake", image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800", careers: ["Community Health Worker", "Trades Prep", "Admin Support"] },
  { name: "Ambrose University", link: "https://ambrose.edu", logo: "/ambrose.png", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800", careers: ["Pastor", "Theologian", "Music Teacher", "Community Leader"] },
  { name: "Burman University", link: "https://www.burmanu.ca", logo: "/burman.png", type: "University", location: "Lacombe", image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=800", careers: ["Religious Educator", "Counsellor", "Wellness Coach"] },
  { name: "Concordia University of Edmonton", link: "https://www.concordia.ab.ca", logo: "/concordia.avif", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1568219656418-1593299c3f9b?q=80&w=800", careers: ["Information Security", "Management", "Science Researcher"] },
  { name: "The King's University", link: "https://www.kingsu.ca", logo: "/kings.jpg", type: "University", location: "Edmonton", image: "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?q=80&w=800", careers: ["High School Teacher", "Kinesiologist", "Environmental Policy"] },
  { name: "St. Mary's University", link: "https://www.stmarys.ca", logo: "/stmarys.jpeg", type: "University", location: "Calgary", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800", careers: ["Historian", "Literary Critic", "Elementary Teacher"] },
  { name: "Grande Prairie Regional College", link: "https://www.nwpolytech.ca", logo: "/nwp.png", type: "College", location: "Grande Prairie", image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800", careers: ["Power Engineer", "Nursing Assistant", "Office Manager"] },
];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  // LOGIC TO CAPTURE URL PARAMETERS
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  const filtered = albertaInstitutions.filter((i) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      i.name.toLowerCase().includes(searchTerm) || 
      i.location.toLowerCase().includes(searchTerm) ||
      i.careers?.some(c => c.toLowerCase().includes(searchTerm));

    const matchesFilter = activeFilter === "All" || i.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 antialiased">
      <PageHeader />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-900 font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block">Alberta Education Portal</span>
            <h1 className="text-5xl font-extrabold text-slate-950 tracking-tight leading-none mb-4">
              Explore Institutions
            </h1>
            <p className="text-slate-500 font-light text-lg">
              Explore Alberta's <span className="font-semibold text-slate-900">26 publicly-funded</span> institutions by name or career.
            </p>
          </div>

          <div className="w-full md:w-96 relative group">
            <input
              type="text" 
              placeholder="Search Unis, Colleges, Careers"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12">
          {["All", "University", "College", "Polytechnic"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all border ${
                activeFilter === filter 
                  ? "bg-slate-950 text-white border-slate-950 shadow-xl" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-900"
              }`}
            >
              {filter === "All" ? "All 26 Schools" : filter + "s"}
            </button>
          ))}
          <Link href="/careers">
             <button className="px-6 py-2.5 rounded-full text-xs font-bold border border-blue-100 bg-blue-50 text-blue-900 hover:bg-blue-100 transition-all">
               Career Directory
             </button>
          </Link>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((inst) => (
            <div key={inst.name} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {inst.type}
                  </span>
                </div>
              </div>

              <div className="p-8 pt-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{inst.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{inst.location}, AB</p>
                
                {/* Career Tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {inst.careers?.map(c => (
                    <span key={c} className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${search && c.toLowerCase().includes(search.toLowerCase()) ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}>
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a href={inst.link} target="_blank" className="flex items-center justify-center py-3 border border-slate-100 text-slate-600 font-bold rounded-xl text-[10px] uppercase hover:bg-slate-50">Website</a>
                  <a href="https://applyalberta.ca" target="_blank" className="flex items-center justify-center py-3 bg-blue-950 text-white font-bold rounded-xl text-[10px] uppercase hover:bg-blue-800">Apply</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}