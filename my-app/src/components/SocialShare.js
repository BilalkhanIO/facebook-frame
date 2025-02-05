import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import html2canvas from 'html2canvas';

const SocialShare = ({ imageRef }) => {
  const handleShare = async (platform) => {
    if (!imageRef.current) return;
    const canvas = await html2canvas(imageRef.current, {
      useCORS: true,
      backgroundColor: null,
    });
    const dataUrl = canvas.toDataURL('image/png');
    // For simplicity, we'll just log the platform and dataUrl.
    // You can integrate with social sharing APIs or open a new window for sharing.
    console.log(`Sharing on ${platform}`, dataUrl);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => handleShare("Facebook")}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <Facebook className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare("Twitter")}
        className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleShare("LinkedIn")}
        className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SocialShare;
