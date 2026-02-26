import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-ful bg-gray-100 py-8 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        <p >
         APAS - Alberta Post-Secondary Application System. All rights reserved. | <Link href="/about" className="text-blue-900 hover:underline">About Us</Link> | <Link href="/contact" className="text-blue-900 hover:underline">Contact</Link>
        </p>
      </div>
    </footer>
  );
}
