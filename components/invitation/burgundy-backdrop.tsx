import { cn } from '@/lib/utils'

const FLORALS = '/invitation/florals-corner.png'

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn('absolute size-7 text-gold sm:size-9', className)}>
      <path d="M2 38V14C2 7 7 2 14 2h24" stroke="currentColor" strokeWidth="0.75" />
      <path d="M8 38V18c0-6 4-10 10-10h20" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M14 14l4-4 4 4-4 4-4-4Z" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

/**
 * Decorative layer for burgundy sections: tonal damask, edge depth,
 * a gold double frame and watercolor florals in opposite corners.
 */
export function BurgundyBackdrop({
  florals = 'diagonal',
  framed = true,
}: {
  florals?: 'diagonal' | 'all' | 'none'
  framed?: boolean
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="damask absolute inset-0" />
      <div className="velvet-depth absolute inset-0" />

      {framed && (
        <div className="absolute inset-3 border border-gold/50 sm:inset-6">
          <div className="absolute inset-1.5 border border-gold/25" />
          <CornerOrnament className="-top-px -left-px" />
          <CornerOrnament className="-top-px -right-px -scale-x-100" />
          <CornerOrnament className="-bottom-px -left-px -scale-y-100" />
          <CornerOrnament className="-right-px -bottom-px -scale-100" />
        </div>
      )}

      {florals !== 'none' && (
        <>
          <img src={FLORALS} alt="" className="floral-glow absolute -top-2 -left-4 w-52 sm:w-80 lg:w-[26rem]" />
          <img
            src={FLORALS}
            alt=""
            className="floral-glow absolute -right-4 -bottom-2 w-52 -scale-100 sm:w-80 lg:w-[26rem]"
          />
        </>
      )}
      {florals === 'all' && (
        <>
          <img
            src={FLORALS}
            alt=""
            className="floral-glow absolute -top-2 -right-4 hidden w-80 -scale-x-100 md:block lg:w-[26rem]"
          />
          <img
            src={FLORALS}
            alt=""
            className="floral-glow absolute -bottom-2 -left-4 hidden w-80 -scale-y-100 md:block lg:w-[26rem]"
          />
        </>
      )}
    </div>
  )
}
