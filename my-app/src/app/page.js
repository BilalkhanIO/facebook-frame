"use client";
import React, { useState, useRef } from "react";
import { Download, X } from "lucide-react";
import html2canvas from "html2canvas";
import { FrameSelector } from "@/components/ProfileEditor/FrameSelector";
import { ImageUploader } from "@/components/ProfileEditor/ImageUploader";
import { ImageEditor } from "@/components/ProfileEditor/ImageEditor";

const ProfileFrameEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const editorRef = useRef(null);

  const handleImageUpload = (imageData) => {
    setUserImage(imageData);
    // Reset position and zoom when a new image is uploaded
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleDownload = async () => {
    if (!editorRef.current) return;

    // Hide controls that are not part of the final image
    const controls = document.querySelectorAll(".no-capture");
    controls.forEach((el) => (el.style.display = "none"));

    // Capture the editor area
    const canvas = await html2canvas(editorRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });

    // Restore controls visibility
    controls.forEach((el) => (el.style.display = ""));

    const link = document.createElement("a");
    link.download = "frame-for-bacha-khan-month-2025.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClear = () => {
    setUserImage(null);
    setSelectedFrame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* App Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-red-700">
            Frame for Bacha Khan Month 2025
          </h1>
          <p className="text-md text-red-600 mt-2">
            Upload your photo, select a frame, and download your commemorative image.
          </p>
        </div>

        {!userImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            {/* This div will be captured for the download */}
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

            {/* Controls that should not be captured */}
            <div className="no-capture flex flex-col md:flex-row justify-center items-center gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFrameEditor;
