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

  // Read a File into a data URL (base64) so it survives serialization to /print
  const fileToDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);      // e.g. "data:image/png;base64,AAAA..."
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFile = async (file) => {
    if (!file) return;
    try {
      // Optional: basic type guard
      if (!file.type.startsWith('image/')) {
        alert('Please choose an image file.');
        return;
      }

      const dataUrl = await fileToDataURL(file);

      // Update preview immediately
      setPreview(dataUrl);

      // Push value up to parent form/state
      onChange?.(dataUrl);
    } catch (e) {
      console.error(e);
      alert('Failed to read the image.');
    }
  };

  const outerClass =
    size === 'thumb'
      ? `border rounded-lg p-2 ${className || ''}`
      : `${className || ''}`;

  const boxClass =
    size === 'thumb'
      ? `w-full ${square ? 'aspect-square' : ''}`
      : 'w-full';

  return (
    <div className={outerClass}>
      {label && <div className="text-xs text-gray-600 mb-1">{label}</div>}

      <div
        className={`relative ${boxClass} cursor-pointer`}
        style={size === 'thumb' && !square ? { height: thumbHeight } : undefined}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' ? inputRef.current?.click() : null)}
      >
        {preview ? (
          <img
            src={preview}              // data: URL works in editor & in Puppeteer
            alt=""
            decoding="async"
            loading="eager"
            className={`w-full h-full object-cover rounded-md`}
          />
        ) : (
          <div className="w-full h-full rounded-md bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
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