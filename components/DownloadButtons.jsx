'use client';
import { useRef } from 'react';
import { exportContainerToPdf } from '../lib/exportPdf';

export default function DownloadButtons({ printRef, disabledReason }) {
  const busyRef = useRef(false);

  const getContainer = () => {
    // Prefer the passed ref if available
    if (printRef?.current) return printRef.current;

    // Fallbacks: try a known wrapper or nearest parent of an .a4 page
    const byId =
      document.getElementById('print-root') ||
      document.querySelector('.pages-container') ||
      document.querySelector('.newsletter-container');

    if (byId) return byId;

    const a4 = document.querySelector('.a4');
    if (a4 && a4.parentElement) return a4.parentElement;

    // Last resort
    return document.body;
  };

  const handlePdf = async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    const container = getContainer();

    try {
      container?.classList.add('exporting'); // hide badges etc.
      await exportContainerToPdf(container);
    } finally {
      container?.classList.remove('exporting');
      busyRef.current = false;
    }
  };

  const disabled = Boolean(disabledReason);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePdf}
        disabled={disabled}
        className={`px-4 py-2 rounded-xl text-sm ${
          disabled
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-gray-900 text-white'
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