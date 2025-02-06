import React from "react";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";

// Helper function to convert a data URL to a Blob
const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const SocialShare = ({ shareImageUrl }) => {
  // Function to handle direct sharing via the Web Share API
  const handleDirectShare = async () => {
    if (!shareImageUrl) {
      alert("No image available to share!");
      return;
    }

    const blob = dataURLtoBlob(shareImageUrl);
    if (!blob) {
      alert("Could not process image for sharing.");
      return;
    }

    const file = new File([blob], "bacha-khan-frame.png", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Frame for Bacha Khan Month 2025",
          text: "Check out my commemorative image for Bacha Khan Month 2025!",
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Direct share failed:", error);
        alert("Direct sharing failed. Please try again.");
      }
    } else {
      alert("Direct sharing is not supported on this device/browser.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {/* Primary Direct Share Button */}
      <button
        onClick={handleDirectShare}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        Share Directly
      </button>

      {/* Fallback share links */}
      <div className="flex gap-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareImageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareImageUrl)}&text=Celebrate%20Bacha%20Khan%20Month%202025!`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareImageUrl)}&title=Frame%20for%20Bacha%20Khan%20Month%202025`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
