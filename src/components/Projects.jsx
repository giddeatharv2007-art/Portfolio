import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink, Play, X } from 'lucide-react'
import {
  demoScenes,
  profile as fallbackProfile,
  projectCategories,
  projects as fallbackProjects,
} from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function ProjectImage({ project }) {
  const [imageSrc, setImageSrc] = useState(project.image_url || project.localImage || null)

  useEffect(() => {
    setImageSrc(project.image_url || project.localImage || null)
  }, [project.image_url, project.localImage])

  if (!imageSrc) return null

  return (
    <div className="-mx-6 -mt-6 mb-6 aspect-video overflow-hidden rounded-t-2xl bg-[#111111]">
      <div className="group relative h-full w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={`${project.title} preview`}
          onError={() => {
            setImageSrc((current) =>
              current !== project.localImage ? project.localImage || null : null,
            )
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/10 to-transparent"
        />
      </div>
    </div>
  )
}

export default function Projects({
  projects: portfolioProjects = fallbackProjects,
  profile = fallbackProfile,
  isSupabaseLive = false,
  onOpenDemo,
}) {
  const items = portfolioProjects
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const gridRef = useRef(null)

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((project) => project.category === filter)),
    [items, filter],
  )

  /* Card reveal — re-runs whenever the visible set changes. */
  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-project-card]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
        },
      )
    }, gridRef)

    return () => ctx.revert()
  }, [visible])

  /* Escape closes the details modal; scrolling behind it is frozen. */
  useEffect(() => {
    if (!active) return

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.documentElement.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  const closeDetails = useCallback(() => setActive(null), [])

  return (
    <section
      id="projects"
      aria-label={`Selected work by ${profile.name}`}
      data-supabase-live={isSupabaseLive}
      className="shell scroll-mt-20 py-20 md:py-28"
    >
      <div className="flex items-baseline gap-4" data-reveal>
        <span className="mono-label">03 /</span>
        <span className="mono-label">Selected Works</span>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display max-w-2xl text-[clamp(1.9rem,5.5vw,3.5rem)] text-white" data-reveal>
          Systems built to survive contact with real users.
        </h2>

        <div className="flex flex-wrap gap-2" data-reveal>
          {projectCategories.map((category) => {
            const selected = filter === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={selected}
                className={`mono-tag rounded-full border px-3.5 py-2 transition-colors ${
                  selected
                    ? 'border-white bg-white text-ink'
                    : 'border-white/12 text-white/55 hover:border-white/35 hover:text-white'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      <div ref={gridRef} className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => {
          const hasDemo = Boolean(demoScenes[project.slug])
          return (
            <article
              key={project.id ?? project.slug}
              data-project-card
              className={`card group relative flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-white/25 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <ProjectImage project={project} />

              <div className="flex items-start justify-between gap-4">
                <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="mono-tag rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-white/80">
                      Flagship
                    </span>
                  )}
                  <span className="mono-tag rounded-full border border-white/12 px-2.5 py-1 text-white/50">
                    {project.category}
                  </span>
                </div>
              </div>

              <h3 className="display mt-7 text-2xl text-white md:text-[1.75rem]">
                {project.title}
              </h3>

              {project.tagline && (
                <p className="mono-tag mt-2 text-white/35">{project.tagline}</p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-white/55">{project.description}</p>

              <p className="mono-label mt-6 text-white/35">
                {project.stack.join(' / ')}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Project Details
                  <ArrowUpRight className="size-3.5" />
                </button>

                {hasDemo && (
                  <button
                    type="button"
                    onClick={() => onOpenDemo?.(project)}
                    className="mono-tag inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-ink transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <Play className="size-3.5" />
                    Watch 15s Demo
                  </button>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-white/55 transition-colors hover:border-white/40 hover:text-white"
                  >
                    Code
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* ---- Project details modal ---- */}
      {active && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/80 p-3 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
          onClick={closeDetails}
        >
          <div
            data-lenis-prevent
            onClick={(event) => event.stopPropagation()}
            className="card relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 md:p-8"
          >
            <button
              type="button"
              onClick={closeDetails}
              aria-label="Close project details"
              className="absolute top-5 right-5 grid size-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <X className="size-4" />
            </button>

            <span className="mono-label">{active.category}</span>
            <h3 className="display mt-3 pr-12 text-[clamp(1.75rem,5vw,2.5rem)] text-white">
              {active.title}
            </h3>
            {active.tagline && <p className="mono-tag mt-2 text-white/35">{active.tagline}</p>}

            <p className="mt-6 text-sm leading-relaxed text-white/65 md:text-[15px]">
              {active.description}
            </p>

            <div className="mt-7">
              <p className="mono-label">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="mono-tag rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-white/65"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline mt-8 flex flex-wrap items-center gap-3 pt-6">
              {demoScenes[active.slug] && (
                <button
                  type="button"
                  onClick={() => {
                    const project = active
                    closeDetails()
                    onOpenDemo?.(project)
                  }}
                  className="mono-tag inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Play className="size-3.5" />
                  Watch 15s Demo
                </button>
              )}

              {active.github_url && (
                <a
                  href={active.github_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-white/75 transition-colors hover:border-white/40 hover:text-white"
                >
                  View source
                  <ExternalLink className="size-3.5" />
                </a>
              )}

              {active.live_url && (
                <a
                  href={active.live_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-white/75 transition-colors hover:border-white/40 hover:text-white"
                >
                  Live site
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
