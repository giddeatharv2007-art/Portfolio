import { ArrowUpRight, Quote } from 'lucide-react'
import { writing } from '../data/portfolio'

export default function Writing({ onReadArticle }) {
  const { article } = writing

  return (
    <section id="writing" className="shell scroll-mt-20 py-20 md:py-28">
      <div className="flex items-baseline gap-4" data-reveal>
        <span className="mono-label">{writing.index} /</span>
        <span className="mono-label">{writing.label}</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <article className="card relative overflow-hidden rounded-2xl p-7 md:p-10" data-reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="mono-tag rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/70">
              {article.publication}
            </span>
            <span className="mono-label">{article.byline}</span>
          </div>

          <h2 className="display mt-8 text-[clamp(1.75rem,5vw,2.75rem)] text-white">
            “{article.title}”
          </h2>

          <p className="mono-label mt-4 text-white/35">{article.publisher}</p>

          <Quote
            aria-hidden="true"
            className="mt-8 size-5 text-white/25"
            strokeWidth={1.5}
          />

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[15px]">
            {article.excerpt}
          </p>

          <div className="hairline mt-9 flex flex-wrap items-center gap-4 pt-7">
            <button
              type="button"
              onClick={onReadArticle}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              Read Full Article
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <span className="mono-tag text-white/30">
              {article.sections.length} sections · TECHNOVA Vol. 2
            </span>
          </div>
        </article>

        <div className="lg:pt-2" data-reveal>
          <p className="mono-label">Contents</p>
          <ol className="hairline mt-5 border-b border-white/10">
            {article.sections.map((section, index) => (
              <li
                key={section.heading}
                className="flex items-baseline gap-4 border-b border-white/8 py-3.5 last:border-b-0"
              >
                <span className="mono-tag text-white/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/65">{section.heading}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
