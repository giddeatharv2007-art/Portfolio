import { useEffect, useRef, useState } from 'react'

const DURATION = 900

/**
 * Fast editorial preloader: 0% → 100% in ~0.9s, then fades out and unmounts
 * from the parent (App) via `onComplete`.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    let rafId = 0
    let timeoutId = 0
    let finished = false
    const startedAt = performance.now()
    const easeOutCubic = (t) => 1 - (1 - t) ** 3

    const tick = (now) => {
      const t = Math.min(1, (now - startedAt) / DURATION)
      setProgress(Math.round(easeOutCubic(t) * 100))

      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      } else if (!finished) {
        finished = true
        setExiting(true)
        timeoutId = window.setTimeout(() => completeRef.current?.(), 420)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6 transition-opacity duration-[420ms] ease-out ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-sm">
        <p className="mono-label">Atharv Gidde // Loading Portfolio</p>

        <div className="mt-6 flex items-end justify-between gap-6">
          <span className="display text-[clamp(3rem,14vw,5rem)] text-white tabular-nums">
            {String(progress).padStart(3, '0')}
          </span>
          <span className="mono-tag mb-3 text-white/40">%</span>
        </div>

        <div className="mt-5 h-px w-full bg-white/12">
          <div
            className="h-px bg-white transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="mono-tag text-white/30">B.Tech CSE</span>
          <span className="mono-tag text-white/30">Pandharpur, IN</span>
        </div>
      </div>
    </div>
  )
}
