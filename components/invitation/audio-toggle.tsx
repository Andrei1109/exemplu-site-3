'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

/** Never autoplays — the guest decides. Hidden entirely if the file can't be played. */
export function AudioToggle({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  if (unavailable) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setUnavailable(true)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setUnavailable(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Oprește ${title}` : `Pornește ${title}`}
        className="flex size-12 items-center justify-center rounded-full border border-gold bg-ivory/95 text-burgundy shadow-[0_8px_24px_-12px_rgba(103,45,62,0.5)] backdrop-blur transition-colors hover:bg-burgundy hover:text-ivory"
      >
        {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="ml-0.5 size-4" />}
      </button>
    </div>
  )
}
