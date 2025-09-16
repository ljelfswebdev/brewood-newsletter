// app/print/page.js
'use client';

import { useEffect, useMemo, useState } from 'react';
import PrintPage from '../../components/PrintPage';
import '../globals.css';

export default function PrintView({ searchParams }) {
  // Prefer query if present (small payloads), otherwise read localStorage
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let parsed = [];
    // try query param first
    if (searchParams?.data) {
      try { parsed = JSON.parse(searchParams.data); } catch {}
    }
    if (!parsed.length && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('newsletter-pages');
        if (raw) parsed = JSON.parse(raw);
      } catch {}
    }
    setPages(parsed || []);
    // make sure non-print UI is hidden here
    document.body.classList.add('exporting');
    return () => document.body.classList.remove('exporting');
  }, [searchParams?.data]);

  return (
    <main className="bg-white p-0 m-0">
      <div className="space-y-6">
        {pages.map((p) => (
          <PrintPage key={p.id} page={p} onFitChange={() => {}} />
        ))}
      </div>
    </main>
  );
}