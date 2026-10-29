'use client'

import { CalendarPlus } from 'lucide-react'
import type { InvitationConfig } from '@/lib/invitation-config'

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeICS(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function AddToCalendar({ config }: { config: InvitationConfig }) {
  const handleClick = () => {
    const { couple, ceremony, reception, event } = config
    const stamp = toICSDate(new Date().toISOString())
    const toEvent = (moment: typeof ceremony) =>
      [
        'BEGIN:VEVENT',
        `UID:${event.id}-${moment.id}@palfi.events`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toICSDate(moment.startsAt)}`,
        moment.endsAt ? `DTEND:${toICSDate(moment.endsAt)}` : '',
        `SUMMARY:${escapeICS(`${moment.label} — ${couple.partnerOne} & ${couple.partnerTwo}`)}`,
        `LOCATION:${escapeICS([moment.venue.name, moment.venue.address, moment.venue.city].filter(Boolean).join(', '))}`,
        'END:VEVENT',
      ]
        .filter(Boolean)
        .join('\r\n')

    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Palfi Events//Invitatie//RO', toEvent(ceremony), toEvent(reception), 'END:VCALENDAR'].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.slug}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="small-caps inline-flex min-h-12 items-center gap-3 border border-gold px-6 py-3 text-ivory transition-colors hover:bg-ivory hover:text-burgundy"
    >
      <CalendarPlus aria-hidden="true" className="size-4" />
      Adaugă în calendar
    </button>
  )
}
