'use client';

import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';

export default function SocialShare({ shareImageUrl, type = 'frame' }) {
  const websiteUrl = 'https://facebook-frame-iota.vercel.app/';
  const shareData = {
    title: 'Bacha Khan Month 2025',
    text: type === 'frame' 
      ? `Celebrating Bacha Khan Month 2025! 🌟\nI've created my profile frame to honor his legacy of peace and non-violence.\nCreate yours at: ${websiteUrl}\n#BachaKhanMonth2025 #BachaKhan #Peace`
      : `Sharing wisdom from Bacha Khan Month 2025! 🌟\nInspired by his message of peace and social reform.\nCreate your own quote image at: ${websiteUrl}\n#BachaKhanMonth2025 #BachaKhan #Peace`,
    url: websiteUrl,
  };

  const handleShare = async (platform) => {
    try {
      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(shareData.text)}`,
            '_blank'
          );
          break;
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}`,
            '_blank'
          );
          break;
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}&summary=${encodeURIComponent(shareData.text)}`,
            '_blank'
          );
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareData.text);
          alert('Share text and link copied to clipboard!');
          break;
        default:
          if (navigator.share) {
            const file = await (await fetch(shareImageUrl)).blob();
            const shareFile = new File([file], 'bacha-khan-2025.png', { type: 'image/png' });
            
            await navigator.share({
              files: [shareFile],
              title: shareData.title,
              text: shareData.text,
            });
          }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share. Please try another method.');
    }
  };

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Share your creation
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-all hover:scale-105"
        >
          <Facebook className="w-5 h-5" />
          Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-all hover:scale-105"
        >
          <Twitter className="w-5 h-5" />
          Twitter
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-all hover:scale-105"
        >
          <Linkedin className="w-5 h-5" />
          LinkedIn
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
        >
          <Link2 className="w-5 h-5" />
          Copy Text
        </button>
        {navigator.share && (
          <button
            onClick={() => handleShare('native')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105"
          >
            Share
          </button>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Your image will be shared along with a message about Bacha Khan Month 2025
      </div>
    </div>
  );
}
