import type { InvitationConfig } from '@/lib/invitation-config'
import { SectionLabel } from './ornaments'
import { CouplePhoto } from './couple-photo'
import { FloralReveal, Reveal } from './reveal'

export function Story({ config }: { config: InvitationConfig }) {
  const { copy, images } = config

  return (
    <section aria-labelledby="story-title" className="paper relative overflow-hidden bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-20">
        {images.couple && (
          <Reveal className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
            <CouplePhoto image={images.couple} />
          </Reveal>
        )}

        <div className="flex flex-col gap-7 text-center md:text-left">
          <Reveal>
            <div className="md:[&>p]:justify-start">
              <SectionLabel numeral="II">Povestea noastră</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="story-title" className="font-serif text-4xl leading-tight text-burgundy text-balance sm:text-5xl">
              {copy.storyTitle}
            </h2>
          </Reveal>
          {copy.storyParagraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.15 + index * 0.1} as="p" className="leading-relaxed text-burgundy/90 text-pretty">
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>

      <figure className="mx-auto mt-24 flex max-w-3xl flex-col items-center gap-6 text-center sm:mt-32">
        <FloralReveal src={images.floralGarland?.src} className="w-full max-w-md" />
        <blockquote>
          <Reveal as="p" className="font-serif text-3xl italic leading-snug text-burgundy text-balance sm:text-4xl">
            {`„${copy.quote.text}”`}
          </Reveal>
        </blockquote>
        <Reveal delay={0.15}>
          <figcaption className="small-caps text-wine">{copy.quote.source}</figcaption>
        </Reveal>
      </figure>
    </section>
  )
}
