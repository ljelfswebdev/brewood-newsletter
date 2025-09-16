'use client';
import { useEffect, useRef } from 'react';
import usePageFit from '../lib/usePageFit';  // <-- NEW
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

export default function PrintPage({ page, onFitChange }) {
  const { layout, content } = page;

  // Measure the whole A4 wrapper
  const pageRef = useRef(null);
  const { fits, overflowPx, usagePct } = usePageFit(pageRef);

  // Report status to parent (for disabling download)
  useEffect(() => {
    onFitChange?.(page.id, { fits, overflowPx, usagePct });
  }, [fits, overflowPx, usagePct, page.id, onFitChange]);

  return (
    <div ref={pageRef} className="relative a4 page-break p-6 flex flex-col gap-6">
      {/* Fit badge (screen only) */}
      
      <div className={`fit-badge no-print no-export ${fits ? 'fit-ok' : 'fit-warn'}`}>
      {fits ? '✓ Fits' : `✗ Too long (+${overflowPx}px)`}
      </div>

      {/* Top Banner (hardcoded) */}
      <BannerHardcoded />

      {/* Content layouts */}
      {layout === 1 && (
        <div className="grid grid-cols-[35%_5%_1fr] gap-4">
          {/* Left */}
          <Block
            image={content.left?.image}
            title={content.left?.title}
            text={content.left?.text}
            className="space-y-2"
            imageClassName="aspect-square !object-contain"
          />

          <div />

          {/* Right: dynamic blocks, 300px images in print */}
          <div className="flex flex-col gap-6">
            {(content.rightBlocks && content.rightBlocks.length
              ? content.rightBlocks
              : [content.rightTop, content.rightBottom].filter(Boolean)
            ).map((rb, i) => (
              <Block
                key={i}
                image={rb?.image}
                title={rb?.title}
                text={rb?.text}
                className="space-y-2"
                imageClassName="fixed-300"
              />
            ))}
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
              imageClassName="fullwidth-img"
            />
          ))}
        </div>
      )}

      {layout === 3 && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <Block image={content.topLeft?.image}  title={content.topLeft?.title}  text={content.topLeft?.text}  className="space-y-2" imageClassName="fullwidth-img" />
            <Block image={content.topRight?.image} title={content.topRight?.title} text={content.topRight?.text} className="space-y-2" imageClassName="fullwidth-img" />
          </div>
          <Block image={content.bottom?.image} title={content.bottom?.title} text={content.bottom?.text} className="space-y-2" imageClassName="fullwidth-img" />
        </div>
      )}

      {/* Bottom (hardcoded) */}
      <SponsorsHardcoded />
      <SocialsHardcoded />
    </div>
  );
}