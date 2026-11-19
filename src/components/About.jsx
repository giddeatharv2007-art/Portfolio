import { useEffect, useState } from 'react'
import { about, focusAreas, profile as fallbackProfile } from '../data/portfolio'

export default function About({ profile = fallbackProfile, isSupabaseLive = false }) {
  const [aboutImageAvailable, setAboutImageAvailable] = useState(Boolean(profile.aboutImage))

  useEffect(() => {
    setAboutImageAvailable(Boolean(profile.aboutImage))
  }, [profile.aboutImage])

  const showAboutImage = aboutImageAvailable && Boolean(profile.aboutImage)

  return (
    <section
      id="about"
      data-supabase-live={isSupabaseLive}
      className="shell scroll-mt-20 py-20 md:py-28"
    >
      <div className="flex items-baseline gap-4" data-reveal>
        <span className="mono-label">{about.index} /</span>
        <span className="mono-label">{about.label}</span>
      </div>

      <h2
        data-reveal
        className="display mt-6 max-w-4xl text-[clamp(1.9rem,5.5vw,3.5rem)] text-white"
      >
        {about.title}
      </h2>

      <div
        className={`mt-12 grid gap-8 md:mt-16 md:gap-10 ${
          showAboutImage ? 'md:grid-cols-[1.2fr_0.7fr_1fr]' : 'md:grid-cols-[1.35fr_1fr]'
        }`}
      >
        <div className="space-y-5" data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {showAboutImage && (
          <figure
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl"
            data-reveal
          >
            <img
              src={profile.aboutImage}
              alt={`${profile.name}, portrait`}
              onError={() => setAboutImageAvailable(false)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent"
            />
          </figure>
        )}

        <dl className="hairline divide-y divide-white/10 border-b border-white/10" data-reveal>
          {about.facts.map((fact) => {
            const dynamicValue =
              fact.label === 'Based in'
                ? profile.location
                : fact.label === 'Currently'
                  ? profile.status
                  : fact.value

            return (
              <div key={fact.label} className="flex flex-col gap-1 py-4">
                <dt className="mono-label">{fact.label}</dt>
                <dd className="text-sm text-white/75">{dynamicValue}</dd>
              </div>
            )
          })}
        </dl>
      </div>

      {/* ---- Focus strip: 6 numbered cards ---- */}
      <div className="mt-20 md:mt-28">
        <div className="flex items-baseline justify-between gap-4" data-reveal>
          <span className="mono-label">Focus Strip</span>
          <span className="mono-label">06 areas</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <article
              key={area.index}
              data-reveal
              className="group relative flex min-h-[11rem] flex-col justify-between bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
            >
              <span className="mono-label transition-colors group-hover:text-white/70">
                {area.index}
              </span>
              <div className="mt-8">
                <h3 className="display text-xl text-white md:text-2xl">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{area.note}</p>
              </div>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-500 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
