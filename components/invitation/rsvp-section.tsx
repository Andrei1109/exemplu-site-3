import type { InvitationConfig } from '@/lib/invitation-config'
import { formatDayMonthYear } from '@/lib/invitation-utils'
import { BurgundyBackdrop } from './burgundy-backdrop'
import { Filigree, SectionLabel } from './ornaments'
import { Reveal } from './reveal'
import { RSVPForm } from './rsvp-form'

export function RSVPSection({
  config,
  guestName,
  isClosed,
}: {
  config: InvitationConfig
  guestName: string | null
  isClosed: boolean
}) {
  const deadline = formatDayMonthYear(config.rsvp.deadline, config)

  return (
    <section
      id="confirmare"
      aria-labelledby="rsvp-title"
      className="on-burgundy relative bg-burgundy px-4 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-32"
    >
      <BurgundyBackdrop florals="all" />

      <Reveal className="relative mx-auto max-w-2xl">
        {/* The response card, slid out of the envelope */}
        <div className="paper flex flex-col gap-10 border border-gold bg-ivory px-5 py-12 text-burgundy outline outline-1 -outline-offset-8 outline-gold/50 sm:px-14 sm:py-16">
          <div className="flex flex-col items-center gap-5 text-center">
            <SectionLabel numeral="V">Confirmarea</SectionLabel>
            <h2 id="rsvp-title" className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
              {isClosed ? 'Confirmările s-au încheiat' : 'Ne bucurăm să vă avem alături'}
            </h2>
            <p className="max-w-md leading-relaxed text-wine text-pretty">
              {isClosed ? (
                <>
                  Termenul de confirmare a fost <time dateTime={config.rsvp.deadline}>{deadline}</time>. Dacă doriți să
                  ne transmiteți ceva, vă rugăm să ne contactați direct.
                </>
              ) : (
                <>
                  Vă rugăm să ne confirmați prezența până la{' '}
                  <time dateTime={config.rsvp.deadline} className="font-serif text-lg italic text-burgundy">
                    {deadline}
                  </time>
                  .
                </>
              )}
            </p>
            <Filigree />
          </div>

          {!isClosed && (
            <RSVPForm
              eventId={config.event.id}
              endpoint={config.rsvp.endpoint}
              maxCompanions={config.rsvp.maxCompanions}
              defaultName={guestName ?? ''}
            />
          )}
        </div>
      </Reveal>
    </section>
  )
}
