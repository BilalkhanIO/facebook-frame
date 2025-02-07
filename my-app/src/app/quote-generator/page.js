'use client';

import { useState, useRef } from 'react';
import { Download, Share2, X, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import Layout from '@/components/Layout';
import SocialShare from '@/components/SocialShare';

const quotes = [
  {
    text: "Non-violence is not inaction. It is not discussion. It is not for the timid or weak... Non-violence is hard work.",
    author: "Bacha Khan"
  },
  {
    text: "I am going to give you such a weapon that the police and the army will not be able to stand against it. It is the weapon of the Prophet, but you are not aware of it. That weapon is patience and righteousness.",
    author: "Bacha Khan"
  },
  {
    text: "The fundamental principle of non-violence is to cooperate with good and non-cooperate with evil.",
    author: "Bacha Khan"
  },
  {
    text: "The most beautiful thing in the world is to serve humanity.",
    author: "Bacha Khan"
  },
  {
    text: "If you wish to know how civilized a culture is, look at how they treat their women.",
    author: "Bacha Khan"
  },
];

const templates = [
  {
    id: 'classic',
    name: 'Classic Red',
    bgClass: 'bg-gradient-to-br from-red-500 to-red-700',
    textClass: 'text-white'
  },
  {
    id: 'light',
    name: 'Light Theme',
    bgClass: 'bg-gradient-to-br from-red-50 to-red-100',
    textClass: 'text-red-800'
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    bgClass: 'bg-gradient-to-br from-gray-800 to-gray-900',
    textClass: 'text-red-100'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    bgClass: 'bg-gradient-to-br from-red-800 to-red-950',
    textClass: 'text-red-100'
  }
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(quotes[0]);
  const [customQuote, setCustomQuote] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [shareImageUrl, setShareImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const previewRef = useRef(null);

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
    setIsCustom(false);
  };

  const handleCustomQuoteChange = (e) => {
    setCustomQuote(e.target.value);
    setIsCustom(true);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsProcessing(true);

    try {
      const controls = document.querySelectorAll('.no-capture');
      controls.forEach((el) => (el.style.display = 'none'));

      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor: null,
      });

      controls.forEach((el) => (el.style.display = ''));

      const imageUrl = canvas.toDataURL('image/png');
      setShareImageUrl(imageUrl);

      const link = document.createElement('a');
      link.download = 'bacha-khan-quote-2025.png';
      link.href = imageUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    if (!previewRef.current) return;
    setIsProcessing(true);

    try {
      const controls = document.querySelectorAll('.no-capture');
      controls.forEach((el) => (el.style.display = 'none'));

      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor: null,
      });

      controls.forEach((el) => (el.style.display = ''));

      const imageUrl = canvas.toDataURL('image/png');
      setShareImageUrl(imageUrl);
    } catch (error) {
      console.error('Error preparing image for share:', error);
      alert('Failed to prepare image for sharing. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setQuote(quotes[0]);
    setCustomQuote('');
    setIsCustom(false);
    setShareImageUrl(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          {/* Quote Input */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={generateRandomQuote}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Generate Random Quote
              </button>
            </div>
            <textarea
              value={isCustom ? customQuote : quote.text}
              onChange={handleCustomQuoteChange}
              placeholder="Enter your custom quote here..."
              className="w-full h-32 p-4 rounded-lg border border-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white dark:bg-gray-800 dark:border-red-800"
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Select Template
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 rounded-lg transition-all ${template.bgClass} ${
                    selectedTemplate.id === template.id
                      ? 'ring-2 ring-red-500 ring-offset-2'
                      : ''
                  }`}
                >
                  <p className={`text-sm font-medium ${template.textClass}`}>
                    {template.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div 
            ref={previewRef}
            className={`aspect-square rounded-lg p-8 flex items-center justify-center ${selectedTemplate.bgClass}`}
          >
            <div className="max-w-lg text-center">
              <p className={`text-xl md:text-2xl mb-4 ${selectedTemplate.textClass}`}>
                {isCustom ? customQuote : quote.text}
              </p>
              {!isCustom && (
                <p className={`text-lg font-semibold ${selectedTemplate.textClass}`}>
                  - {quote.author}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="no-capture flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Download'}
            </button>
            <button
              onClick={handleShare}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Share'}
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          </div>

          {/* Social Share */}
          {shareImageUrl && <SocialShare shareImageUrl={shareImageUrl} type="quote" />}
        </div>
      </div>
    </Layout>
  );
} 