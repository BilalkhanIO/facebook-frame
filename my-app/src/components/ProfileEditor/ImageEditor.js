"use client";

import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageEditor({
  image,
  frame,
  zoom,
  position,
  onZoomChange,
  onPositionChange,
  editorRef,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Reset position and zoom when image changes
  useEffect(() => {
    if (image) {
      onPositionChange({ x: 0, y: 0 });
      onZoomChange(1);
      setRotation(0);
    }
  }, [image, onPositionChange, onZoomChange]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="space-y-6">
      {/* Editor Container */}
      <div className="relative w-[400px] h-[400px] mx-auto bg-card rounded-lg overflow-hidden">
        <div
          ref={editorRef}
          id="frame-preview"
          className="relative w-full h-full"
        >
          {/* Image Layer */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <Cropper
              image={image}
              crop={position}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={onPositionChange}
              onZoomChange={onZoomChange}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              objectFit="contain"
              cropSize={{ width: 400, height: 400 }}
              classes={{
                containerClassName: "w-full h-full",
                mediaClassName: "max-w-full h-auto",
                cropAreaClassName: frame ? "" : "border-2 border-white !important"
              }}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "100%",
                  position: "relative"
                },
                mediaStyle: {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }
              }}
          />
        </div>
          {/* Frame Layer */}
        {frame && (
            <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }}>
          <img
                width={400}
                height={400}
            src={frame.src}
                alt="Frame"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
                style={{ mixBlendMode: "normal" }}
              />
          </div>
        )}
      </div>
    </div>

      {/* Controls */}
      <div className="no-capture flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => onZoomChange(Math.max(1, zoom - 0.1))}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoom <= 1}
          title="Zoom Out"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <button
          onClick={() => onZoomChange(Math.min(3, zoom + 0.1))}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoom >= 3}
          title="Zoom In"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={() => setRotation((rotation + 90) % 360)}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          title="Rotate"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {/* Instructions */}
      <p className="text-sm text-center text-foreground/60">
        {frame ? "Drag to adjust photo position within the frame" : "Adjust your photo position and size"}
      </p>
</div>
  );
}
