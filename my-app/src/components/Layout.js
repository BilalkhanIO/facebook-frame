'use client';

import dynamic from 'next/dynamic';

// Use dynamic imports to avoid hydration issues with theme toggle
const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        {children}
      </main>
      <Footer />
    </div>
  );
} 