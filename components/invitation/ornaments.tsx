import { cn } from '@/lib/utils'

/** Fine line-art filigree: two hairlines meeting a small leaf-and-diamond knot. */
export function Filigree({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      aria-hidden="true"
      className={cn('h-5 w-48 text-gold sm:w-60', className)}
    >
      <path d="M0 12h92" stroke="currentColor" strokeWidth="0.75" />
      <path d="M148 12h92" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M92 12c6-6 12-6 16 0-4 6-10 6-16 0Zm56 0c-6-6-12-6-16 0 4 6 10 6 16 0Z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path d="M120 5l5 7-5 7-5-7 5-7Z" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="120" cy="12" r="1.25" fill="currentColor" />
    </svg>
  )
}

/** A short separator used between timeline entries. */
export function Knot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 12" fill="none" aria-hidden="true" className={cn('h-3 w-14 text-gold', className)}>
      <path d="M0 6h22M38 6h22" stroke="currentColor" strokeWidth="0.75" />
      <path d="M30 1l4 5-4 5-4-5 4-5Z" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

/** Envelope-flap transition: the ivory section above folds down into the burgundy one. */
export function EnvelopeEdge({ className, tone = 'ivory' }: { className?: string; tone?: 'ivory' | 'burgundy' }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 top-0 h-10 sm:h-16', className)}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full">
        <polygon points="0,0 100,0 50,10" className={tone === 'ivory' ? 'fill-ivory' : 'fill-burgundy'} />
        <polyline
          points="0,0 50,10 100,0"
          fill="none"
          className="stroke-gold"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

export type Tone = 'ivory' | 'burgundy'

/** Placed between two sections of different tones: the upper paper folds into the lower one. */
export function Seam({ from, to }: { from: Tone; to: Tone }) {
  return (
    <div aria-hidden="true" className={cn('relative h-10 sm:h-16', to === 'ivory' ? 'paper bg-ivory' : 'bg-burgundy')}>
      <EnvelopeEdge tone={from} className="h-full" />
    </div>
  )
}

export function SectionLabel({
  numeral,
  children,
  tone = 'ivory',
}: {
  numeral: string
  children: React.ReactNode
  tone?: 'ivory' | 'burgundy'
}) {
  return (
    <p
      className={cn(
        'small-caps flex items-center justify-center gap-3',
        tone === 'burgundy' ? 'text-blush' : 'text-wine',
      )}
    >
      <span className="font-serif text-base italic tracking-normal normal-case">{numeral}</span>
      <span aria-hidden="true" className="h-px w-6 bg-gold" />
      <span>{children}</span>
    </p>
  )
}
