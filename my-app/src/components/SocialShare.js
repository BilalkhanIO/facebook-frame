import React from "react";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";

// Helper function to convert data URL to Blob
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
  const handleDirectShare = async () => {
    if (!shareImageUrl) {
      alert("No image available to share!");
      return;
    }

    const blob = dataURLtoBlob(shareImageUrl);
    if (!blob) {
      alert("Unable to process the image.");
      return;
    }
    const file = new File([blob], "bacha-khan-frame.png", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Bacha Khan Month 2025",
          text: "Check out my framed image for Bacha Khan Month 2025! #BachaKhanMonth2025 #BachaKhan #Peace you can also create your own at https://facebook-frame-iota.vercel.app/",
        });
      } catch (err) {
        alert("Direct sharing failed. Please try again.");
      }
    } else {
      alert(
        "Direct sharing is not supported on this device. Using fallback links."
      );
    }
  };

  return (
    <button
      onClick={handleDirectShare}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      Share
    </button>
  );
};

export default SocialShare;
