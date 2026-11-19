import { useEffect } from 'react'
import { X } from 'lucide-react'
import { writing } from '../data/portfolio'

const { article } = writing

export default function ArticleModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

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
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/85 p-0 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onClick={() => onClose?.()}
    >
      <div
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className="card relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-ink/90 px-6 py-4 backdrop-blur-xl md:px-10">
          <span className="mono-label">{article.publication}</span>
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close article"
            className="grid size-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <article className="px-6 py-9 md:px-10 md:py-12">
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)] text-white">
            {article.title}
          </h2>
          <p className="mono-label mt-4 text-white/35">
            {article.publisher} · {article.byline}
          </p>

          <div className="mt-10 space-y-11">
            {article.sections.map((section, index) => (
              <section key={section.heading} id={`article-section-${index + 1}`}>
                <div className="flex items-baseline gap-4">
                  <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-medium text-white md:text-xl">
                    {section.heading}
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-relaxed text-white/65 md:text-[15px] md:leading-[1.75]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 space-y-2.5 border-l border-white/10 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-white/55">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="hairline mt-12 pt-6">
            <p className="mono-label text-white/30">
              Published in {article.publication} — {article.publisher}
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}
