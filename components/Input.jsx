'use client';
export default function Input({ value, onChange, placeholder, className }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10 ${className || ''}`}
    />
  );
}