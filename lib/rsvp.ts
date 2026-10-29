export type Attendance = 'accept' | 'decline'

export type RSVPPayload = {
  eventId: string
  guestName: string
  attendance: Attendance
  companions: number
  dietary: string
  message: string
}

export type RSVPResult = { status: 'saved' } | { status: 'demo' }

export type RSVPErrors = Partial<Record<'guestName' | 'attendance' | 'companions' | 'dietary' | 'message', string>>

export const RSVP_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  dietaryMax: 200,
  messageMax: 500,
} as const

export function validateRSVP(
  input: Omit<RSVPPayload, 'eventId' | 'attendance'> & { attendance: Attendance | null },
  maxCompanions: number,
): RSVPErrors {
  const errors: RSVPErrors = {}
  const name = input.guestName.trim()

  if (name.length < RSVP_LIMITS.nameMin) {
    errors.guestName = 'Vă rugăm să ne spuneți numele dumneavoastră.'
  } else if (name.length > RSVP_LIMITS.nameMax) {
    errors.guestName = `Numele poate avea cel mult ${RSVP_LIMITS.nameMax} de caractere.`
  }

  if (!input.attendance) {
    errors.attendance = 'Vă rugăm să alegeți dacă veți fi prezent(ă).'
  }

  if (input.attendance === 'accept') {
    if (!Number.isInteger(input.companions) || input.companions < 0 || input.companions > maxCompanions) {
      errors.companions = `Puteți veni însoțit(ă) de cel mult ${maxCompanions} ${maxCompanions === 1 ? 'persoană' : 'persoane'}.`
    }
    if (input.dietary.trim().length > RSVP_LIMITS.dietaryMax) {
      errors.dietary = `Vă rugăm să rezumați în cel mult ${RSVP_LIMITS.dietaryMax} de caractere.`
    }
  }

  if (input.message.trim().length > RSVP_LIMITS.messageMax) {
    errors.message = `Mesajul poate avea cel mult ${RSVP_LIMITS.messageMax} de caractere.`
  }

  return errors
}

/**
 * Integration point for Palfi Events.
 * With an endpoint: POSTs JSON and resolves `{ status: 'saved' }` only on a 2xx response.
 * Without an endpoint: resolves `{ status: 'demo' }` — nothing is stored or transmitted.
 */
export async function submitRSVP(payload: RSVPPayload, endpoint: string | null): Promise<RSVPResult> {
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { status: 'demo' }
  }

  const body: RSVPPayload = {
    ...payload,
    guestName: payload.guestName.trim(),
    companions: payload.attendance === 'accept' ? payload.companions : 0,
    dietary: payload.attendance === 'accept' ? payload.dietary.trim() : '',
    message: payload.message.trim(),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    throw new Error(`RSVP request failed with status ${response.status}`)
  }

  return { status: 'saved' }
}
