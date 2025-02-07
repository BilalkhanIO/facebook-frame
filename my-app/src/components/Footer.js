"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8 ">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <p className="mb-4 text-lg">Developed by Bilal Ahmad</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com/bilalkhanio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-200 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span>balalkhanio</span>
            </a>
            <a
              href="https://instagram.com/bilalkhanio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-200 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>bilalkhanio</span>
            </a>
            <a
              href="https://twitter.com/bilalkhanio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-200 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span>bilalkhanio</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
