// lib/usePageFit.js
'use client';

import { useEffect, useState } from 'react';

/**
 * Measures whether an element overflows (scrollHeight > clientHeight).
 * Returns { fits, overflowPx, usagePct } and keeps it updated on resize/content changes.
 */
export default function usePageFit(ref) {
  const [state, setState] = useState({ fits: true, overflowPx: 0, usagePct: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    const measure = () => {
      if (!ref.current) return;
      const node = ref.current;
      const ch = node.clientHeight;
      const sh = node.scrollHeight;
      const overflowPx = Math.max(0, Math.round(sh - ch));
      const usagePct = Math.min(100, Math.round((sh / ch) * 100));
      setState({ fits: overflowPx === 0, overflowPx, usagePct });
    };

    // Observe size changes
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    ro.observe(el);

    // Re-measure on image loads inside
    const imgs = el.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });

    // Fallback polling (rarely needed, but keeps it robust for text edits)
    const id = setInterval(measure, 500);
    measure();

    return () => {
      clearInterval(id);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return state; // { fits, overflowPx, usagePct }
}