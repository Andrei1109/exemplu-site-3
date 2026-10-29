'use client'

import { Check, Loader2, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { RSVP_LIMITS, submitRSVP, validateRSVP, type Attendance, type RSVPErrors, type RSVPResult } from '@/lib/rsvp'

type Status = { kind: 'idle' } | { kind: 'pending' } | { kind: 'done'; result: RSVPResult; name: string; attendance: Attendance } | { kind: 'error' }

const fieldOrder = ['guestName', 'attendance', 'companions', 'dietary', 'message'] as const

const inputClass =
  'w-full border border-gold bg-ivory px-4 py-3 text-base text-burgundy placeholder:text-wine/60 transition-colors focus-visible:border-wine focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-wine aria-[invalid=true]:border-destructive'

function companionLabel(count: number) {
  if (count === 0) return 'Doar eu'
  return `Eu + ${count}`
}

export function RSVPForm({
  eventId,
  endpoint,
  maxCompanions,
  defaultName,
}: {
  eventId: string
  endpoint: string | null
  maxCompanions: number
  defaultName: string
}) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const [guestName, setGuestName] = useState(defaultName)
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [companions, setCompanions] = useState(0)
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<RSVPErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const isDemo = !endpoint
  const pending = status.kind === 'pending'
  const companionOptions = Array.from({ length: maxCompanions + 1 }, (_, i) => i)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending) return

    const nextErrors = validateRSVP({ guestName, attendance, companions, dietary, message }, maxCompanions)
    setErrors(nextErrors)
    const firstInvalid = fieldOrder.find((key) => nextErrors[key])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus({ kind: 'pending' })
    try {
      const result = await submitRSVP(
        { eventId, guestName, attendance: attendance as Attendance, companions, dietary, message },
        endpoint,
      )
      setStatus({ kind: 'done', result, name: guestName.trim(), attendance: attendance as Attendance })
    } catch {
      setStatus({ kind: 'error' })
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  if (status.kind === 'done') {
    const accepted = status.attendance === 'accept'
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-center gap-5 py-6 text-center outline-none">
        {status.result.status === 'demo' && (
          <p className="small-caps border border-wine px-3 py-1.5 text-wine">Mod demonstrativ</p>
        )}
        <p className="font-serif text-4xl italic leading-tight text-burgundy text-balance">
          {accepted ? `Mulțumim, ${status.name}!` : `Vă mulțumim, ${status.name}.`}
        </p>
        <p className="max-w-md leading-relaxed text-wine text-pretty">
          {status.result.status === 'demo'
            ? 'Răspunsul a fost verificat, dar nu a fost salvat și nici trimis — formularul nu este încă conectat la serviciul de confirmări.'
            : accepted
              ? 'Răspunsul dumneavoastră a fost înregistrat. Abia așteptăm să sărbătorim împreună.'
              : 'Răspunsul dumneavoastră a fost înregistrat. Ne va fi dor de dumneavoastră și vă purtăm în gând.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="small-caps mt-2 min-h-11 border-b border-gold pb-1 text-burgundy hover:border-burgundy"
        >
          Modifică răspunsul
        </button>
      </div>
    )
  }

  const errorList = fieldOrder.filter((key) => errors[key])

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8" aria-describedby={id('privacy')}>
      {errorList.length > 1 && (
        <div role="alert" className="border border-destructive/50 bg-blush/30 px-4 py-3 text-sm leading-relaxed text-destructive">
          Vă rugăm să verificați câmpurile marcate mai jos.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor={id('name')} className="small-caps text-burgundy">
          Numele dumneavoastră
        </label>
        <input
          id={id('name')}
          data-field="guestName"
          name="guestName"
          type="text"
          autoComplete="name"
          required
          maxLength={RSVP_LIMITS.nameMax}
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          aria-invalid={Boolean(errors.guestName)}
          aria-describedby={errors.guestName ? id('name-error') : undefined}
          className={cn(inputClass, 'font-serif text-xl')}
          placeholder="Prenume și nume"
        />
        {errors.guestName && (
          <p id={id('name-error')} className="text-sm text-destructive">
            {errors.guestName}
          </p>
        )}
      </div>

      <fieldset
        className="flex flex-col gap-3"
        aria-invalid={Boolean(errors.attendance)}
        aria-describedby={errors.attendance ? id('attendance-error') : undefined}
      >
        <legend className="small-caps mb-3 text-burgundy">Veți fi alături de noi?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: 'accept', title: 'Da, cu mare drag', note: 'Voi fi prezent(ă)', Icon: Check },
              { value: 'decline', title: 'Din păcate, nu', note: 'Nu voi putea participa', Icon: X },
            ] as const
          ).map(({ value, title, note, Icon }, index) => {
            const checked = attendance === value
            return (
              <label
                key={value}
                className={cn(
                  'group relative flex min-h-20 cursor-pointer items-center gap-4 border px-4 py-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-wine',
                  value === 'accept'
                    ? checked
                      ? 'border-burgundy bg-burgundy text-ivory'
                      : 'border-gold bg-ivory text-burgundy hover:border-burgundy'
                    : checked
                      ? 'border-wine border-dashed bg-blush/50 text-burgundy'
                      : 'border-gold bg-ivory text-burgundy hover:border-wine',
                )}
              >
                <input
                  type="radio"
                  name="attendance"
                  value={value}
                  checked={checked}
                  onChange={() => setAttendance(value)}
                  data-field={index === 0 ? 'attendance' : undefined}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full border',
                    value === 'accept'
                      ? checked
                        ? 'border-ivory bg-ivory text-burgundy'
                        : 'border-gold text-transparent group-hover:text-gold'
                      : checked
                        ? 'border-wine text-wine'
                        : 'border-gold text-transparent group-hover:text-gold',
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="font-serif text-xl leading-tight">{title}</span>
                  <span className={cn('text-sm', value === 'accept' && checked ? 'text-blush' : 'text-wine')}>{note}</span>
                </span>
              </label>
            )
          })}
        </div>
        {errors.attendance && (
          <p id={id('attendance-error')} className="text-sm text-destructive">
            {errors.attendance}
          </p>
        )}
      </fieldset>

      {attendance === 'accept' && (
        <>
          <fieldset
            className="flex flex-col gap-3"
            aria-describedby={[id('companions-hint'), errors.companions ? id('companions-error') : ''].filter(Boolean).join(' ')}
          >
            <legend className="small-caps mb-3 text-burgundy">Câte persoane veți fi?</legend>
            <div className="flex flex-wrap gap-2">
              {companionOptions.map((count, index) => {
                const checked = companions === count
                return (
                  <label
                    key={count}
                    className={cn(
                      'flex min-h-11 min-w-24 cursor-pointer items-center justify-center border px-4 py-2 font-serif text-lg transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-wine',
                      checked ? 'border-burgundy bg-burgundy text-ivory' : 'border-gold bg-ivory text-burgundy hover:border-burgundy',
                    )}
                  >
                    <input
                      type="radio"
                      name="companions"
                      value={count}
                      checked={checked}
                      onChange={() => setCompanions(count)}
                      data-field={index === 0 ? 'companions' : undefined}
                      className="sr-only"
                    />
                    {companionLabel(count)}
                  </label>
                )
              })}
            </div>
            <p id={id('companions-hint')} className="text-sm text-wine">
              {`Pe lângă dumneavoastră, puteți fi însoțit(ă) de cel mult ${maxCompanions} ${maxCompanions === 1 ? 'persoană' : 'persoane'}.`}
            </p>
            {errors.companions && (
              <p id={id('companions-error')} className="text-sm text-destructive">
                {errors.companions}
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor={id('dietary')} className="small-caps text-burgundy">
              Preferințe alimentare <span className="tracking-normal normal-case text-wine">(opțional)</span>
            </label>
            <input
              id={id('dietary')}
              data-field="dietary"
              name="dietary"
              type="text"
              maxLength={RSVP_LIMITS.dietaryMax}
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              aria-invalid={Boolean(errors.dietary)}
              aria-describedby={errors.dietary ? id('dietary-error') : undefined}
              placeholder="ex. vegetarian, fără gluten, alergii"
              className={inputClass}
            />
            {errors.dietary && (
              <p id={id('dietary-error')} className="text-sm text-destructive">
                {errors.dietary}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor={id('message')} className="small-caps text-burgundy">
          Un gând pentru miri <span className="tracking-normal normal-case text-wine">(opțional)</span>
        </label>
        <textarea
          id={id('message')}
          data-field="message"
          name="message"
          rows={4}
          maxLength={RSVP_LIMITS.messageMax}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={[id('message-count'), errors.message ? id('message-error') : ''].filter(Boolean).join(' ')}
          className={cn(inputClass, 'resize-y font-serif text-lg leading-relaxed')}
        />
        <p id={id('message-count')} className="self-end text-sm tabular-nums text-wine">
          {message.length} / {RSVP_LIMITS.messageMax}
        </p>
        {errors.message && (
          <p id={id('message-error')} className="text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {isDemo && (
        <p className="border border-dashed border-wine px-4 py-3 text-sm leading-relaxed text-wine">
          <strong className="font-medium">Mod demonstrativ.</strong> Formularul nu este încă conectat la serviciul de
          confirmări Palfi Events, astfel că răspunsurile nu vor fi salvate sau trimise.
        </p>
      )}

      {status.kind === 'error' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-destructive/50 bg-blush/30 px-4 py-3 text-sm leading-relaxed text-destructive outline-none">
          Nu am putut trimite răspunsul. Verificați conexiunea și încercați din nou.
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="small-caps inline-flex min-h-13 w-full items-center justify-center gap-3 bg-burgundy px-8 py-4 text-ivory transition-colors hover:bg-wine disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
          {pending ? 'Se trimite…' : 'Trimite răspunsul'}
        </button>
        <p id={id('privacy')} className="max-w-sm text-center text-sm leading-relaxed text-wine">
          Folosim aceste informații doar pentru organizarea nunții.
        </p>
      </div>
    </form>
  )
}
