'use client';
import { useRef, useState } from 'react';
import PageForm from '../components/PageForm';
import PrintPage from '../components/PrintPage';
import DownloadButtons from '../components/DownloadButtons';
import { DEFAULT_PAGE } from '../lib/constants';

export default function HomePage() {
  const [pages, setPages] = useState(() => [DEFAULT_PAGE()]);
  const [fitMap, setFitMap] = useState({}); // { [pageId]: { fits, overflowPx, usagePct } }
  const printRef = useRef(null);

  const addPage = () => setPages((p) => [...p, DEFAULT_PAGE()]);

  const handleFitChange = (id, status) => {
    setFitMap((m) => (m[id] && m[id].fits === status.fits && m[id].overflowPx === status.overflowPx
      ? m
      : { ...m, [id]: status }));
  };

  const overflows = Object.values(fitMap).filter(s => s && !s.fits);
  const disabledReason = overflows.length
    ? `${overflows.length} page${overflows.length > 1 ? 's' : ''} exceed A4`
    : '';

  return (
    <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Form / Repeater */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Pages</h2>
          <button onClick={addPage} className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm">+ Add Page</button>
        </div>
        <PageForm pages={pages} setPages={setPages} />
      </section>

      {/* Right: A4 Preview + Export */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">A4 Preview</h2>
          <DownloadButtons pages={pages} />
        </div>

        {/* Small summary if any overflow */}
        {disabledReason && (
          <div className="no-print text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
            ⚠ Please shorten content: {disabledReason}.
          </div>
        )}

        <div ref={printRef} className="space-y-6">
          {pages.map((p) => (
            <PrintPage key={p.id} page={p} onFitChange={handleFitChange} />
          ))}
        </div>
      </section>
    </main>
  );
}