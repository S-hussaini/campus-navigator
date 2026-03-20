"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import PageHeader from "../../components/SiteHeader";

// Your provided list of institutions
const albertaInstitutions = [
  { name: "University of Alberta", link: "https://www.ualberta.ca", logo: "/UniversityofAlberta.png" },
  { name: "University of Calgary", link: "https://www.ucalgary.ca", logo: "/AZ-university-of-calgary.png" },
  { name: "University of Lethbridge", link: "https://www.ulethbridge.ca", logo: "/UoL-logo.png" },
  { name: "Athabasca University", link: "https://www.athabascau.ca", logo: "/AU-athabasca-university.jpg" },
  { name: "MacEwan University", link: "https://www.macewan.ca", logo: "/MacEwan-.png" },
  { name: "Mount Royal University", link: "https://www.mtroyal.ca", logo: "/MRU-TripleStack-CMYK.png" },
  { name: "Alberta University of the Arts", link: "https://www.auarts.ca", logo: "/auarts.jpg" },
  { name: "SAIT", link: "https://www.sait.ca", logo: "/SAIT-Logo-1.png" },
  { name: "NAIT", link: "https://www.nait.ca", logo: "/nait-logo-png_seeklogo-239183.png" },
  { name: "Lethbridge Polytechnic", link: "https://lethbridgecollege.ca", logo: "/Lethbridge.png" },
  { name: "Red Deer Polytechnic", link: "https://rdpolytech.ca", logo: "/rdp.png" },
  { name: "Northwestern Polytechnic", link: "https://www.nwpolytech.ca", logo: "/nwp.png" },
  { name: "Lakeland Polytechnic", link: "https://www.lakelandcollege.ca", logo: "/lakeland.png" },
  { name: "Bow Valley College", link: "https://bowvalleycollege.ca", logo: "/blob.png" },
  { name: "NorQuest College", link: "https://www.norquest.ca", logo: "/norquest-college.png" },
  { name: "Olds College", link: "https://www.oldscollege.ca", logo: "/olds.png" },
  { name: "Keyano College", link: "https://www.keyano.ca", logo: "/Keyano_College.png" },
  { name: "Medicine Hat College", link: "https://www.mhc.ab.ca", logo: "/mhc.jpg" },
  { name: "Portage College", link: "https://www.portagecollege.ca", logo: "/portage.jpg" },
  { name: "Ambrose University", link: "https://ambrose.edu", logo: "/ambrose.png" },
  { name: "Burman University", link: "https://www.burmanu.ca", logo: "/burman.png" },
  { name: "Concordia University of Edmonton", link: "https://www.concordia.ab.ca", logo: "/concordia.avif" },
  { name: "The King's University", link: "https://www.kingsu.ca", logo: "/kings.jpg" },
  { name: "St. Mary's University", link: "https://www.stmarys.ca", logo: "/stmarys.jpeg" },
  { name: "Northern Lakes College", link: "https://www.northernlakescollege.ca", logo: "/nlc.png" },
];

