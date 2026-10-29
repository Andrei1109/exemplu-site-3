import type { InvitationConfig } from '@/lib/invitation-config'
import { formatLongDate } from '@/lib/invitation-utils'
import { BurgundyBackdrop } from './burgundy-backdrop'
import { Filigree, SectionLabel } from './ornaments'
import { Reveal } from './reveal'

export function Letter({ config, guestName }: { config: InvitationConfig; guestName: string | null }) {
  const { couple, copy, family, features } = config
  const greeting = guestName ? `Dragă ${guestName},` : copy.letterGreetingFallback

  return (
    <section
      id="scrisoarea"
      aria-labelledby="letter-greeting"
      className="on-burgundy relative scroll-mt-0 bg-burgundy px-6 pt-20 pb-24 text-ivory sm:px-10 sm:pt-28 sm:pb-32"
    >
      <BurgundyBackdrop />

      <div className="relative mx-auto flex max-w-2xl flex-col gap-10">
        <Reveal>
          <SectionLabel numeral="I" tone="burgundy">
            Invitația
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 id="letter-greeting" className="font-serif text-4xl italic leading-tight text-balance sm:text-5xl">
            {greeting}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6 font-serif text-xl leading-relaxed text-ivory/95 sm:text-2xl sm:leading-relaxed">
          {copy.letterParagraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.15 + index * 0.1} as="p" className="text-pretty">
              {paragraph}
            </Reveal>
          ))}
          <Reveal delay={0.35} as="p" className="text-pretty">
            Vă așteptăm{' '}
            <time dateTime={config.date.mainStartsAt} className="italic text-blush">
              {formatLongDate(config.date.mainStartsAt, config).toLocaleLowerCase('ro-RO')}
            </time>
            , să sărbătorim împreună.
          </Reveal>
        </div>

        <Reveal delay={0.4} className="flex flex-col items-end gap-1 self-end text-right">
          <span className="font-serif text-lg italic text-blush">Cu drag,</span>
          <span className="font-serif text-4xl leading-tight sm:text-5xl">
            {couple.partnerOne} <span className="italic text-blush">&amp;</span> {couple.partnerTwo}
          </span>
        </Reveal>

        {features.family && family && (
          <Reveal delay={0.2} className="flex flex-col items-center gap-8 pt-8 text-center">
            <Filigree />
            <dl className="grid w-full gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <dt className="small-caps text-blush">Alături de părinții</dt>
                {family.parents.map((parent) => (
                  <dd key={parent} className="font-serif text-xl">
                    {parent}
                  </dd>
                ))}
              </div>
              {family.godparents && (
                <div className="flex flex-col gap-2">
                  <dt className="small-caps text-blush">Și de nașii</dt>
                  <dd className="font-serif text-xl">{family.godparents}</dd>
                </div>
              )}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  )
}
