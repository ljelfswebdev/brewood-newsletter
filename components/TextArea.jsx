'use client';
export default function TextArea({ value, onChange, placeholder, rows = 4, className }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full mt-2 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10 ${className || ''}`}
    />
  );
}
