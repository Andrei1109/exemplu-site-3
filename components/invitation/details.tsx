import { ArrowUpRight } from 'lucide-react'
import type { EventMoment, InvitationConfig } from '@/lib/invitation-config'
import { buildMapsUrl, formatLongDate, formatTime } from '@/lib/invitation-utils'
import { AddToCalendar } from './add-to-calendar'
import { BurgundyBackdrop } from './burgundy-backdrop'
import { Countdown } from './countdown'
import { Filigree, SectionLabel } from './ornaments'
import { Reveal } from './reveal'

function Moment({ moment, config }: { moment: EventMoment; config: InvitationConfig }) {
  const time = formatTime(moment.startsAt, config)
  const { venue } = moment

  return (
    <article className="grid items-end gap-4 sm:grid-cols-[auto_1fr] sm:gap-12">
      <p className="font-serif text-[clamp(4.5rem,22vw,9rem)] leading-[0.8] font-normal tabular-nums tracking-tight text-ivory">
        <time dateTime={moment.startsAt}>{time}</time>
      </p>
      <div className="flex flex-col gap-3 sm:pb-2">
        <h3 className="small-caps text-blush">{moment.label}</h3>
        <p className="font-serif text-3xl italic leading-tight text-balance sm:text-4xl">{venue.name}</p>
        {(venue.address || venue.city) && (
          <address className="not-italic leading-relaxed text-ivory/85">
            {[venue.address, venue.city].filter(Boolean).join(', ')}
          </address>
        )}
        <a
          href={buildMapsUrl(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="small-caps mt-2 inline-flex min-h-11 w-fit items-center gap-2 border-b border-gold pb-1 text-ivory transition-colors hover:border-ivory hover:text-blush"
        >
          Indicații de orientare
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">către {venue.name} (se deschide într-o filă nouă)</span>
        </a>
      </div>
    </article>
  )
}

export function Details({ config }: { config: InvitationConfig }) {
  return (
    <section
      aria-labelledby="details-title"
      className="on-burgundy relative bg-burgundy px-6 pt-20 pb-24 text-ivory sm:px-10 sm:pt-28 sm:pb-32"
    >
      <BurgundyBackdrop />

      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 sm:gap-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <SectionLabel numeral="III" tone="burgundy">
              Ziua cea mare
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="details-title" className="font-serif text-4xl leading-tight text-balance sm:text-6xl">
              {formatLongDate(config.date.mainStartsAt, config)}
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <Moment moment={config.ceremony} config={config} />
        </Reveal>

        <Reveal className="flex justify-center">
          <Filigree />
        </Reveal>

        <Reveal>
          <Moment moment={config.reception} config={config} />
        </Reveal>

        <Reveal className="flex justify-center">
          <AddToCalendar config={config} />
        </Reveal>

        {config.features.countdown && (
          <Reveal className="border-t border-gold/50 pt-14">
            <Countdown target={config.date.mainStartsAt} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
