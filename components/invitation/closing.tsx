import type { InvitationConfig } from '@/lib/invitation-config'
import { formatNumericDate } from '@/lib/invitation-utils'
import { FloralReveal, Reveal } from './reveal'

export function Closing({ config }: { config: InvitationConfig }) {
  const { couple, copy, images } = config

  return (
    <footer className="paper relative overflow-hidden bg-ivory px-6 pt-20 pb-12 text-center sm:pt-28">

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8">
        <FloralReveal src={images.floralGarland?.src} className="w-full max-w-lg" />
        <Reveal>
          <h2 className="font-serif text-5xl italic leading-tight text-burgundy text-balance sm:text-6xl">
            {copy.closingTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1} as="p" className="max-w-md font-serif text-xl leading-relaxed text-wine text-pretty">
          {copy.closingLine}
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col items-center gap-3 pt-6">
          <span
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-full border border-gold font-serif text-lg italic text-burgundy outline outline-1 outline-offset-3 outline-gold/60"
          >
            {couple.monogram}
          </span>
          <p className="small-caps tabular-nums text-wine">
            {couple.partnerOne} &amp; {couple.partnerTwo} · {formatNumericDate(config.date.mainStartsAt, config)}
          </p>
        </Reveal>
      </div>

      <p className="relative mt-24 text-sm text-wine/80">
        Invitație digitală realizată de <span className="font-medium text-wine">Palfi Events</span>
      </p>
    </footer>
  )
}
