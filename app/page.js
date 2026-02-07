import PageHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="grow flex flex-col items-center justify-center text-center px-6">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#15385E] mb-4">
          Find the Right Post-Secondary Program
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-black max-w-2xl mb-10">
          Explore Alberta programs, understand requirements, and make confident
          education decisions with AI-assisted guidance.
        </p>

        {/* Search Bar (UI only) */}
        <div className="w-full max-w-2xl">
          <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search programs, careers, or interests…"
              className="flex-grow px-6 py-4 text-gray-700 focus:outline-none"
            />
            <button
              className="bg-[#4BAE53] hover:bg-green-700 text-white px-8 py-4 font-semibold transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-black text-sm mt-6">
          Designed for Alberta students exploring their future
        </p>

      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
