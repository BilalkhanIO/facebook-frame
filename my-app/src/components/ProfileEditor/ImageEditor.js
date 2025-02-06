import React, { useRef, useEffect, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, RefreshCw } from "lucide-react";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;
const ROTATION_STEP = 90;

const ImageEditor = ({ image, frame, zoom, position, onZoomChange, onPositionChange ,editorRef}) => {
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => onZoomChange(Math.min(zoom + ZOOM_STEP, MAX_ZOOM)), [zoom, onZoomChange]);
  const handleZoomOut = useCallback(() => onZoomChange(Math.max(zoom - ZOOM_STEP, MIN_ZOOM)), [zoom, onZoomChange]);
  const handleRotateRight = useCallback(() => setRotation((prev) => (prev + ROTATION_STEP) % 360), []);
  const handleRotateLeft = useCallback(() => setRotation((prev) => (prev - ROTATION_STEP + 360) % 360), []);
  const handleReset = useCallback(() => {
    onZoomChange(1);
    onPositionChange({ x: 0, y: 0 });
    setRotation(0);
  }, [onZoomChange, onPositionChange]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const newPosition = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    onPositionChange(constrainPosition(newPosition));
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const constrainPosition = (pos) => {
    const container = containerRef.current;
    if (!container) return pos;
    const bounds = container.getBoundingClientRect();
    const maxOffset = ((zoom - 1) * bounds.width) / 2;
    return {
      x: Math.max(Math.min(pos.x, maxOffset), -maxOffset),
      y: Math.max(Math.min(pos.y, maxOffset), -maxOffset),
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "ArrowLeft":
          onPositionChange({ x: position.x - 10, y: position.y });
          break;
        case "ArrowRight":
          onPositionChange({ x: position.x + 10, y: position.y });
          break;
        case "ArrowUp":
          onPositionChange({ x: position.x, y: position.y - 10 });
          break;
        case "ArrowDown":
          onPositionChange({ x: position.x, y: position.y + 10 });
          break;
        case "r":
          handleRotateRight();
          break;
        case "R":
          handleRotateLeft();
          break;
        case " ":
          handleReset();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [position, zoom, handleZoomIn, handleZoomOut, onPositionChange, handleRotateRight, handleRotateLeft, handleReset]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={handleZoomIn} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors" title="Zoom In (+)">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={handleZoomOut} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors" title="Zoom Out (-)">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={handleRotateRight} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors" title="Rotate Right (R)">
          <RotateCw className="w-5 h-5" />
        </button>
        <button onClick={handleRotateLeft} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors" title="Rotate Left (Shift+R)">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button onClick={handleReset} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors" title="Reset (Space)">
          <RefreshCw className="w-5 h-5" />
        </button>
        <div className="flex items-center ml-4">
          <span className="text-sm text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Image Container */}
<div ref={editorRef}>
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          
          className="absolute w-full h-full transition-transform duration-150"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            cursor: isDragging.current ? "grabbing" : "grab",
            zIndex: 10,
          }}
        >
          <img
            src={image}
            alt="User uploaded"
            className="w-full h-full object-contain"
            onLoad={() => setLoading(false)}
            loading="lazy"
          />
        </div>

        {/* Frame Overlay */}
        {frame && (
          <img
            src={frame.src}
            alt="Selected frame"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 20 }}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>
    </div>
</div>
  );
};

export default ImageEditor;
