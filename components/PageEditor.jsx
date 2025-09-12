'use client';
import LayoutOne from './LayoutOne';
import LayoutTwo from './LayoutTwo';
import LayoutThree from './LayoutThree';

export default function PageEditor({ page, onChange, onMoveUp, onMoveDown, onDelete }) {
  const set = (patch) => onChange({ ...page, ...patch });
  const { layout } = page;

  return (
    <div className="rounded-2xl border bg-white p-4 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Layout</span>
          <select
            value={layout}
            onChange={(e) => set({ layout: Number(e.target.value) })}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            <option value={1}>Option 1: Left + Right stacked</option>
            <option value={2}>Option 2: Full-width stack</option>
            <option value={3}>Option 3: Split top, full bottom</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onMoveUp} className="px-2.5 py-1.5 rounded bg-gray-200 text-sm">↑</button>
          <button onClick={onMoveDown} className="px-2.5 py-1.5 rounded bg-gray-200 text-sm">↓</button>
          <button onClick={onDelete} className="px-2.5 py-1.5 rounded bg-red-600 text-white text-sm">Delete</button>
        </div>
      </div>

      {layout === 1 && (<LayoutOne value={page.content} onChange={(v) => set({ content: v })} />)}
      {layout === 2 && (<LayoutTwo value={page.content} onChange={(v) => set({ content: v })} />)}
      {layout === 3 && (<LayoutThree value={page.content} onChange={(v) => set({ content: v })} />)}
    </div>
  );
}
