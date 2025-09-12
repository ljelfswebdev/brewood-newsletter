'use client';
import PageEditor from './PageEditor';

export default function PageForm({ pages, setPages }) {
  const update = (idx, next) => {
    const copy = [...pages];
    copy[idx] = next;
    setPages(copy);
  };
  const remove = (idx) => setPages(pages.filter((_, i) => i !== idx));
  const move = (idx, dir) => {
    const copy = [...pages];
    const to = idx + dir;
    if (to < 0 || to >= copy.length) return;
    const [item] = copy.splice(idx, 1);
    copy.splice(to, 0, item);
    setPages(copy);
  };

  return (
    <div className="space-y-4">
      {pages.map((p, i) => (
        <PageEditor
          key={p.id}
          page={p}
          onChange={(next) => update(i, next)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, +1)}
          onDelete={() => remove(i)}
        />
      ))}
    </div>
  );
}
