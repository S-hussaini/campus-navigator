"use client";

import PageHeader from "../../components/SiteHeader";
import {
  UserIcon,
  ClipboardDocumentIcon,
  DocumentCheckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

// Steps for How to Apply
const steps = [
  {
    title: "Create Alberta.ca Account",
    icon: <UserIcon className="w-16 h-16 text-green-800 mb-4" />,
    description:
      "Sign in with an Alberta.ca account. If you don’t have one, create it. A basic account is enough — no verified account required.",
  },
  {
    title: "Complete Your Profile",
    icon: <ClipboardDocumentIcon className="w-16 h-16 text-green-800 mb-4" />,
    description:
      "Fill out personal info: contact details, legal name, Alberta Student Number (ASN), academic history, schools attended, courses & grades. Missing info can delay your application.",
  },
  {
    title: "Start a New Application",
    icon: <DocumentCheckIcon className="w-16 h-16 text-green-800 mb-4" />,
    description:
      "Select your institution and program. Fill in application questions carefully. You can apply to multiple institutions; fees are paid separately to each.",
  },
  {
    title: "Review, Submit & Pay Fees",
    icon: <BanknotesIcon className="w-16 h-16 text-green-800 mb-4" />,
    description:
      "Check all info for accuracy. Pay application fees via credit/debit card. Transcripts may be automatically requested from Alberta Education; external transcripts may need manual submission.",
  },
];

export default function HowToApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#15385E] mb-2">
            How to Apply to Alberta Post‑Secondary
          </h1>
          <p className="text-gray-600 text-lg">
            Everything you need to know: ASN, fees, transcripts, multiple
            applications, and tips for a smooth application.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl p-6 shadow-md border flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {step.icon}
              <h2 className="text-xl font-semibold text-[#15385E] mb-2">
                {step.title}
              </h2>
              <p className="text-gray-700 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Extra Information Sections */}
        <section className="bg-white rounded-2xl p-6 shadow-md border space-y-4">
          <h2 className="text-2xl font-semibold text-[#15385E] mb-2">
            Important Details
          </h2>

          <div>
            <h3 className="font-semibold text-green-800">Alberta Student Number (ASN)</h3>
            <p className="text-gray-700 text-sm">
              Unique number assigned to Alberta students. If you already have one, do not create a duplicate. If not, it will be created automatically when you start your application.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800">Application Fees</h3>
            <p className="text-gray-700 text-sm">
              Fees vary by institution and program. Each application requires a separate payment via credit/debit card.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800">Transcripts</h3>
            <p className="text-gray-700 text-sm">
              Alberta Education transcripts are automatically sent to institutions. For external transcripts (other provinces or countries), you may need to submit manually.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800">Multiple Applications</h3>
            <p className="text-gray-700 text-sm">
              You can apply to multiple institutions with the same profile. Fees and requirements apply separately. Track all applications in one account.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800">Tips & Recommendations</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Use a desktop or laptop — some features are limited on mobile.</li>
              <li>Keep your academic info handy for faster completion.</li>
              <li>Check your email frequently after submission for updates.</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="https://account.alberta.ca/ui/sign-in/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-xl bg-green-900 text-white font-semibold hover:bg-green-700 transition"
          >
            Start Your Application Now
          </a>
        </div>
      </main>
    </div>
  );
}
