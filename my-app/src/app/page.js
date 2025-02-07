"use client";
import Link from 'next/link';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { Camera, Quote } from 'lucide-react';

export default function HomePage() {
 

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-red-800 dark:text-red-200 mb-4">
            Welcome to Bacha Khan Month 2025 Celebration
          </h2>
          <p className="text-lg text-red-600 dark:text-red-300">
            Choose a tool below to create and share your personalized content
          </p>
        </div>

        {/* Bacha Khan Introduction */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-8">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-red-50 dark:bg-red-900/20">
              <Image
                src="/images.jpg"
                alt="Bacha Khan Portrait"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                Khan Abdul Ghaffar Khan
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Known as "Bacha Khan" and "Frontier Gandhi," Khan Abdul Ghaffar Khan (1890-1988) was a pioneering nonviolent activist, spiritual leader, and reformer from the North-West Frontier Province of British India (now Khyber Pakhtunkhwa, Pakistan).
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                He founded the Khudai Khidmatgar ("Servants of God") movement, promoting nonviolence, education, and social reform. His lifelong commitment to peace, interfaith harmony, and social justice continues to inspire millions worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Frame Generator Card */}
          <Link 
            href="/frame-generator"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600 rounded-t-2xl" />
            <div className="bg-red-50 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Frame Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Create a personalized profile frame by uploading your photo and choosing from our collection of frames.
            </p>
            <div className="mt-6 text-red-600 dark:text-red-400 group-hover:translate-x-2 transition-transform">
              Get Started →
            </div>
          </Link>

          {/* Quote Generator Card */}
          <Link 
            href="/quote-generator"
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600 rounded-t-2xl" />
            <div className="bg-red-50 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Quote className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Quote Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Generate inspirational quotes with beautiful backgrounds, perfect for sharing on social media.
            </p>
            <div className="mt-6 text-red-600 dark:text-red-400 group-hover:translate-x-2 transition-transform">
              Get Started →
            </div>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-block bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              About Bacha Khan Month
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join us in celebrating the legacy of Bacha Khan by creating and sharing personalized content. 
              Use our tools to spread his message of peace, non-violence, and social reform.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
