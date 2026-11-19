import { Award, GraduationCap, Trophy } from 'lucide-react'
import { journey } from '../data/portfolio'

export default function JourneyAndProofs() {
  const { phases, hackathons, proofs } = journey

  return (
    <section id="proofs" className="shell scroll-mt-20 py-20 md:py-28">
      <div className="flex items-baseline gap-4" data-reveal>
        <span className="mono-label">{journey.index} /</span>
        <span className="mono-label">Journey &amp; Proofs</span>
      </div>

      <h2 className="display mt-6 max-w-3xl text-[clamp(1.9rem,5.5vw,3.5rem)] text-white" data-reveal>
        Academic journey, hackathons and verified credentials.
      </h2>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* ---- journey ---- */}
        <div className="lg:col-span-2">
          <p className="mono-label" data-reveal>
            Journey &amp; Hackathons
          </p>

          <ol className="mt-5 space-y-4">
            {phases.map((phase) => (
              <li key={phase.phase} className="card rounded-2xl p-6 md:p-7" data-reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono-tag rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/70">
                    {phase.phase}
                  </span>
                  <span className="mono-label">{phase.kicker}</span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-white/40" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base font-medium text-white md:text-lg">{phase.title}</h3>
                    <p className="mono-label mt-1.5 text-white/35">{phase.org}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                      {phase.note}
                    </p>
                  </div>
                </div>
              </li>
            ))}

            {hackathons.map((item) => (
              <li
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-surface-2 p-6 md:p-7"
                data-reveal
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.09),transparent_58%)]"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white/85">
                      <Trophy className="size-3.5" strokeWidth={1.5} />
                      {item.badge}
                    </span>
                    <span className="mono-label">{item.date}</span>
                  </div>

                  <h3 className="display mt-6 text-xl text-white md:text-2xl">{item.title}</h3>

                  <div className="hairline mt-6 grid gap-4 pt-4 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <div className="flex items-center gap-2">
                      <Award className="size-4 text-white/40" strokeWidth={1.5} />
                      <span className="text-sm text-white/75">{item.award}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/45">{item.org}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ---- verified proofs ---- */}
        <div>
          <div className="flex items-baseline justify-between gap-4" data-reveal>
            <p className="mono-label">Verified Proofs</p>
            <span className="mono-label">04</span>
          </div>

          <div className="mt-5 space-y-4">
            {proofs.map((proof) => (
              <article key={proof.index} className="card rounded-2xl p-6" data-reveal>
                <div className="flex items-start justify-between gap-4">
                  <span className="mono-label">{proof.index}</span>
                  <span className="mono-tag rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-white/60">
                    {proof.highlight}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-medium text-white">{proof.title}</h3>
                <p className="mono-label mt-2 text-white/40">{proof.issuer}</p>
                <p className="mono-tag mt-1 text-white/25">{proof.date}</p>

                <ul className="mt-5 space-y-2 border-t border-white/8 pt-4">
                  {proof.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-xs leading-relaxed text-white/50">
                      <span aria-hidden="true" className="text-white/20">
                        —
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
