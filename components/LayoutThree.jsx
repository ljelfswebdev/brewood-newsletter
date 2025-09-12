'use client';
import ImageInput from './ImageInput';
import TextArea from './TextArea';
import Input from './Input';

export default function LayoutThree({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const topLeft = value.topLeft || {};
  const topRight = value.topRight || {};
  const bottom = value.bottom || {};

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <ImageInput
            value={topLeft.image || null}
            onChange={(v) => set({ topLeft: { ...topLeft, image: v } })}
            size="thumb"
            thumbHeight={120}
          />
          <Input
            value={topLeft.title || ''}
            onChange={(v) => set({ topLeft: { ...topLeft, title: v } })}
            placeholder="Top-left title"
          />
          <TextArea
            value={topLeft.text || ''}
            onChange={(v) => set({ topLeft: { ...topLeft, text: v } })}
            placeholder="Top-left text"
          />
        </div>

        <div className="space-y-2">
          <ImageInput
            value={topRight.image || null}
            onChange={(v) => set({ topRight: { ...topRight, image: v } })}
            size="thumb"
            thumbHeight={120}
          />
          <Input
            value={topRight.title || ''}
            onChange={(v) => set({ topRight: { ...topRight, title: v } })}
            placeholder="Top-right title"
          />
          <TextArea
            value={topRight.text || ''}
            onChange={(v) => set({ topRight: { ...topRight, text: v } })}
            placeholder="Top-right text"
          />
        </div>
      </div>

      <div className="space-y-2">
        <ImageInput
          value={bottom.image || null}
          onChange={(v) => set({ bottom: { ...bottom, image: v } })}
          size="thumb"
          thumbHeight={120}
        />
        <Input
          value={bottom.title || ''}
          onChange={(v) => set({ bottom: { ...bottom, title: v } })}
          placeholder="Bottom title"
        />
        <TextArea
          value={bottom.text || ''}
          onChange={(v) => set({ bottom: { ...bottom, text: v } })}
          placeholder="Bottom text"
        />
      </div>
    </div>
  );
}