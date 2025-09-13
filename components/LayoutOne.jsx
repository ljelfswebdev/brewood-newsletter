'use client';
import ImageInput from './ImageInput';
import TextArea from './TextArea';
import Input from './Input';

export default function LayoutOne({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });

  // --- Migration shim: convert legacy rightTop/rightBottom -> rightBlocks[] once ---
  const ensureRightBlocks = () => {
    if (Array.isArray(value.rightBlocks)) return value.rightBlocks;
    const rb = [];
    if (value.rightTop) rb.push(value.rightTop);
    if (value.rightBottom) rb.push(value.rightBottom);
    return rb.length ? rb : [{ image: null, title: '', text: '' }];
  };

  const rightBlocks = ensureRightBlocks();

  const updateRight = (idx, patch) => {
    const next = rightBlocks.map((b, i) => (i === idx ? { ...b, ...patch } : b));
    set({ rightBlocks: next, rightTop: undefined, rightBottom: undefined });
  };

  const addRight = () => {
    set({
      rightBlocks: [...rightBlocks, { image: null, title: '', text: '' }],
      rightTop: undefined,
      rightBottom: undefined
    });
  };

  const removeRight = (idx) => {
    const next = rightBlocks.filter((_, i) => i !== idx);
    set({
      rightBlocks: next.length ? next : [{ image: null, title: '', text: '' }],
      rightTop: undefined,
      rightBottom: undefined
    });
  };

  const moveRight = (idx, dir) => {
    const to = idx + dir;
    if (to < 0 || to >= rightBlocks.length) return;
    const next = [...rightBlocks];
    const [item] = next.splice(idx, 1);
    next.splice(to, 0, item);
    set({ rightBlocks: next, rightTop: undefined, rightBottom: undefined });
  };

  return (
    <div className="grid grid-cols-[35%_5%_1fr] gap-4">
      {/* LEFT (35%) — square thumbnail */}
      <div className="space-y-2">
        <ImageInput
          value={value.left?.image || null}
          onChange={(v) => set({ left: { ...value.left, image: v } })}
          size="thumb"
          square
          thumbHeight={120}
        />
        <Input
          value={value.left?.title || ''}
          onChange={(v) => set({ left: { ...value.left, title: v } })}
          placeholder="Left block title"
        />
        <TextArea
          value={value.left?.text || ''}
          onChange={(v) => set({ left: { ...value.left, text: v } })}
          placeholder="Left block text"
        />
      </div>

      {/* GAP (5%) */}
      <div />

      {/* RIGHT (60%) — dynamic stack of blocks */}
      <div className="flex flex-col gap-6">
        {rightBlocks.map((b, i) => (
          <div key={i} className="space-y-2 rounded-xl border p-3 bg-white">
            <ImageInput
              value={b.image || null}
              onChange={(v) => updateRight(i, { image: v })}
              size="thumb"
              thumbHeight={120}
            />
            <Input
              value={b.title || ''}
              onChange={(v) => updateRight(i, { title: v })}
              placeholder={`Right block ${i + 1} title`}
            />
            <TextArea
              value={b.text || ''}
              onChange={(v) => updateRight(i, { text: v })}
              placeholder={`Right block ${i + 1} text`}
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => moveRight(i, -1)}
                className="px-2 py-1 rounded bg-gray-200 text-sm"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveRight(i, +1)}
                className="px-2 py-1 rounded bg-gray-200 text-sm"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeRight(i)}
                className="ml-auto px-2.5 py-1.5 rounded bg-red-600 text-white text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={addRight}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm"
          >
            + Add Right Block
          </button>
        </div>
      </div>
    </div>
  );
}