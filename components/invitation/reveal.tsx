'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'p'
}) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </Component>
  )
}

/**
 * Painted florals revealed like a brushstroke drying across the paper.
 * Images that fail to load disappear entirely — the layout never depends on them.
 */
export function FloralReveal({
  src,
  alt = '',
  className,
  imgClassName,
  direction = 'left',
  delay = 0,
  eager = false,
}: {
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  direction?: 'left' | 'right'
  delay?: number
  eager?: boolean
}) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  // Observe the unclipped wrapper: a fully clipped element never reports as intersecting.
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapperRef, { once: true, amount: 0.15 })
  if (!src || failed) return null

  const hidden = direction === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'

  return (
    <div ref={wrapperRef} aria-hidden={alt ? undefined : true} className={cn('pointer-events-none', className)}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { clipPath: hidden, opacity: 0.4 }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : undefined}
        transition={{ duration: reduce ? 0.4 : 1.8, delay: reduce ? 0 : delay, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- plain img allows a graceful onError fallback */}
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('h-auto w-full select-none', imgClassName)}
        />
      </motion.div>
    </div>
  )
}
