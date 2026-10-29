import { Fragment } from 'react'
import type { InvitationConfig } from '@/lib/invitation-config'
import { Knot, SectionLabel } from './ornaments'
import { FloralReveal, Reveal } from './reveal'

export function Timeline({ config }: { config: InvitationConfig }) {
  return (
    <section aria-labelledby="timeline-title" className="paper relative overflow-hidden bg-ivory px-6 py-24 sm:px-10 sm:py-32">
      <FloralReveal
        src={config.images.floralCorner?.src}
        className="absolute -top-4 -left-10 hidden w-[44%] max-w-[560px] opacity-90 md:block"
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <Reveal>
          <SectionLabel numeral="IV">Programul zilei</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="timeline-title" className="font-serif text-4xl leading-tight text-burgundy text-balance sm:text-5xl">
            De la „da” până în zori
          </h2>
        </Reveal>

        <ol className="mt-8 flex w-full flex-col items-center">
          {config.timeline.map((item, index) => (
            <Fragment key={`${item.time}-${item.title}`}>
              {index > 0 && (
                <li aria-hidden="true" className="py-6">
                  <Knot />
                </li>
              )}
              <Reveal as="li" delay={0.05} className="flex flex-col items-center gap-1">
                <span className="font-serif text-4xl italic tabular-nums text-wine sm:text-5xl">{item.time}</span>
                <span className="font-serif text-2xl text-burgundy">{item.title}</span>
                {item.note && <span className="text-sm leading-relaxed text-wine">{item.note}</span>}
              </Reveal>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  )
}
