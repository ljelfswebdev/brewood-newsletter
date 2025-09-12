'use client';
import { useRef } from 'react';
import { exportContainerToPdf } from '../lib/exportPdf';

export default function DownloadButtons({ printRef }) {
  const busyRef = useRef(false);

  const handlePdf = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      await exportContainerToPdf(printRef.current);
    } finally {
      busyRef.current = false;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-3">
      <button onClick={handlePdf} className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm">Download PDF</button>
      <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-white border text-sm">Print</button>
    </div>
  );
}