const majorsData = [
  // TECHNOLOGY & ENGINEERING
  { title: "Software Engineering", category: "Technology", description: "Design, development, and maintenance of complex software systems.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Computer Science", category: "Technology", description: "Theoretical and practical study of computation, algorithms, and data structures.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge", "MacEwan University", "Mount Royal University", "Athabasca University"] },
  { title: "Data Science", category: "Technology", description: "Statistical analysis, data mining, and predictive modeling for decision making.", schools: ["University of Calgary", "MacEwan University"] },
  { title: "Artificial Intelligence", category: "Technology", description: "Development of intelligent agents and machine learning frameworks.", schools: ["Athabasca University"] },
  { title: "Mechanical Engineering", category: "Engineering", description: "Design and manufacturing of physical machines and thermal systems.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Civil Engineering", category: "Engineering", description: "Design and construction of infrastructure including roads, bridges, and buildings.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Electrical Engineering", category: "Engineering", description: "Study of electromagnetism and the design of electrical circuits and power systems.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Chemical Engineering", category: "Engineering", description: "Processes for large-scale chemical manufacturing and materials development.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Geomatics Engineering", category: "Engineering", description: "Space-based positioning, mapping, and geographic information systems.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Petroleum Engineering", category: "Engineering", description: "Exploration and production techniques for oil and gas resources.", schools: ["University of Alberta", "University of Calgary", "SAIT"] },
  { title: "Biomedical Engineering", category: "Engineering", description: "Application of engineering principles to healthcare and biological sciences.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Sustainable Systems Engineering", category: "Engineering", description: "Focus on renewable energy and environmental sustainability in engineering.", schools: ["University of Calgary"] },
  { title: "Architectural Technologies", category: "Trades", description: "Technical design and documentation for the building construction industry.", schools: ["SAIT", "NAIT", "Lethbridge Polytechnic"] },
  { title: "Cyber Security", category: "Technology", description: "Protection of systems, networks, and programs from digital attacks.", schools: ["SAIT", "NAIT", "Lethbridge Polytechnic"] },
  { title: "Network Systems", category: "Technology", description: "Management and implementation of enterprise-level network infrastructure.", schools: ["SAIT", "NAIT", "Lethbridge Polytechnic"] },
  { title: "Instrumentation", category: "Trades", description: "Measurement and control of industrial process variables.", schools: ["SAIT", "NAIT", "Lethbridge Polytechnic"] },

  // HEALTH & MEDICAL SCIENCES
  { title: "Nursing (BScN)", category: "Health", description: "Professional clinical practice, patient care, and healthcare leadership.", schools: ["University of Alberta", "University of Calgary", "MacEwan University", "Mount Royal University", "Lethbridge Polytechnic", "NorQuest College"] },
  { title: "Medicine (MD)", category: "Health", description: "Advanced clinical practice, diagnosis, and surgical medical care.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Pharmacy", category: "Health", description: "Pharmaceutical sciences, patient counseling, and medication management.", schools: ["University of Alberta"] },
  { title: "Dentistry", category: "Health", description: "Surgical and preventative dental health and oral sciences.", schools: ["University of Alberta"] },
  { title: "Occupational Therapy", category: "Health", description: "Therapeutic use of everyday activities for rehabilitation.", schools: ["University of Alberta"] },
  { title: "Physical Therapy", category: "Health", description: "Movement science and rehabilitation of physical injuries.", schools: ["University of Alberta"] },
  { title: "Athletic Therapy", category: "Health", description: "Prevention and immediate care of musculoskeletal injuries.", schools: ["Mount Royal University"] },
  { title: "Therapeutic Recreation", category: "Health", description: "Inclusive recreation programs for individuals with illnesses or disabilities.", schools: ["University of Lethbridge"] },
  { title: "Neuroscience", category: "Health", description: "Biological study of the brain and nervous system.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge"] },
  { title: "Psychiatric Nursing", category: "Health", description: "Specialized mental health clinical practice and patient advocacy.", schools: ["MacEwan University"] },
  { title: "Medical Laboratory Science", category: "Health", description: "Diagnostic analysis of clinical biological samples.", schools: ["University of Alberta", "SAIT", "NAIT"] },
  { title: "Respiratory Therapy", category: "Health", description: "Cardiopulmonary care and life-support management.", schools: ["SAIT", "NAIT"] },

  // BUSINESS & MANAGEMENT
  { title: "Accounting", category: "Business", description: "Financial reporting, auditing, and tax law analysis.", schools: ["University of Alberta", "University of Calgary", "SAIT", "NAIT", "MacEwan University"] },
  { title: "Finance", category: "Business", description: "Investment management, banking, and corporate financial strategy.", schools: ["University of Alberta", "University of Calgary", "SAIT", "NAIT", "MRU"] },
  { title: "Marketing", category: "Business", description: "Brand management, consumer behavior, and market research.", schools: ["University of Alberta", "University of Calgary", "SAIT", "NAIT", "MacEwan University"] },
  { title: "Human Resources", category: "Business", description: "Organizational behavior and workforce talent management.", schools: ["University of Alberta", "University of Calgary", "SAIT", "NAIT", "MRU"] },
  { title: "Supply Chain Management", category: "Business", description: "Logistics, procurement, and global distribution systems.", schools: ["University of Alberta", "University of Calgary", "SAIT", "NAIT"] },
  { title: "Entrepreneurship", category: "Business", description: "Venture creation, innovation management, and business scaling.", schools: ["University of Calgary", "Mount Royal University"] },
  { title: "Business Technology Management", category: "Business", description: "Strategic implementation of IT within business frameworks.", schools: ["Athabasca University", "University of Calgary"] },
  { title: "International Business", category: "Business", description: "Global trade, international law, and cross-cultural management.", schools: ["MacEwan University", "Mount Royal University"] },
  { title: "Aviation", category: "Business", description: "Commercial pilot training and aviation management operations.", schools: ["Mount Royal University"] },
  { title: "Energy Asset Management", category: "Business", description: "Acquisition and management of energy-related land and resources.", schools: ["SAIT"] },
  { title: "Risk Management", category: "Business", description: "Predictive analysis of financial and organizational liability.", schools: ["University of Calgary"] },

  // ARTS, DESIGN & HUMANITIES
  { title: "Fine Arts", category: "Arts", description: "Creative expression through visual media and studio practice.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge", "Alberta University of the Arts"] },
  { title: "Drama", category: "Arts", description: "Performance, stagecraft, and theatrical production.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge"] },
  { title: "Music", category: "Arts", description: "Theory, composition, and professional performance.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge"] },
  { title: "Interior Design", category: "Design", description: "Architectural interiors and spatial planning.", schools: ["Mount Royal University"] },
  { title: "Industrial Design", category: "Design", description: "Design of mass-produced consumer goods and systems.", schools: ["University of Alberta"] },
  { title: "Interactive Design", category: "Design", description: "User experience and digital interface creation.", schools: ["SAIT"] },
  { title: "New Media", category: "Design", description: "Integration of technology, culture, and artistic expression.", schools: ["University of Lethbridge"] },
  { title: "Philosophy", category: "Humanities", description: "Inquiry into existence, knowledge, ethics, and logic.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge", "MacEwan University"] },
  { title: "Psychology", category: "Social Science", description: "Scientific study of mind and human behavior.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge", "MacEwan University", "MRU"] },
  { title: "Economics", category: "Social Science", description: "Study of production, distribution, and consumption of wealth.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge"] },

  // EDUCATION & PUBLIC SAFETY
  { title: "Education (Elementary/Secondary)", category: "Education", description: "Teacher training and pedagogy for K-12 schooling.", schools: ["University of Alberta", "University of Calgary", "University of Lethbridge", "Mount Royal University", "MacEwan University"] },
  { title: "Criminal Justice", category: "Justice", description: "Analysis of law enforcement, corrections, and the legal system.", schools: ["Mount Royal University", "Athabasca University"] },
  { title: "Law (JD)", category: "Justice", description: "Professional legal training and judicial studies.", schools: ["University of Alberta", "University of Calgary"] },
  { title: "Social Work", category: "Community", description: "Support services for individuals, families, and communities.", schools: ["University of Calgary", "MacEwan University", "Mount Royal University"] },
  { title: "Child and Youth Care", category: "Community", description: "Support for vulnerable children and adolescent development.", schools: ["MacEwan University", "Mount Royal University"] }
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

