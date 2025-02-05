import React, { useRef, useEffect } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

export const ImageEditor = ({
  image,
  frame,
  zoom,
  position,
  onZoomChange,
  onPositionChange,
}) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 0.1, 0.5));
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const newPosition = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    onPositionChange(newPosition);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="flex items-center ml-4">
          <span className="text-sm text-gray-500">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        onMouseDown={handleMouseDown}
      >
        {/* User Image Container with lower z-index */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging.current ? "grabbing" : "grab",
            zIndex: 10,
          }}
        >
          <img
            src={image}
            alt="User uploaded"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Frame overlay with higher z-index */}
        {frame && (
          <img
            src={frame.src}
            alt="Selected frame"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 20 }}
          />
        )}
      </div>
    </div>
  );
};
