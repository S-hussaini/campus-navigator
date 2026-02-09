"use client";

import { useState } from "react";
import PageHeader from "../../components/SiteHeader";

const albertaInstitutions = [
  // Universities
  { name: "University of Alberta", link: "https://www.ualberta.ca", logo: "/UniversityofAlberta.png", type: "University", location: "Edmonton" },
  { name: "University of Calgary", link: "https://www.ucalgary.ca", logo: "/AZ-university-of-calgary.png", type: "University", location: "Calgary" },
  { name: "University of Lethbridge", link: "https://www.ulethbridge.ca", logo: "/UoL-logo.png", type: "University", location: "Lethbridge" },
  { name: "Athabasca University", link: "https://www.athabascau.ca", logo: "/AU-athabasca-university.jpg", type: "University", location: "Online" },
  { name: "Mount Royal University", link: "https://www.mtroyal.ca", logo: "/MRU-TripleStack-CMYK.png", type: "University", location: "Calgary" },
  { name: "MacEwan University", link: "https://www.macewan.ca", logo: "/MacEwan-.png", type: "University", location: "Edmonton" },
  { name: "Concordia University of Edmonton", link: "https://www.concordia.ab.ca", logo: "/concordia.avif", type: "University", location: "Edmonton" },
  { name: "The King's University", link: "https://www.kingsu.ca", logo: "/kings.jpg", type: "University", location: "Edmonton" },
  { name: "St. Mary's University", link: "https://www.stmarys.ca", logo: "/stmarys.jpeg", type: "University", location: "Calgary" },
  { name: "Ambrose University", link: "https://ambrose.edu", logo: "/ambrose.png", type: "University", location: "Calgary" },
  { name: "Burman University", link: "https://www.burmanu.ca", logo: "/burman.png", type: "University", location: "Lacombe" },

  // Colleges & Polytechnics
  { name: "SAIT", link: "https://www.sait.ca", logo: "/SAIT-Logo-1.png", type: "Polytechnic", location: "Calgary" },
  { name: "NAIT", link: "https://www.nait.ca", logo: "/nait-logo-png_seeklogo-239183.png", type: "Polytechnic", location: "Edmonton" },
  { name: "Bow Valley College", link: "https://bowvalleycollege.ca", logo: "/blob.png", type: "College", location: "Calgary" },
  { name: "NorQuest College", link: "https://www.norquest.ca", logo: "/norquest-college.png", type: "College", location: "Edmonton" },
  { name: "Lethbridge Polytechnic", link: "https://lethbridgecollege.ca", logo: "/Lethbridge.png", type: "Polytechnic", location: "Lethbridge" },
  { name: "Lakeland Polytechnic", link: "https://www.lakelandcollege.ca", logo: "/lakeland.png", type: "Polytechnic", location: "Vermilion" },
  { name: "Olds College of Agriculture & Technology", link: "https://www.oldscollege.ca", logo: "/olds.png", type: "College", location: "Olds" },
  { name: "Keyano College", link: "https://www.keyano.ca", logo: "/Keyano_College.png", type: "College", location: "Fort McMurray" },
  { name: "Medicine Hat College", link: "https://www.mhc.ab.ca", logo: "/mhc.jpg", type: "College", location: "Medicine Hat" },
  { name: "Portage College", link: "https://www.portagecollege.ca", logo: "/portage.jpg", type: "College", location: "Lac La Biche" },
  { name: "Red Deer Polytechnic", link: "https://rdpolytech.ca", logo: "/rdp.png", type: "Polytechnic", location: "Red Deer" },
  { name: "Northwestern Polytechnic", link: "https://www.nwpolytech.ca", logo: "/nwp.png", type: "Polytechnic", location: "Grande Prairie" },
  { name: "Grande Prairie Regional College", link: "https://www.gprc.ab.ca", logo: "/gprc.jpg", type: "College", location: "Grande Prairie" },
  { name: "Alberta University of the Arts", link: "https://www.auarts.ca", logo: "/auarts.jpg", type: "University", location: "Calgary" },
  { name: "Southern Alberta Institute of Technology (SAIT)", link: "https://www.sait.ca", logo: "/SAIT.jpg", type: "Polytechnic", location: "Calgary" },
];

export default function CollegesPage() {
  const [search, setSearch] = useState("");

  const filtered = albertaInstitutions.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#15385E] mb-3">
            Alberta Post-Secondary Institutions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with all <strong>26 publicly-funded post-secondary institutions</strong> in Alberta.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search institutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border
                       focus:outline-none focus:ring-2 focus:ring-[#4BAE53] text-black"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst) => (
            <div
              key={inst.name}
              className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={inst.logo} alt={inst.name} className="w-14 h-14 object-contain" />
                <div>
                  <h2 className="text-lg font-semibold text-[#15385E]">
                    {inst.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {inst.type} • {inst.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={inst.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 rounded-lg border
                             border-[#15385E] text-[#15385E]
                             hover:bg-[#15385E] hover:text-white transition"
                >
                  Website
                </a>

                <a
                  href="https://account.alberta.ca/ui/sign-in/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 rounded-lg
                             bg-[#4BAE53] text-white
                             hover:bg-green-600 transition"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
