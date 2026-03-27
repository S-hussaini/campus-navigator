import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const INSTITUTIONS_DATA = `
Here is the complete dataset of Alberta post-secondary institutions you MUST reference:

UNIVERSITIES:
1. University of Alberta (https://www.ualberta.ca) – Edmonton – Careers: Doctor, Engineer, Lawyer, Scientist, Pharmacist
2. University of Calgary (https://www.ucalgary.ca) – Calgary – Careers: Architect, Veterinarian, Nurse, Software Developer, Business Lead
3. University of Lethbridge (https://www.ulethbridge.ca) – Lethbridge – Careers: Neuroscientist, Teacher, Artist, Financial Analyst, Political Scientist
4. Athabasca University (https://www.athabascau.ca) – Online – Careers: Accountant, Psychologist, HR Manager, Writer, Data Scientist
5. MacEwan University (https://www.macewan.ca) – Edmonton – Careers: Journalist, Nurse, Police Officer, Social Worker, Musician
6. Mount Royal University (https://www.mtroyal.ca) – Calgary – Careers: Pilot, Public Relations, Interior Designer, Environmental Scientist
7. Alberta University of the Arts (https://www.auarts.ca) – Calgary – Careers: Graphic Designer, Illustrator, Photographer, Animator, Fashion Designer
8. Ambrose University (https://ambrose.edu) – Calgary – Careers: Pastor, Theologian, Music Teacher, Community Leader
9. Burman University (https://www.burmanu.ca) – Lacombe – Careers: Religious Educator, Counsellor, Wellness Coach
10. Concordia University of Edmonton (https://www.concordia.ab.ca) – Edmonton – Careers: Information Security, Management, Science Researcher
11. The King's University (https://www.kingsu.ca) – Edmonton – Careers: High School Teacher, Kinesiologist, Environmental Policy
12. St. Mary's University (https://www.stmarys.ca) – Calgary – Careers: Historian, Literary Critic, Elementary Teacher

POLYTECHNICS:
1. SAIT (https://www.sait.ca) – Calgary – Careers: Chef, Aircraft Mechanic, Cyber Security, Electrician, Civil Tech
2. NAIT (https://www.nait.ca) – Edmonton – Careers: Construction Manager, Dental Tech, Forensic Investigator, Baker, Power Engineer
3. Lethbridge Polytechnic (https://lethbridgecollege.ca) – Lethbridge – Careers: Conservation Officer, Mechanic, Practical Nurse, Digital Media
4. Red Deer Polytechnic (https://rdpolytech.ca) – Red Deer – Careers: Manufacturing Engineer, Welder, Kinesiologist, Business Admin
5. Northwestern Polytechnic (https://www.nwpolytech.ca) – Grande Prairie – Careers: Plumber, Forestry Tech, Office Admin, Heavy Equipment Op
6. Lakeland Polytechnic (https://www.lakelandcollege.ca) – Vermilion – Careers: Farm Manager, Firefighter, Vet Tech, Esthetician

COLLEGES:
1. Bow Valley College (https://bowvalleycollege.ca) – Calgary – Careers: Health Care Aide, Early Childhood Educator, Legal Assistant, Addictions Worker
2. NorQuest College (https://www.norquest.ca) – Edmonton – Careers: LPN, Social Services Worker, Pharmacy Assistant, ESL Teacher
3. Olds College (https://www.oldscollege.ca) – Olds – Careers: Landscaper, Horticulturist, Brewmaster, Equine Trainer
4. Keyano College (https://www.keyano.ca) – Fort McMurray – Careers: Crane Operator, Process Operator, Resource Manager, Emergency Med Tech
5. Medicine Hat College (https://www.mhc.ab.ca) – Medicine Hat – Careers: Paramedic, Occupational Therapist, Small Business Owner, Technician
6. Portage College (https://www.portagecollege.ca) – Lac La Biche – Careers: Forestry Tech, Natural Resources, Carpenter, Hairstylist
7. Northern Lakes College (https://www.northernlakescollege.ca) – Slave Lake – Careers: Community Health Worker, Trades Prep, Admin Support
8. Grande Prairie Regional College (https://www.nwpolytech.ca) – Grande Prairie – Careers: Power Engineer, Nursing Assistant, Office Manager
`;

const SYSTEM_PROMPT = `You are the ultimate Alberta Post-Secondary Optimist! Your goal is to enthusiastically review a student's preferences and find the most exciting, perfectly fitting educational paths for them in Alberta.

${INSTITUTIONS_DATA}

YOUR INSTRUCTIONS:
1. The user will provide their preferred City, Institution Type, and Program Duration.
2. Review the dataset and pick 1-3 institutions that best match these constraints.
3. If their exact constraints don't perfectly match any school, pick the closest and best alternatives.
4. Keep the output incredibly straightforward, direct, and concise. Do NOT use extra words.
5. Format the output as a simple Markdown bulleted list. 
6. You MUST make the school name a bold, clickable markdown link pointing to its main website (e.g., [**School Name**](https://link)).
7. Provide ONLY a single brief sentence per recommendation explaining why it fits. Completely avoid any introductory or concluding conversational filler (e.g., skip phrases like "Here are your options:" or "Get ready to launch your future!"). Just provide the list.
8. NEVER invent institutions or programs not in the dataset above.`;

export async function POST(req) {
  try {
    const { city, type, duration } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: SYSTEM_PROMPT,
    });
    
    // Construct the user prompt based on the form selections
    const prompt = `I am looking for a school with these preferences:
City: ${city || "Any"}
Type: ${type || "Any"}
Duration: ${duration || "Any"}

Please give me an optimistic recommendation!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("School Finder Error:", error);
    return NextResponse.json(
      { error: "Failed to get a recommendation. Please try again." },
      { status: 500 }
    );
  }
}
