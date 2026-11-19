import { ArrowUp, ExternalLink, Mail, MapPin } from 'lucide-react'
import { footer, navLinks, profile as fallbackProfile } from '../data/portfolio'

function LinkedInIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.75 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

export default function Footer({
  profile = fallbackProfile,
  isSupabaseLive = false,
  onNavigate,
}) {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`

  return (
    <footer
      data-supabase-live={isSupabaseLive}
      className="mt-8 border-t border-white/10"
    >
      <div className="shell py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 rounded-full bg-emerald-400/70 animate-pulse-dot" />
              </span>
              <span className="mono-label text-white/70">{profile.status || footer.note}</span>
            </div>

            <p className="display mt-6 text-2xl text-white md:text-3xl">{profile.name}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="mono-tag inline-flex items-center gap-2 text-white/35">
                <MapPin className="size-3.5" strokeWidth={1.5} />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="mono-tag text-white/35 transition-colors hover:text-white"
              >
                {profile.email}
              </a>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-tag inline-flex items-center gap-1.5 text-white/35 transition-colors hover:text-white"
              >
                <Mail className="size-3.5" />
                Gmail
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate?.(link.id)}
                className="mono-tag text-white/40 transition-colors hover:text-white"
              >
                {link.index} {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <LinkedInIcon className="size-3.5" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <GitHubIcon className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate?.('home')}
              aria-label="Back to top"
              className="grid size-9 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <ArrowUp className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="hairline mt-12 flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="mono-tag text-white/25">{footer.copyright}</span>
          <span className="mono-tag text-white/25">
            Built with React · Tailwind · GSAP · Supabase
          </span>
        </div>
      </div>
    </footer>
  )
}
