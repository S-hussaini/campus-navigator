"use client";

import PageHeader from "../../components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#15385E] mb-3">
            About Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Helping students explore Alberta’s post-secondary options with
            clarity and confidence.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-[#15385E] mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our goal is to make it easier for students to discover publicly
            funded post-secondary institutions in Alberta. We bring everything
            into one place so you can explore schools, understand your options,
            and confidently continue to the official application process.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-[#15385E] mb-2">
            What This Platform Does
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Lists all 26 publicly funded post-secondary institutions in Alberta</li>
            <li>Helps students compare universities, colleges, and polytechnics</li>
            <li>Provides direct links to official institution websites</li>
            <li>Redirects users to the official Alberta account page to apply</li>
          </ul>
        </div>

        {/* What We Don’t Do */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-[#15385E] mb-2">
            What This Platform Does Not Do
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This platform does not process applications, collect personal
            information for admissions, or replace ApplyAlberta. All
            applications are completed through the official Alberta government
            website.
          </p>
        </div>

        {/* Transparency */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-semibold text-[#15385E] mb-2">
            Transparency & Trust
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We believe students deserve clear, honest information. That’s why
            this platform focuses on guidance, not gatekeeping. For official
            application support, students are always directed to Alberta’s
            authorized services.
          </p>
        </div>
      </main>
      
    </div>
  );
}
