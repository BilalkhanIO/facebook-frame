import React from "react";
import Image from "next/image";

const frames = [
  { id: 1, src: "/frames/frame1.png", category: "basic" },
  { id: 2, src: "/frames/frame2.png", category: "premium" },
  { id: 3, src: "/frames/frame3.png", category: "basic" },
  // Additional frames can be added here.
];

const categories = [
  { id: "all", name: "All Frames" },
  { id: "basic", name: "Basic" },
  { id: "premium", name: "Premium" },
  { id: "custom", name: "Custom" },
];

const FrameSelector = ({ selectedCategory, onCategoryChange, selectedFrame, onFrameSelect }) => {
  const filteredFrames =
    selectedCategory === "all"
      ? frames
      : frames.filter((frame) => frame.category === selectedCategory);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredFrames.map((frame) => (
          <div
            key={frame.id}
            onClick={() => onFrameSelect(frame)}
            className={`relative aspect-square border-2 rounded-lg cursor-pointer transition-all ${
              selectedFrame?.id === frame.id
                ? "border-red-500 shadow-lg"
                : "border-gray-200 hover:border-red-300"
            }`}
          >
            <Image src={frame.src} alt={`Frame ${frame.id}`} fill className="object-contain p-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameSelector;
