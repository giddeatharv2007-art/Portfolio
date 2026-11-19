import { useEffect } from 'react'
import { Download, ExternalLink, Printer, X } from 'lucide-react'
import { journey, profile as fallbackProfile, resume } from '../data/portfolio'

export default function ResumeModal({
  open,
  onClose,
  profile = fallbackProfile,
  isSupabaseLive = false,
}) {
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

  const education = journey.phases[0]

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/85 p-0 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
      data-supabase-live={isSupabaseLive}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      onClick={() => onClose?.()}
    >
      <div
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className="card relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-ink/90 px-6 py-4 backdrop-blur-xl md:px-8">
          <span className="mono-label">Resume — Preview</span>
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close resume"
            className="grid size-8 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-8 md:px-8 md:py-10">
          <h2 className="display text-[clamp(1.75rem,5vw,2.5rem)] text-white">{profile.name}</h2>
          <p className="mono-label mt-3 text-white/40">
            {profile.role} · {profile.location}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="mono-label text-white/50 transition-colors hover:text-white"
            >
              {profile.email}
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-tag inline-flex items-center gap-1.5 text-white/40 transition-colors hover:text-white"
            >
              LinkedIn <ExternalLink className="size-3" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-tag inline-flex items-center gap-1.5 text-white/40 transition-colors hover:text-white"
            >
              GitHub <ExternalLink className="size-3" />
            </a>
          </div>

          <p className="mt-7 text-sm leading-relaxed text-white/65">{resume.summary}</p>

          <div className="mt-9">
            <p className="mono-label">Education</p>
            <div className="mt-3 border-l border-white/10 pl-5">
              <p className="text-sm text-white/80">{education.title}</p>
              <p className="mono-tag mt-1.5 text-white/35">{education.org}</p>
            </div>
          </div>

          <div className="mt-9">
            <p className="mono-label">Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="mono-tag rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-white/65"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <p className="mono-label">Highlights</p>
            <ul className="mt-3 space-y-3">
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-white/60">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-white/25" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline mt-10 flex flex-wrap items-center gap-3 pt-7">
            {/* The PDF lives in public/resume.pdf → /resume.pdf once deployed. */}
            <a
              href={profile.resumeUrl}
              download="Atharv-Gidde-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Download className="size-4" strokeWidth={1.75} />
              Download PDF
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 transition-colors hover:border-white/40 hover:text-white"
            >
              <Printer className="size-4" strokeWidth={1.75} />
              Print Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
