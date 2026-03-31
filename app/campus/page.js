"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import PageHeader from "../../components/SiteHeader";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Sparkles, MapPin, GraduationCap, Clock } from "lucide-react";
import { Suspense } from "react";

const albertaInstitutions = [
  {
    name: "University of Alberta",
    link: "https://www.ualberta.ca",
    logo: "/UniversityofAlberta.png",
    type: "University",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800",
    careers: ["Doctor", "Engineer", "Lawyer", "Scientist", "Pharmacist"],
    keywords: ["uofa", "u of a", "ualberta", "edmonton university", "medicine", "engineering", "pharmacy"]
  },
  {
    name: "University of Calgary",
    link: "https://www.ucalgary.ca",
    logo: "/AZ-university-of-calgary.png",
    type: "University",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800",
    careers: ["Architect", "Veterinarian", "Nurse", "Software Developer", "Business Lead"],
    keywords: ["uofc", "u of c", "ucalgary", "calgary university", "software", "nursing", "vet"]
  },
  {
    name: "University of Lethbridge",
    link: "https://www.ulethbridge.ca",
    logo: "/UoL-logo.png",
    type: "University",
    location: "Lethbridge",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
    careers: ["Neuroscientist", "Teacher", "Artist", "Financial Analyst", "Political Scientist"],
    keywords: ["uleth", "u of l", "lethbridge university", "teacher", "education"]
  },
  {
    name: "Athabasca University",
    link: "https://www.athabascau.ca",
    logo: "/AU-athabasca-university.jpg",
    type: "University",
    location: "Online",
    image: "https://images.unsplash.com/photo-1501503060445-738875b1017c?q=80&w=800",
    careers: ["Accountant", "Psychologist", "HR Manager", "Writer", "Data Scientist"],
    keywords: ["au", "athabasca online university", "online university canada", "distance education"]
  },
  {
    name: "MacEwan University",
    link: "https://www.macewan.ca",
    logo: "/MacEwan-.png",
    type: "University",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
    careers: ["Journalist", "Nurse", "Police Officer", "Social Worker", "Musician"],
    keywords: ["macewan", "macewan university", "edmonton university"]
  },
  {
    name: "Mount Royal University",
    link: "https://www.mtroyal.ca",
    logo: "/MRU-TripleStack-CMYK.png",
    type: "University",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1498243639359-f7c895171f5f?q=80&w=800",
    careers: ["Pilot", "Public Relations", "Interior Designer", "Environmental Scientist"],
    keywords: ["mru", "mount royal", "mount royal calgary", "aviation"]
  },
  {
    name: "Alberta University of the Arts",
    link: "https://www.auarts.ca",
    logo: "/auarts.jpg",
    type: "University",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800",
    careers: ["Graphic Designer", "Illustrator", "Photographer", "Animator", "Fashion Designer"],
    keywords: ["auarts", "arts university calgary", "art school alberta", "design"]
  },
  {
    name: "SAIT",
    link: "https://www.sait.ca",
    logo: "/SAIT-Logo-1.png",
    type: "Polytechnic",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    careers: ["Chef", "Aircraft Mechanic", "Cyber Security", "Electrician", "Civil Tech"],
    keywords: ["southern alberta institute of technology", "sait calgary", "trades school", "cybersecurity"]
  },
  {
    name: "NAIT",
    link: "https://www.nait.ca",
    logo: "/nait-logo-png_seeklogo-239183.png",
    type: "Polytechnic",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800",
    careers: ["Construction Manager", "Dental Tech", "Forensic Investigator", "Baker", "Power Engineer"],
    keywords: ["northern alberta institute of technology", "nait edmonton", "trades edmonton"]
  },
  {
    name: "Lethbridge Polytechnic",
    link: "https://lethbridgecollege.ca",
    logo: "/Lethbridge.png",
    type: "Polytechnic",
    location: "Lethbridge",
    image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800",
    careers: ["Conservation Officer", "Mechanic", "Practical Nurse", "Digital Media"],
    keywords: ["lethbridge college", "lethbridge poly", "nursing lethbridge"]
  },
  {
    name: "Red Deer Polytechnic",
    link: "https://rdpolytech.ca",
    logo: "/rdp.png",
    type: "Polytechnic",
    location: "Red Deer",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800",
    careers: ["Manufacturing Engineer", "Welder", "Kinesiologist", "Business Admin"],
    keywords: ["rdp", "red deer college", "red deer polytechnic"]
  },
  {
    name: "Northwestern Polytechnic",
    link: "https://www.nwpolytech.ca",
    logo: "/nwp.png",
    type: "Polytechnic",
    location: "Grande Prairie",
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=800",
    careers: ["Plumber", "Forestry Tech", "Office Admin", "Heavy Equipment Op"],
    keywords: ["nwp", "gprc", "grande prairie regional college", "northwestern polytechnic"]
  },
  {
    name: "Lakeland Polytechnic",
    link: "https://www.lakelandcollege.ca",
    logo: "/lakeland.png",
    type: "Polytechnic",
    location: "Vermilion",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800",
    careers: ["Farm Manager", "Firefighter", "Vet Tech", "Esthetician"],
    keywords: ["lakeland college", "lakeland poly", "agriculture college"]
  },
  {
    name: "Bow Valley College",
    link: "https://bowvalleycollege.ca",
    logo: "/blob.png",
    type: "College",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800",
    careers: ["Health Care Aide", "Early Childhood Educator", "Legal Assistant", "Addictions Worker"],
    keywords: ["bow valley", "bvc", "calgary college", "health care aide"]
  },
  {
    name: "NorQuest College",
    link: "https://www.norquest.ca",
    logo: "/norquest-college.png",
    type: "College",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
    careers: ["LPN", "Social Services Worker", "Pharmacy Assistant", "ESL Teacher"],
    keywords: ["norquest", "norquest edmonton", "lpn program"]
  },
  {
    name: "Olds College",
    link: "https://www.oldscollege.ca",
    logo: "/olds.png",
    type: "College",
    location: "Olds",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
    careers: ["Landscaper", "Horticulturist", "Brewmaster", "Equine Trainer"],
    keywords: ["olds agriculture college", "olds college agriculture"]
  },
  {
    name: "Keyano College",
    link: "https://www.keyano.ca",
    logo: "/Keyano_College.png",
    type: "College",
    location: "Fort McMurray",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
    careers: ["Crane Operator", "Process Operator", "Resource Manager", "Emergency Med Tech"],
    keywords: ["keyano", "fort mcmurray college", "oil sands training"]
  },
  {
    name: "Medicine Hat College",
    link: "https://www.mhc.ab.ca",
    logo: "/mhc.jpg",
    type: "College",
    location: "Medicine Hat",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    careers: ["Paramedic", "Occupational Therapist", "Small Business Owner", "Technician"],
    keywords: ["mhc", "medicine hat college alberta"]
  },
  {
    name: "Portage College",
    link: "https://www.portagecollege.ca",
    logo: "/portage.jpg",
    type: "College",
    location: "Lac La Biche",
    image: "https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?q=80&w=800",
    careers: ["Forestry Tech", "Natural Resources", "Carpenter", "Hairstylist"],
    keywords: ["portage college alberta", "lac la biche college"]
  },
  {
    name: "Northern Lakes College",
    link: "https://www.northernlakescollege.ca",
    logo: "/nlc.png",
    type: "College",
    location: "Slave Lake",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=800",
    careers: ["Community Health Worker", "Trades Prep", "Admin Support"],
    keywords: ["nlc", "northern lakes", "slave lake college"]
  },
  {
    name: "Ambrose University",
    link: "https://ambrose.edu",
    logo: "/ambrose.png",
    type: "University",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
    careers: ["Pastor", "Theologian", "Music Teacher", "Community Leader"],
    keywords: ["ambrose calgary", "christian university calgary"]
  },
  {
    name: "Burman University",
    link: "https://www.burmanu.ca",
    logo: "/burman.png",
    type: "University",
    location: "Lacombe",
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=800",
    careers: ["Religious Educator", "Counsellor", "Wellness Coach"],
    keywords: ["burman lacombe", "burman university alberta"]
  },
  {
    name: "Concordia University of Edmonton",
    link: "https://www.concordia.ab.ca",
    logo: "/concordia.avif",
    type: "University",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1568219656418-1593299c3f9b?q=80&w=800",
    careers: ["Information Security", "Management", "Science Researcher"],
    keywords: ["cue", "concordia edmonton", "concordia university edmonton"]
  },
  {
    name: "The King's University",
    link: "https://www.kingsu.ca",
    logo: "/kings.jpg",
    type: "University",
    location: "Edmonton",
    image: "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?q=80&w=800",
    careers: ["High School Teacher", "Kinesiologist", "Environmental Policy"],
    keywords: ["kings university edmonton", "the kings university"]
  },
  {
    name: "St. Mary's University",
    link: "https://www.stmarys.ca",
    logo: "/stmarys.jpeg",
    type: "University",
    location: "Calgary",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800",
    careers: ["Historian", "Literary Critic", "Elementary Teacher"],
    keywords: ["stmarys calgary", "st marys university calgary"]
  },
  {
    name: "Grande Prairie Regional College",
    link: "https://www.nwpolytech.ca",
    logo: "/nwp.png",
    type: "College",
    location: "Grande Prairie",
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=800",
    careers: ["Power Engineer", "Nursing Assistant", "Office Manager"],
    keywords: ["gprc", "grande prairie regional college"]
  }
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function CollegesPageContent() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // AI Form State
  const [aiCity, setAiCity] = useState("");
  const [aiType, setAiType] = useState("");
  const [aiDuration, setAiDuration] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");

  const handleAiSubmit = async () => {
    setAiLoading(true);
    setAiError("");
    setAiResult(null);

    try {
      const response = await fetch("/api/school-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: aiCity, type: aiType, duration: aiDuration }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed context");
      }

      setAiResult(data.text);
    } catch (err) {
      setAiError("Sorry, I couldn't get a recommendation right now. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  // LOGIC TO CAPTURE URL PARAMETERS
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  const preparedInstitutions = useMemo(() => {
    return albertaInstitutions.map((inst) => ({
      ...inst,
      searchText: normalizeText([
        inst.name,
        inst.location,
        inst.type,
        ...(inst.careers || []),
        ...(inst.keywords || [])
      ].join(" "))
    }));
  }, []);

  const strictFuse = useMemo(() => {
    return new Fuse(preparedInstitutions, {
      includeScore: true,
      threshold: 0.24,
      ignoreLocation: true,
      keys: [
        { name: "name", weight: 0.40 },
        { name: "keywords", weight: 0.28 },
        { name: "careers", weight: 0.18 },
        { name: "location", weight: 0.10 },
        { name: "searchText", weight: 0.04 },
      ],
      getFn: (obj, path) => {
        const value = obj[path];
        if (Array.isArray(value)) return value.map((v) => normalizeText(String(v)));
        return normalizeText(String(value || ""));
      },
    });
  }, [preparedInstitutions]);

  const looseFuse = useMemo(() => {
    return new Fuse(preparedInstitutions, {
      includeScore: true,
      threshold: 0.36,
      ignoreLocation: true,
      keys: [
        { name: "name", weight: 0.38 },
        { name: "keywords", weight: 0.27 },
        { name: "careers", weight: 0.18 },
        { name: "location", weight: 0.10 },
        { name: "searchText", weight: 0.07 },
      ],
      getFn: (obj, path) => {
        const value = obj[path];
        if (Array.isArray(value)) return value.map((v) => normalizeText(String(v)));
        return normalizeText(String(value || ""));
      },
    });
  }, [preparedInstitutions]);

  const filtered = useMemo(() => {
    const normalizedSearch = normalizeText(search);
    let results = preparedInstitutions;

    if (normalizedSearch) {
      let fuseResults = strictFuse.search(normalizedSearch);

      if (fuseResults.length === 0 || (fuseResults[0]?.score ?? 1) > 0.18) {
        fuseResults = looseFuse.search(normalizedSearch);
      }

      results = fuseResults.map((r) => r.item);
    }

    if (activeFilter !== "All") {
      results = results.filter((i) => i.type === activeFilter);
    }

    return results;
  }, [search, activeFilter, preparedInstitutions, strictFuse, looseFuse]);

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
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all border ${activeFilter === filter
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

        {/* AI Advisor Form Section */}
        <section className="mb-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Sparkles className="text-blue-300 w-5 h-5" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Campus Assistant</h2>
            </div>
            <p className="text-blue-100 max-w-2xl mb-8 text-lg font-light">
              Not sure where to start? Tell us what you're looking for, and our AI will suggest the best optimistic options for you in Alberta.
            </p>

            {/* The Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* City Dropdown */}
              <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center px-4 pt-2 pb-1 gap-2 text-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">City</span>
                </div>
                <select
                  value={aiCity}
                  onChange={(e) => setAiCity(e.target.value)}
                  className="w-full bg-transparent text-white px-4 pb-2 pt-1 font-medium outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Any City</option>
                  <option value="Edmonton" className="text-slate-900">Edmonton</option>
                  <option value="Calgary" className="text-slate-900">Calgary</option>
                  <option value="Lethbridge" className="text-slate-900">Lethbridge</option>
                  <option value="Red Deer" className="text-slate-900">Red Deer</option>
                  <option value="Grande Prairie" className="text-slate-900">Grande Prairie</option>
                  <option value="Fort McMurray" className="text-slate-900">Fort McMurray</option>
                  <option value="Lac La Biche" className="text-slate-900">Lac La Biche</option>
                  <option value="Lacombe" className="text-slate-900">Lacombe</option>
                  <option value="Medicine Hat" className="text-slate-900">Medicine Hat</option>
                  <option value="Olds" className="text-slate-900">Olds</option>
                  <option value="Slave Lake" className="text-slate-900">Slave Lake</option>
                  <option value="Vermilion" className="text-slate-900">Vermilion</option>
                  <option value="Online" className="text-slate-900">Online / Remote</option>
                </select>
              </div>

              {/* Type Dropdown */}
              <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center px-4 pt-2 pb-1 gap-2 text-blue-200">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Institution Type</span>
                </div>
                <select
                  value={aiType}
                  onChange={(e) => setAiType(e.target.value)}
                  className="w-full bg-transparent text-white px-4 pb-2 pt-1 font-medium outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Any Type</option>
                  <option value="University" className="text-slate-900">University</option>
                  <option value="Polytechnic" className="text-slate-900">Polytechnic</option>
                  <option value="College" className="text-slate-900">College</option>
                </select>
              </div>

              {/* Duration Dropdown */}
              <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center px-4 pt-2 pb-1 gap-2 text-blue-200">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Duration</span>
                </div>
                <select
                  value={aiDuration}
                  onChange={(e) => setAiDuration(e.target.value)}
                  className="w-full bg-transparent text-white px-4 pb-2 pt-1 font-medium outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Any Duration</option>
                  <option value="2 Years (Diploma/Certificate)" className="text-slate-900">1-2 Years (Diploma)</option>
                  <option value="4 Years (Degree)" className="text-slate-900">4 Years (Degree)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAiSubmit}
              disabled={aiLoading}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Get Your Perfect Match</span>
                </>
              )}
            </button>

            {/* AI Results Area */}
            {aiError && (
              <div className="mt-8 bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-2xl">
                {aiError}
              </div>
            )}

            {aiResult && (
              <div className="mt-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Your Perfect Match</span>
                </div>
                <div className="prose prose-invert prose-blue max-w-none 
                  prose-p:text-blue-50 prose-p:leading-relaxed prose-p:mb-4 
                  prose-strong:text-white prose-strong:font-bold 
                  prose-ul:text-blue-100 prose-ul:mb-4
                  prose-li:marker:text-blue-400">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300 transition-colors" />
                      ),
                    }}
                  >
                    {aiResult}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </section>

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
export default function CollegesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollegesPageContent />
    </Suspense>
  );
}
