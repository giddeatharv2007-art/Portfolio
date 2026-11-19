import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, X } from 'lucide-react'
import { demoScenes } from '../data/portfolio'

const DURATION = 15000

const formatClock = (ms) => `${String(Math.floor(ms / 1000)).padStart(2, '0')}s`

/**
 * 15-second simulated walkthrough player (Play / Pause / Restart + progress bar)
 * for the EduNexus flagship flow:
 * Student Skill Map → Personalized Learning Path → Industry–Academia Portal.
 *
 * To use a real screen recording instead of the simulated player, drop
 * `edunexus-demo.mp4` (or `.gif`) into `public/` and replace the
 * <div data-simulated-stage> block below with:
 *
 *   <video src="/edunexus-demo.mp4" autoPlay muted loop playsInline
 *          className="h-full w-full object-cover" />
 */
export default function ProjectDemoModal({ project, onClose }) {
  const scenes = useMemo(() => (project ? demoScenes[project.slug] ?? [] : []), [project])
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const elapsedRef = useRef(0)

  /* Reset the timeline whenever a new project is opened. */
  useEffect(() => {
    if (!project) return
    elapsedRef.current = 0
    setElapsed(0)
    setPlaying(true)
  }, [project])

  /* rAF timeline — the only thing that owns `elapsed` while playing. */
  useEffect(() => {
    if (!project || !playing) return

    let rafId = 0
    let last = performance.now()

    const tick = (now) => {
      const delta = now - last
      last = now

      const next = Math.min(DURATION, elapsedRef.current + delta)
      elapsedRef.current = next
      setElapsed(next)

      if (next >= DURATION) {
        setPlaying(false)
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [project, playing])

  /* Scroll lock + Escape to close. */
  useEffect(() => {
    if (!project) return

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.documentElement.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project || scenes.length === 0) return null

  const sceneCount = scenes.length
  const sceneDuration = DURATION / sceneCount
  const sceneIndex = Math.min(sceneCount - 1, Math.floor(elapsed / sceneDuration))
  const activeScene = scenes[sceneIndex]
  const localProgress = Math.min(1, (elapsed - sceneIndex * sceneDuration) / sceneDuration)
  const overall = elapsed / DURATION

  const restart = () => {
    elapsedRef.current = 0
    setElapsed(0)
    setPlaying(true)
  }

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/85 p-3 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 15 second demo`}
      onClick={() => onClose?.()}
    >
      <div
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className="card relative w-full max-w-3xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="mono-label">15s Walkthrough</p>
            <h3 className="mt-1 truncate text-sm font-medium text-white">{project.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="mono-tag hidden text-white/35 sm:block">
              {formatClock(elapsed)} / 15s
            </span>
            <button
              type="button"
              onClick={() => onClose?.()}
              aria-label="Close demo"
              className="grid size-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* ---- stage ---- */}
        <div
          data-simulated-stage
          className="relative aspect-16/10 w-full overflow-hidden bg-gradient-to-b from-surface-2 to-ink"
        >
          <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.05]" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/8 px-5 py-3">
            <span className="mono-tag text-white/45">
              {String(sceneIndex + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')} —{' '}
              {activeScene.label}
            </span>
            <span className="mono-tag text-white/25">EduNexus</span>
          </div>

          <div className="flex h-full items-center justify-center px-5 pt-12 pb-16">
            {activeScene.key === 'skill-map' && (
              <div className="w-full max-w-md space-y-4">
                {activeScene.metrics.map((metric, index) => {
                  const reveal = Math.max(0, Math.min(1, localProgress * 1.8 - index * 0.12))
                  return (
                    <div key={metric.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="mono-tag text-white/60">{metric.name}</span>
                        <span className="mono-tag text-white/35">
                          {Math.round(metric.value * reveal)}%
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10">
                        <div
                          className="h-1 bg-white transition-[width] duration-150 ease-out"
                          style={{ width: `${metric.value * reveal}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeScene.key === 'learning-path' && (
              <ol className="w-full max-w-md space-y-3">
                {activeScene.steps.map((step, index) => {
                  const revealed = localProgress > index * 0.22
                  return (
                    <li
                      key={step}
                      className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-500 ${
                        revealed
                          ? 'border-white/20 bg-white/[0.06] opacity-100 translate-y-0'
                          : 'border-white/8 bg-white/[0.02] opacity-30 translate-y-2'
                      }`}
                    >
                      <span className="mono-tag text-white/35">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-white/80">{step}</span>
                    </li>
                  )
                })}
              </ol>
            )}

            {activeScene.key === 'industry-portal' && (
              <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
                {activeScene.cards.map((card, index) => {
                  const revealed = localProgress > index * 0.2
                  return (
                    <div
                      key={card.title}
                      className={`rounded-xl border p-4 transition-all duration-500 ${
                        revealed
                          ? 'border-white/20 bg-white/[0.06] opacity-100 translate-y-0'
                          : 'border-white/8 bg-white/[0.02] opacity-30 translate-y-3'
                      }`}
                    >
                      <span className="mono-label">0{index + 1}</span>
                      <p className="mt-3 text-sm text-white">{card.title}</p>
                      <p className="mono-tag mt-1.5 text-white/35">{card.meta}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <p className="absolute inset-x-0 bottom-12 px-5 text-center text-xs text-white/45 md:text-sm">
            {activeScene.caption}
          </p>

          {/* scene segment markers */}
          <div className="absolute inset-x-5 bottom-4 flex gap-2">
            {scenes.map((scene, index) => (
              <div
                key={scene.key}
                className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/12"
              >
                <div
                  className="h-0.5 rounded-full bg-white"
                  style={{
                    width: `${
                      index < sceneIndex ? 100 : index === sceneIndex ? localProgress * 100 : 0
                    }%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---- controls ---- */}
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause demo' : 'Play demo'}
            className="grid size-9 place-items-center rounded-full bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>

          <button
            type="button"
            onClick={restart}
            aria-label="Restart demo"
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <RotateCcw className="size-4" />
          </button>

          <div className="h-px min-w-[6rem] flex-1 overflow-hidden bg-white/12">
            <div
              className="h-px bg-white"
              style={{ width: `${overall * 100}%` }}
            />
          </div>

          <span className="mono-tag text-white/35">{Math.round(overall * 100)}%</span>
        </div>
      </div>
    </div>
  )
}
