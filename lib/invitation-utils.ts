import type { InvitationConfig, Venue } from './invitation-config'

export function capitalize(value: string) {
  return value.charAt(0).toLocaleUpperCase('ro-RO') + value.slice(1)
}

export function formatLongDate(iso: string, config: InvitationConfig) {
  const formatted = new Intl.DateTimeFormat(config.event.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: config.event.timeZone,
  }).format(new Date(iso))
  return capitalize(formatted)
}

export function formatDayMonthYear(iso: string, config: InvitationConfig) {
  return new Intl.DateTimeFormat(config.event.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: config.event.timeZone,
  }).format(new Date(iso))
}

export function formatTime(iso: string, config: InvitationConfig) {
  return new Intl.DateTimeFormat(config.event.locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: config.event.timeZone,
  }).format(new Date(iso))
}

export function formatNumericDate(iso: string, config: InvitationConfig) {
  const parts = new Intl.DateTimeFormat(config.event.locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: config.event.timeZone,
  }).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('day')} · ${get('month')} · ${get('year')}`
}

export function buildMapsUrl(venue: Venue) {
  if (venue.mapsUrl) return venue.mapsUrl
  const query = [venue.name, venue.address, venue.city].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Guest names arrive from the personalised link (?invitat=...). Keep them short and plain. */
export function sanitizeGuestName(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (!value) return null
  const cleaned = value.replace(/[<>{}[\]\\/"`]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60)
  return cleaned.length >= 2 ? cleaned : null
}
