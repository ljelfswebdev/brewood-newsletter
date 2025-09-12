'use client';
import { useRef, useState, useEffect } from 'react';

export default function ImageInput({
  value,
  onChange,
  label,
  className,
  size = 'full',        // 'full' | 'thumb'
  square = false,       // force 1:1 preview box in thumb mode
  thumbHeight = 120,    // px height for thumbnail (only used when size='thumb')
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);

  useEffect(() => { setPreview(value || null); }, [value]);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  // classes for the preview container
  const baseBox =
    size === 'thumb'
      ? `relative overflow-hidden rounded-xl bg-white border cursor-pointer ${
          square ? 'aspect-square' : ''} ${!square ? '' : ''}`
      : 'relative border-2 border-dashed rounded-xl p-3 flex items-center justify-center bg-white hover:border-gray-400 transition cursor-pointer';

  // inline style only for thumb height (keeps it simple)
  const thumbStyle = size === 'thumb' && !square ? { height: `${thumbHeight}px` } : undefined;

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <div
        className={baseBox}
        style={thumbStyle}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className={`w-full h-full object-cover ${size === 'thumb' ? '' : 'rounded-lg'}`}
          />
        ) : (
          <div className={`flex items-center justify-center text-gray-500 text-xs ${size === 'thumb' ? 'h-full' : ''}`}>
            Click to upload
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}