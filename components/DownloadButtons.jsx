'use client';
import { useRef } from 'react';

export default function DownloadButtons({ pages }) {
  const busyRef = useRef(false);

  const handleServerPdf = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'PDF generation failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'newsletter.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(`PDF generation failed: ${e.message}`);
      console.error(e);
    } finally {
      busyRef.current = false;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleServerPdf}
        className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm"
      >
        Download PDF
      </button>
      <button
        onClick={() => window.print()}
        className="px-4 py-2 rounded-xl bg-white border text-sm"
      >
        Print
      </button>
    </div>
  );
}