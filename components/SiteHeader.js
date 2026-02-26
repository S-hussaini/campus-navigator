"use client";
import Link from "next/link";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="w-full bg-[#15385E] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + App Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"    
            alt="Campus Navigator Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <span className="text-xl font-semibold text-white">
            Campus <span className="text-[#4BAE53]">Navigator</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-white font-medium">
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
            About US 
          </Link>

          <Link href="/howToApply" className="hover:text-[#4BAE53] transition">
            How to Apply 
          </Link>

        </nav>
      </div>
    </header>
  );
}
