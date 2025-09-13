'use client';
import { useRef } from 'react';
import { exportContainerToPdf } from '../lib/exportPdf';

export default function DownloadButtons({ printRef, disabledReason }) {
  const busyRef = useRef(false);

  const handlePdf = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const container = printRef.current;
    try {
      if (container) container.classList.add('exporting');   // hide badges
      await exportContainerToPdf(container);
    } finally {
      if (container) container.classList.remove('exporting'); // show badges again
      busyRef.current = false;
    }
  };

  const disabled = !!disabledReason;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePdf}
        disabled={disabled}
        className={`px-4 py-2 rounded-xl text-sm ${
          disabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-900 text-white'
        }`}
        title={disabledReason || 'Export to PDF'}
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