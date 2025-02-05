"use client";
import React, { useState, useRef } from "react";
import { Download, X, Sun, Moon } from "lucide-react";
import html2canvas from "html2canvas";
import { FrameSelector } from "@/components/ProfileEditor/FrameSelector";
import { ImageUploader } from "@/components/ProfileEditor/ImageUploader";
import { ImageEditor } from "@/components/ProfileEditor/ImageEditor";
import ThemeToggle from "@/components/ThemeToggle";
import SocialShare from "@/components/SocialShare";

const ProfileFrameEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const editorRef = useRef(null);

  const handleImageUpload = (imageData) => {
    setUserImage(imageData);
    // Reset position and zoom when new image is uploaded
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleDownload = async () => {
    if (!editorRef.current) return;

    const canvas = await html2canvas(editorRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = "profile-frame.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClear = () => {
    setUserImage(null);
    setSelectedFrame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">Profile Frame Editor</h1>
          <ThemeToggle />
        </div>

        {!userImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            <div ref={editorRef}>
              <ImageEditor
                image={userImage}
                frame={selectedFrame}
                zoom={zoom}
                position={position}
                onZoomChange={setZoom}
                onPositionChange={setPosition}
              />
            </div>

            <FrameSelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedFrame={selectedFrame}
              onFrameSelect={setSelectedFrame}
            />

            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </button>

              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
            </div>

            {/* Optional: Social Share Section */}
            <SocialShare imageRef={editorRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFrameEditor;
