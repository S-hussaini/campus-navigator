# Campus Navigator – Alberta Institutes Guide

Campus Navigator is a web-based platform designed to help students explore and get accurate information about all 26 public institutes in Alberta.

The platform provides a centralized solution to answer common student questions regarding programs, admissions, and institutions, improving accessibility and decision-making.

---

##  Live Application

Access the deployed application here:
 https://campus-navigator-seven.vercel.app/

---

##  Features

* Browse all 26 Alberta institutes in one place
* Search and explore institution details
* Get answers to common student questions
* Clean and user-friendly interface
* Fast and responsive web experience

---

## Tech Stack

Frontend: React.js (Next.js)
Deployment: Vercel
APIs & Services:
Google Gemini API (AI-powered responses)
Resend API (email functionality)

---

## Project Structure

```

/app         → Application routes and pages (Next.js App Router)
/components  → Reusable UI components
/lib         → API integrations and utility functions
/data        → Static or mock data used in the application
/public      → Static assets (images, icons, etc.)
/style       → Global and component-level styling
```

---

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/S-hussaini/campus-navigator.git
cd campus-navigator
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Environment Variables

This project requires environment variables to run.

Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_GEMINI_API_KEY=-------

RESEND_API_KEY=-------

---

### 4. Run the Project

```
npm run dev
```

---

## How to Use

1. Open the application using the live link
2. Browse available institutes
3. Search for specific schools or programs
4. View detailed information about each institute
5. Use the platform to guide decision-making for education

---

## Known Issues

* Some API responses may be slow depending on external services
* Minor UI inconsistencies on smaller screen devices

---

## Future Improvements

* Add AI-powered recommendations for students
* Improve search functionality with filters
* Enhance mobile responsiveness
* Add user accounts and saved preferences

---

##  Client Usage Notes

This platform is designed for easy deployment and scalability.
All configurations (API keys, endpoints) can be updated through environment variables.

## Contact

For support or questions regarding the project:

Developer: Fabulousables
PM --> Sheeba Hussaini 
Email: shussainikh@gmail.com 