export default function MajorsPage() {
  const [search, setSearch] = useState("");

  const getSchoolInfo = (name) => {
    return albertaInstitutions.find(inst => inst.name === name || inst.name.includes(name)) || { logo: "", link: "#" };
  };

  const preparedMajors = useMemo(() => {
    return majorsData.map((major) => ({
      ...major,
      searchText: normalizeText([
        major.title,
        major.category,
        major.description,
        ...(major.schools || []),
      ].join(" ")),
    }));
  }, []);

  const strictFuse = useMemo(() => {
    return new Fuse(preparedMajors, {
      includeScore: true,
      threshold: 0.24,
      ignoreLocation: true,
      keys: [
        { name: "title", weight: 0.42 },
        { name: "category", weight: 0.18 },
        { name: "schools", weight: 0.22 },
        { name: "description", weight: 0.12 },
        { name: "searchText", weight: 0.06 },
      ],
      getFn: (obj, path) => {
        const value = obj[path];
        if (Array.isArray(value)) return value.map((v) => normalizeText(String(v)));
        return normalizeText(String(value || ""));
      },
    });
  }, [preparedMajors]);

  const looseFuse = useMemo(() => {
    return new Fuse(preparedMajors, {
      includeScore: true,
      threshold: 0.38,
      ignoreLocation: true,
      keys: [
        { name: "title", weight: 0.38 },
        { name: "category", weight: 0.16 },
        { name: "schools", weight: 0.22 },
        { name: "description", weight: 0.16 },
        { name: "searchText", weight: 0.08 },
      ],
      getFn: (obj, path) => {
        const value = obj[path];
        if (Array.isArray(value)) return value.map((v) => normalizeText(String(v)));
        return normalizeText(String(value || ""));
      },
    });
  }, [preparedMajors]);

  const filtered = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) return preparedMajors;

    let fuseResults = strictFuse.search(normalizedSearch);

    if (fuseResults.length === 0 || (fuseResults[0]?.score ?? 1) > 0.18) {
      fuseResults = looseFuse.search(normalizedSearch);
    }

    return fuseResults.map((r) => r.item);
  }, [search, preparedMajors, strictFuse, looseFuse]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] antialiased text-slate-900 font-sans">
      <PageHeader />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Compact Search Bar */}
        <div className="flex items-center justify-between mb-8 border-b border-black pb-4">
          <h1 className="text-xl font-bold tracking-tight uppercase">Find Your Major</h1>
          <input 
            type="text"
            placeholder="Search programs"
            className="bg-transparent border-none outline-none text-right text-sm font-medium placeholder:text-slate-400 w-64"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* The List: Minimalist, No Boxes */}
        <div className="bg-white border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {filtered.map((major, idx) => (
            <div key={idx} className="hover:bg-slate-50 transition-colors flex items-start p-4 gap-6 group">
              
              {/* ID/Number - Small & Technical */}
              <div className="text-[10px] font-mono text-slate-300 pt-1">0{idx + 1}</div>

              {/* Major Info - Narrow column */}
              <div className="w-1/3">
                <h2 className="text-sm font-bold text-[#163359] group-hover:text-blue-800 transition-colors">
                  {major.title}
                </h2>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  {major.category}
                </span>
              </div>

              {/* Description - Mid column */}
              <div className="flex-1">
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm line-clamp-2">
                  {major.description}
                </p>
              </div>

              {/* Schools - Compact Side Rail */}
              <div className="w-1/4 flex flex-wrap gap-1.5 justify-end">
                {major.schools.map((schoolName) => {
                  const school = getSchoolInfo(schoolName);
                  return (
                    <a 
                      key={schoolName}
                      href={school.link}
                      target="_blank"
                      title={schoolName}
                      className="p-1.5 bg-slate-50 border border-slate-200 hover:border-blue-900 group/logo"
                    >
                      <img src={school.logo} alt="School Logo" className="w-20 h-20 object-contain  group-hover/logo:opacity-100" />
                    </a>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}