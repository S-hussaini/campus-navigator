"use client";
import Link from "next/link";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="w-full bg-[#a3b0be] shadow-md">
      <div className="w-full border-b border-gray-100 py-4 px-6 sm:px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">

        {/* Logo + App Name */}
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <div className="relative h-full w-14">
            <Image
              src="/logo.png"
              alt="Campus Navigator Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* App Name */}
          <span className="text-xl font-semibold text-blue-900">
            Campus <span className="text-[#4BAE53]">Navigator</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6 text-blue-900 font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#4BAE53] transition">
            Home
          </Link>
          <Link href="/campus" className="hover:text-[#4BAE53] transition">
            Schools
          </Link>
          <Link href="/contact" className="hover:text-[#4BAE53] transition">
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-[#4BAE53] transition">
            About Us
          </Link>
          <Link href="/howToApply" className="hover:text-[#4BAE53] transition">
            How to Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}