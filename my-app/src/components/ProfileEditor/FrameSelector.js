"use client";

import { useState } from "react";

const frames = [
  {
    id: "frame1",
    name: "Classic Frame",
    category: "Basic",
    src: "/frames/frame1.png",
  },
  {
    id: "frame2",
    name: "Premium Frame",
    category: "Premium",
    src: "/frames/frame2.png",
  },
  {
    id: "elegant",
    name: "Elegant Frame",
    category: "Premium",
    src: "/frames/elegant.png",
  },
  {
    id: "simple",
    name: "Simple Frame",
    category: "Basic",
    src: "/frames/simple.png",
  },
];

const categories = [
  { id: "all", name: "All Frames" },
  { id: "Basic", name: "Basic" },
  { id: "Premium", name: "Premium" },
  { id: "custom", name: "Custom" },
];

export default function FrameSelector({
  selectedCategory,
  onCategoryChange,
  selectedFrame,
  onFrameSelect,
}) {
  const filteredFrames =
    selectedCategory === "all"
      ? frames
      : frames.filter((frame) => frame.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Frame Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFrames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onFrameSelect(frame)}
            className={`p-4 border rounded-lg transition-all ${
              selectedFrame?.id === frame.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="relative w-full aspect-square mb-2">
              <img
                width={200}
                height={200}
                src={frame.src}
                alt={frame.name}
                className="w-full h-full object-contain"
                loading="lazy"
                crossOrigin="anonymous"
              />
            </div>
            <p className="text-sm font-medium">{frame.name}</p>
            <p className="text-xs text-foreground/60">{frame.category}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
