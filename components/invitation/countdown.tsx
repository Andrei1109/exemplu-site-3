'use client'

import { useEffect, useState } from 'react'

const units = [
  { key: 'days', one: 'zi', many: 'zile' },
  { key: 'hours', one: 'oră', many: 'ore' },
  { key: 'minutes', one: 'minut', many: 'minute' },
  { key: 'seconds', one: 'secundă', many: 'secunde' },
] as const

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null)
  const targetMs = new Date(target).getTime()

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (now !== null && now >= targetMs) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="small-caps text-blush">Ne-am spus „da”</p>
        <p className="max-w-lg font-serif text-2xl italic leading-snug text-balance sm:text-3xl">
          Vă mulțumim că ați fost alături de noi în cea mai frumoasă zi.
        </p>
      </div>
    )
  }

  const parts = now === null ? null : split(targetMs - now)

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="small-caps text-blush">Până la marea zi</p>
      <dl className="grid w-full max-w-xl grid-cols-4 gap-2 sm:gap-6" aria-live="off">
        {units.map((unit) => {
          const value = parts?.[unit.key]
          return (
            <div key={unit.key} className="flex flex-col-reverse items-center gap-1">
              <dt className="text-sm text-blush">{value === 1 ? unit.one : unit.many}</dt>
              <dd className="font-serif text-4xl tabular-nums sm:text-6xl">
                {value === undefined ? '—' : String(value).padStart(unit.key === 'days' ? 1 : 2, '0')}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
