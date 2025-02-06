"use client";
import React, { useState, useRef, useCallback } from "react";
import { Download, Share, X } from "lucide-react";
import html2canvas from "html2canvas";
import ThemeToggle from "@/components/ThemeToggle";
import ImageUploader from "@/components/ProfileEditor/ImageUploader";
import ImageEditor from "@/components/ProfileEditor/ImageEditor";
import FrameSelector from "@/components/ProfileEditor/FrameSelector";
import SocialShare from "@/components/SocialShare";

const ProfileFrameEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shareImageUrl, setShareImageUrl] = useState(null);
  const editorRef = useRef(null);

  // Called when an image (cropped or not) is uploaded
  const handleImageUpload = useCallback((imageData) => {
    setUserImage(imageData);
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  // Capture the editor area and trigger download
  const handleDownload = async () => {
    if (!editorRef.current) return;

    // Hide UI controls (elements with class "no-capture") during capture
    const controls = document.querySelectorAll(".no-capture");
    controls.forEach((el) => (el.style.display = "none"));

    const canvas = await html2canvas(editorRef.current, {
      useCORS: true,
      backgroundColor: null,
    });

    // Restore controls
    controls.forEach((el) => (el.style.display = ""));

    const imageUrl = canvas.toDataURL("image/png");
    // Optionally, update shareImageUrl so social share buttons reflect the same image
    setShareImageUrl(imageUrl);

    const link = document.createElement("a");
    link.download = "frame-for-bacha-khan-month-2025.png";
    link.href = imageUrl;
    link.click();
  };

  // Capture the current editor area and update shareImageUrl
  const handleShare = async () => {
    if (!editorRef.current) return;

    const controls = document.querySelectorAll(".no-capture");
    controls.forEach((el) => (el.style.display = "none"));

    const canvas = await html2canvas(editorRef.current, {
      useCORS: true,
      backgroundColor: null,
    });

    controls.forEach((el) => (el.style.display = ""));

    const imageUrl = canvas.toDataURL("image/png");
    setShareImageUrl(imageUrl);
  };

  const handleClear = useCallback(() => {
    setUserImage(null);
    setSelectedFrame(null);
    setShareImageUrl(null);
  }, []);

  // Custom frame upload handler – user can upload their own frame image.
  const handleCustomFrameUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file for the frame.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      // Create a custom frame object with id "custom"
      setSelectedFrame({
        id: "custom",
        src: reader.result,
        category: "custom",
      });
      // Also set selected category to "custom" if desired:
      setSelectedCategory("custom");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header and Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-700">
              Frame for Bacha Khan Month 2025
            </h1>
            <p className="text-md text-red-600 mt-2">
              Upload your photo, adjust & crop, select a frame, then
              download/share your commemorative image.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Image upload and adjustment */}
        {!userImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <>
            <div className="space-y-8">
              {/* Editor area – only the visible area (with overflow-hidden) will be captured */}
              <div>
                <ImageEditor
                  editorRef={editorRef}
                  image={userImage}
                  frame={selectedFrame}
                  zoom={zoom}
                  position={position}
                  onZoomChange={setZoom}
                  onPositionChange={setPosition}
                />
              </div>

              {/* Frame selection */}
              <FrameSelector
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedFrame={selectedFrame}
                onFrameSelect={setSelectedFrame}
              />

              {/* Custom frame upload option */}
              <div className="no-capture my-4 text-center">
                <label className="cursor-pointer px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Upload Your Frame
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomFrameUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Action controls */}
              <div className="no-capture flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Share className="w-5 h-5" />
                  Share
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Clear
                </button>
              </div>
            </div>

            {/* Social Share Buttons (immediately update as soon as image is captured) */}
            {shareImageUrl && <SocialShare shareImageUrl={shareImageUrl} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileFrameEditor;
