'use client';
import ImageInput from './ImageInput';
import TextArea from './TextArea';
import Input from './Input';

export default function LayoutTwo({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });

  const blocks = Array.isArray(value.blocks) && value.blocks.length
    ? value.blocks
    : [{ image: null, title: '', text: '' }];

  const updateBlock = (idx, patch) => {
    const next = blocks.map((b, i) => (i === idx ? { ...b, ...patch } : b));
    set({ blocks: next });
  };

  const addBlock = () => {
    set({ blocks: [...blocks, { image: null, title: '', text: '' }] });
  };

  const removeBlock = (idx) => {
    const next = blocks.filter((_, i) => i !== idx);
    set({ blocks: next.length ? next : [{ image: null, title: '', text: '' }] });
  };

  const moveBlock = (idx, dir) => {
    const to = idx + dir;
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(idx, 1);
    next.splice(to, 0, item);
    set({ blocks: next });
  };

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => (
        <div key={i} className="space-y-2 rounded-xl border p-3 bg-white">
          {/* Small thumbnail on the form side */}
          <ImageInput
            value={b.image || null}
            onChange={(v) => updateBlock(i, { image: v })}
            size="thumb"
            thumbHeight={120}
          />

          <Input
            value={b.title || ''}
            onChange={(v) => updateBlock(i, { title: v })}
            placeholder={`Block ${i + 1} title`}
          />

          <TextArea
            value={b.text || ''}
            onChange={(v) => updateBlock(i, { text: v })}
            placeholder={`Block ${i + 1} text`}
          />

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => moveBlock(i, -1)}
              className="px-2 py-1 rounded bg-gray-200 text-sm"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveBlock(i, +1)}
              className="px-2 py-1 rounded bg-gray-200 text-sm"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeBlock(i)}
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
          onClick={addBlock}
          className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm"
        >
          + Add Block
        </button>
      </div>
    </div>
  );
}