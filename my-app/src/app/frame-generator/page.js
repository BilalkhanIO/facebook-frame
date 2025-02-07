'use client';

import { useState, useRef } from 'react';
import { Download, Share2, X } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import Layout from '@/components/Layout';
import ImageUploader from '@/components/ProfileEditor/ImageUploader';
import ImageEditor from '@/components/ProfileEditor/ImageEditor';
import FrameSelector from '@/components/ProfileEditor/FrameSelector';
import SocialShare from '@/components/SocialShare';

export default function FrameGenerator() {
  const [userImage, setUserImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shareImageUrl, setShareImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const editorRef = useRef(null);

  const handleImageUpload = (imageData) => {
    setUserImage(imageData);
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  const captureImage = async () => {
    if (!editorRef.current) return null;

    // Hide controls during capture
    const controls = document.querySelectorAll('.no-capture');
    controls.forEach((el) => (el.style.display = 'none'));

    try {
      const canvas = await html2canvas(editorRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 800, // Fixed width for consistent output
        height: 800, // Fixed height for square aspect ratio
        scale: 2, // Higher quality output
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure the cloned element maintains dimensions
          const clonedElement = clonedDoc.getElementById('frame-preview');
          if (clonedElement) {
            clonedElement.style.width = '800px';
            clonedElement.style.height = '800px';
          }
        }
      });

      // Show controls again
      controls.forEach((el) => (el.style.display = ''));

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing image:', error);
      return null;
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      const imageUrl = await captureImage();
      if (!imageUrl) {
        throw new Error('Failed to generate image');
      }

      setShareImageUrl(imageUrl);

      const link = document.createElement('a');
      link.download = 'bacha-khan-frame-2025.png';
      link.href = imageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    setIsProcessing(true);
    try {
      const imageUrl = await captureImage();
      if (!imageUrl) {
        throw new Error('Failed to generate image');
      }
      setShareImageUrl(imageUrl);
    } catch (error) {
      console.error('Error preparing image for share:', error);
      alert('Failed to prepare image for sharing. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setUserImage(null);
    setSelectedFrame(null);
    setShareImageUrl(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
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

        {!userImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            <ImageEditor
              image={userImage}
              frame={selectedFrame}
              zoom={zoom}
              position={position}
              onZoomChange={setZoom}
              onPositionChange={setPosition}
              editorRef={editorRef}
            />


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
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
            </div>
            <FrameSelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedFrame={selectedFrame}
              onFrameSelect={setSelectedFrame}
            />

            {/* Social Share */}
            {shareImageUrl && <SocialShare shareImageUrl={shareImageUrl} type="frame" />}
          </div>
        )}
      </div>
    </Layout>
  );
} 