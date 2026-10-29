'use client'

import { useState } from 'react'
import type { ImageAsset } from '@/lib/invitation-config'

/** A print tucked into the letter. Falls back to an empty passe-partout with the caption only. */
export function CouplePhoto({ image }: { image: ImageAsset & { caption?: string } }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className="flex -rotate-[1.5deg] flex-col gap-4 border border-gold/70 bg-ivory p-3 shadow-[0_1px_0_var(--gold),0_18px_40px_-24px_rgba(103,45,62,0.45)] sm:p-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-blush/40">
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element -- plain img allows a graceful onError fallback
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {image.caption && (
        <figcaption className="px-1 pb-1 text-center font-serif text-lg italic text-wine">{image.caption}</figcaption>
      )}
    </figure>
  )
}
