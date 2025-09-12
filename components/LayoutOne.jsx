'use client';
import ImageInput from './ImageInput';
import TextArea from './TextArea';
import Input from './Input';

export default function LayoutOne({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="grid grid-cols-[35%_5%_1fr] gap-4">
      {/* Left (35%) – square thumbnail */}
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

      {/* Gap */}
      <div />

      {/* Right (60%) – thumbnails instead of big 300px boxes */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <ImageInput
            value={value.rightTop?.image || null}
            onChange={(v) => set({ rightTop: { ...value.rightTop, image: v } })}
            size="thumb"
            thumbHeight={120}
          />
          <Input
            value={value.rightTop?.title || ''}
            onChange={(v) => set({ rightTop: { ...value.rightTop, title: v } })}
            placeholder="Top-right title"
          />
          <TextArea
            value={value.rightTop?.text || ''}
            onChange={(v) => set({ rightTop: { ...value.rightTop, text: v } })}
            placeholder="Top-right text"
          />
        </div>

        <div className="space-y-2">
          <ImageInput
            value={value.rightBottom?.image || null}
            onChange={(v) => set({ rightBottom: { ...value.rightBottom, image: v } })}
            size="thumb"
            thumbHeight={120}
          />
          <Input
            value={value.rightBottom?.title || ''}
            onChange={(v) => set({ rightBottom: { ...value.rightBottom, title: v } })}
            placeholder="Bottom-right title"
          />
          <TextArea
            value={value.rightBottom?.text || ''}
            onChange={(v) => set({ rightBottom: { ...value.rightBottom, text: v } })}
            placeholder="Bottom-right text"
          />
        </div>
      </div>
    </div>
  );
}