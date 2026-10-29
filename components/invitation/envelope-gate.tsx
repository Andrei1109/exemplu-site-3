'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BurgundyBackdrop } from './burgundy-backdrop'

type Phase = 'sealed' | 'opening' | 'open'

const ease = [0.65, 0, 0.35, 1] as const

export function EnvelopeGate({
  enabled,
  monogram,
  names,
  guestName,
  children,
}: {
  enabled: boolean
  monogram: string
  names: string
  guestName: string | null
  children: React.ReactNode
}) {
  const [phase, setPhase] = useState<Phase>(enabled ? 'sealed' : 'open')
  const reduce = useReducedMotion()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (phase === 'open') return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    buttonRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [phase])

  const finish = () => {
    setPhase('open')
    window.scrollTo({ top: 0 })
    requestAnimationFrame(() => document.getElementById('hero-title')?.focus({ preventScroll: true }))
  }

  const opening = phase === 'opening'
  const t = (seconds: number) => (reduce ? 0 : seconds)

  return (
    <>
      {phase !== 'open' && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="envelope-title"
          className="envelope-gate on-burgundy fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 overflow-hidden bg-burgundy px-6 text-ivory"
          initial={false}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: reduce ? 0.35 : 0.7, delay: t(1.55), ease }}
          onAnimationComplete={() => {
            if (opening) finish()
          }}
        >
          <BurgundyBackdrop florals="all" />

          <motion.p
            id="envelope-title"
            className="relative text-center font-serif text-2xl italic text-balance sm:text-3xl"
            animate={{ opacity: opening ? 0 : 1, y: opening && !reduce ? -12 : 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {guestName ? `O scrisoare pentru ${guestName}` : 'O scrisoare pentru voi'}
          </motion.p>

          <div className="relative aspect-[7/5] w-full max-w-sm shadow-[0_30px_60px_-20px_rgba(20,5,10,0.6)] [perspective:1200px] sm:max-w-md">
            {/* Envelope interior */}
            <div className="absolute inset-0 bg-blush" />

            {/* The letter, which rises out of the pocket */}
            <motion.div
              className="paper absolute inset-x-[6%] top-[6%] bottom-[4%] z-10 flex flex-col items-center justify-start gap-2 border border-gold/60 bg-ivory px-4 pt-[10%] text-center text-burgundy"
              animate={{ y: opening && !reduce ? '-46%' : '0%' }}
              transition={{ duration: 0.8, delay: t(0.6), ease }}
            >
              <span className="small-caps text-wine">Invitație de nuntă</span>
              <span className="font-serif text-3xl leading-tight sm:text-4xl">{names}</span>
            </motion.div>

            {/* Front pocket */}
            <div
              className="absolute inset-0 z-20 bg-ivory [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <polyline
                  points="0,0 50,56 100,0"
                  fill="none"
                  className="stroke-gold"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <rect x="0" y="0" width="100" height="100" fill="none" className="stroke-gold/60" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
              <img
                src="/invitation/florals-corner.png"
                alt=""
                className="absolute bottom-0 left-0 w-[62%] -scale-y-100"
              />
              <img
                src="/invitation/florals-corner.png"
                alt=""
                className="absolute right-0 bottom-0 w-[44%] -scale-100 opacity-90"
              />
            </div>

            {/* Flap */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[60%] origin-top drop-shadow-[0_6px_6px_rgba(64,20,32,0.25)]"
              style={{ transformStyle: 'preserve-3d', zIndex: 30 }}
              animate={
                opening
                  ? { rotateX: reduce ? 0 : 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{
                rotateX: { duration: 0.75, ease },
                zIndex: { duration: 0, delay: t(0.38) },
              }}
            >
              <div className="h-full w-full bg-ivory [clip-path:polygon(0_0,100%_0,50%_100%)]">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                  <polyline
                    points="0,0 50,100 100,0"
                    fill="none"
                    className="stroke-gold"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Monogram seal — a fine ring, not a wax imitation */}
            <motion.div
              aria-hidden="true"
              className="absolute top-[60%] left-1/2 z-40 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-burgundy font-serif text-base italic text-ivory outline outline-1 outline-offset-2 outline-gold/70 sm:size-20 sm:text-lg"
              animate={{ opacity: opening ? 0 : 1, scale: opening && !reduce ? 0.85 : 1 }}
              transition={{ duration: 0.35, ease }}
            >
              {monogram}
            </motion.div>
          </div>

          <motion.button
            ref={buttonRef}
            type="button"
            onClick={() => setPhase('opening')}
            disabled={opening}
            className="small-caps relative min-h-12 border border-gold bg-burgundy/60 px-8 py-3 text-ivory outline outline-1 outline-offset-4 outline-gold/40 backdrop-blur-sm transition-colors hover:bg-ivory hover:text-burgundy disabled:pointer-events-none"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            Deschide invitația
          </motion.button>
        </motion.div>
      )}

      <noscript>
        <style>{'.envelope-gate{display:none!important}html{overflow:auto!important}'}</style>
      </noscript>

      <div inert={phase !== 'open'}>{children}</div>
    </>
  )
}
