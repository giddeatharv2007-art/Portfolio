import { ArrowRight, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile as fallbackProfile } from '../data/portfolio'

export default function Hero({
  profile = fallbackProfile,
  isSupabaseLive = false,
  onNavigate,
  onResume,
}) {
  const [portraitSrc, setPortraitSrc] = useState(
    profile.heroImage || profile.localHeroImage || null,
  )

  useEffect(() => {
    setPortraitSrc(profile.heroImage || profile.localHeroImage || null)
  }, [profile.heroImage, profile.localHeroImage])

  return (
    <section
      id="home"
      data-supabase-live={isSupabaseLive}
      className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-reveal>
          <p className="mono-label max-w-md">{profile.tagline}</p>
          <span className="mono-label whitespace-nowrap">Portfolio — Vol. 01 / 2026</span>
        </div>

        <div className="mt-10 flex flex-col items-center md:mt-14">
          <h1
            data-reveal
            className="display text-center text-[clamp(2.75rem,16vw,11rem)] text-white"
          >
            {profile.firstName}
          </h1>

          <div className="mt-4 flex w-full flex-col items-center gap-6 md:mt-6">
            {/* Local portrait fallback is bundled from src/assets/hero-portrait.jpeg. */}
            <div className="relative w-full max-w-[240px] shrink-0 md:max-w-[280px]" data-reveal>
              <div
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl"
              >
                <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.07]" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.16),transparent_62%)]"
                />
                <div
                  aria-hidden="true"
                  className="grid-lines absolute inset-0 opacity-60"
                />

                {portraitSrc ? (
                  <img
                    src={portraitSrc}
                    alt={profile.name}
                    onError={() => {
                      setPortraitSrc((current) =>
                        current !== profile.localHeroImage
                          ? profile.localHeroImage || null
                          : null,
                      )
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="display text-[clamp(3.5rem,13vw,5.5rem)] text-white/15">
                      {profile.initials}
                    </span>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
                />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
                  <span className="mono-tag text-white/35">Portrait</span>
                  <span className="mono-tag text-white/35">AG / 26</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-sm">
                  <p className="mono-tag text-white/55">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="mono-tag mt-1 text-white/25">B.Tech CSE — SY</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2" data-reveal>
              {profile.techStrip.map((tech) => (
                <span
                  key={tech}
                  className="mono-tag rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <h1
            data-reveal
            className="display mt-4 text-center text-[clamp(2.75rem,16vw,11rem)] text-white md:mt-6"
          >
            {profile.lastName}
          </h1>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-16" data-reveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.('projects')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <FileText className="size-4" />
              Resume
            </button>
          </div>

          <div className="hairline flex w-full flex-wrap items-center justify-between gap-3 pt-6">
            <span className="mono-tag text-white/35">{profile.location}</span>
            <span className="mono-tag text-white/35">{profile.status}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
