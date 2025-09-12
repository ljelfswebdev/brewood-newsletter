'use client';
import BannerHardcoded from './BannerHardcoded';
import SocialsHardcoded from './SocialsHardcoded';
import SponsorsHardcoded from './SponsorsHardcoded';

function Block({ image, title, text, className, imageClassName }) {
  return (
    <div className={className}>
      {image && (
        <img
          src={image}
          alt=""
          className={`w-full rounded-lg object-cover ${imageClassName || ''}`}
        />
      )}
      {title && <h3 className="mt-2 text-lg font-semibold leading-tight">{title}</h3>}
      {text && <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>}
    </div>
  );
}

export default function PrintPage({ page }) {
  const { layout, content } = page;

  return (
    <div className="a4 page-break p-6 flex flex-col gap-6">
      <BannerHardcoded />

      {layout === 1 && (
        <div className="grid grid-cols-[35%_5%_1fr] gap-4">
          <Block
            image={content.left?.image}
            title={content.left?.title}
            text={content.left?.text}
            className="space-y-2"
            imageClassName="aspect-square"
          />
          <div />
          <div className="flex flex-col gap-6">
            {/* right blocks keep 300px fixed height */}
            <Block
              image={content.rightTop?.image}
              title={content.rightTop?.title}
              text={content.rightTop?.text}
              className="space-y-2"
              imageClassName="fixed-300"
            />
            <Block
              image={content.rightBottom?.image}
              title={content.rightBottom?.title}
              text={content.rightBottom?.text}
              className="space-y-2"
              imageClassName="fixed-300"
            />
          </div>
        </div>
      )}

      {layout === 2 && (
        <div className="flex flex-col gap-6">
          {(content.blocks || []).map((b, i) => (
            <Block
              key={i}
              image={b.image}
              title={b.title}
              text={b.text}
              className="space-y-2"
              imageClassName="fullwidth-img"  /* CAP HERE */
            />
          ))}
        </div>
      )}

      {layout === 3 && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <Block
              image={content.topLeft?.image}
              title={content.topLeft?.title}
              text={content.topLeft?.text}
              className="space-y-2"
              imageClassName="fullwidth-img"  /* CAP HERE */
            />
            <Block
              image={content.topRight?.image}
              title={content.topRight?.title}
              text={content.topRight?.text}
              className="space-y-2"
              imageClassName="fullwidth-img"  /* CAP HERE */
            />
          </div>
          <Block
            image={content.bottom?.image}
            title={content.bottom?.title}
            text={content.bottom?.text}
            className="space-y-2"
            imageClassName="fullwidth-img"    /* CAP HERE */
          />
        </div>
      )}

      <SponsorsHardcoded />
      <SocialsHardcoded />
    </div>
  );
}