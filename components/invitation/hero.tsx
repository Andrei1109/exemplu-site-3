import type { InvitationConfig } from '@/lib/invitation-config'
import { formatLongDate, formatNumericDate } from '@/lib/invitation-utils'
import { Filigree } from './ornaments'
import { FloralReveal, Reveal } from './reveal'

export function Hero({ config }: { config: InvitationConfig }) {
  const { couple, copy, images, ceremony, reception } = config
  const floral = images.floralCorner

  return (
    <header className="paper relative flex min-h-svh flex-col overflow-hidden bg-ivory">
      {/* Frame: one hairline on mobile, a double rule from sm upwards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/70 sm:inset-6" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-8 hidden border border-gold/40 sm:block" />

      <FloralReveal
        src={floral?.src}
        eager
        className="absolute -top-2 -left-6 w-[115%] max-w-[880px] sm:-top-4 sm:-left-4 sm:w-[78%] lg:w-[62%]"
      />
      <FloralReveal
        src={floral?.src}
        direction="right"
        delay={0.3}
        className="absolute -right-6 -bottom-2 w-[115%] max-w-[880px] rotate-180 sm:-right-4 sm:-bottom-4 sm:w-[78%] lg:w-[62%]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-8 pt-[58vw] pb-[52vw] text-center sm:px-12 sm:py-40">
        <Reveal>
          <p className="small-caps text-wine">{copy.heroLead}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <h1
            id="hero-title"
            tabIndex={-1}
            className="flex flex-col items-center font-serif font-normal leading-[0.9] text-burgundy outline-none"
          >
            <span className="text-[clamp(3.4rem,16vw,8.5rem)] tracking-tight">{couple.partnerOne}</span>
            <span className="my-1 font-serif text-[clamp(2.25rem,8vw,4.5rem)] italic text-wine sm:my-2" aria-label="și">
              &amp;
            </span>
            <span className="text-[clamp(3.4rem,16vw,8.5rem)] tracking-tight">{couple.partnerTwo}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-col items-center gap-5">
          <Filigree />
          <p className="font-serif text-2xl text-burgundy sm:text-3xl">
            <time dateTime={config.date.mainStartsAt}>{formatLongDate(config.date.mainStartsAt, config)}</time>
          </p>
          <p className="small-caps tabular-nums text-wine">{formatNumericDate(config.date.mainStartsAt, config)}</p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="max-w-md font-serif text-lg italic leading-relaxed text-wine text-pretty">
            {ceremony.venue.name} <span aria-hidden="true">·</span>
            <span className="sr-only">și</span> {reception.venue.name}
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <a
            href="#scrisoarea"
            className="small-caps group mt-2 inline-flex flex-col items-center gap-3 text-wine hover:text-burgundy"
          >
            Citiți scrisoarea
            <span
              aria-hidden="true"
              className="block h-10 w-px origin-top bg-gold transition-transform duration-500 group-hover:scale-y-125"
            />
          </a>
        </Reveal>
      </div>
    </header>
  )
}
