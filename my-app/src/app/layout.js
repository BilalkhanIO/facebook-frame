import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bacha Khan Month 2025 - Profile Frame Editor',
  description: 'Create your personalized profile frame for Bacha Khan Month 2025. Upload, edit, and share your framed profile picture.',
  keywords: ['Bacha Khan', 'Profile Frame', 'Social Media', '2025'],
  openGraph: {
    title: 'Bacha Khan Month 2025 - Profile Frame Editor',
    description: 'Create your personalized profile frame for Bacha Khan Month 2025',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#dc2626" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (!mode) mode = 'light';
                  document.documentElement.setAttribute('data-theme', mode);
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
