'use client';

import Link from 'next/link';


export default function Header() {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-3xl md:text-4xl font-bold">
                Bacha Khan Month 2025
              </h1>
              <p className="mt-2 text-red-100">
                Create and share personalized content to celebrate Bacha Khan Month 2025
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 