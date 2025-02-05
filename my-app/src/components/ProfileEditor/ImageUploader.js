import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import Cropper from 'react-easy-crop';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds 5MB limit');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropConfirm = useCallback(async () => {
    if (!croppedArea || !image) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageObj = new Image();
    imageObj.src = image;
    await new Promise(resolve => {
      imageObj.onload = resolve;
    });
    // Set canvas dimensions to cropped size
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    // Draw the cropped image
    ctx.drawImage(
      imageObj,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height
    );
    const croppedImage = canvas.toDataURL('image/png');
    onImageUpload(croppedImage);
    setImage(null);
  }, [croppedArea, image, onImageUpload]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {!image ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Drop an image here or click to upload
            </span>
            <span className="mt-1 text-xs text-gray-400">
              Maximum file size: 5MB
            </span>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-96">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCropConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Crop
            </button>
            <button
              onClick={() => setImage(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
