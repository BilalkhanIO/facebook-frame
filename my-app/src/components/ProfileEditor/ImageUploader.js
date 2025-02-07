'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('Please upload an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative h-[200px] rounded-lg border-2 border-dashed transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center w-full h-full p-6 text-center">
        <Upload className="w-12 h-12 mb-4 text-primary" />
        <h3 className="text-lg font-semibold mb-2">
          {isDragActive ? 'Drop your photo here' : 'Upload your photo'}
        </h3>
        <p className="text-sm text-foreground/60 mb-2">
          Drag and drop your image here or click to browse
        </p>
        <p className="text-xs text-foreground/40">
          Supports: JPG, PNG, GIF (Max 5MB)
        </p>
      </div>
    </div>
  );
}
