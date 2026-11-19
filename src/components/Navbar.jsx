import { useEffect, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { navLinks, profile as fallbackProfile } from '../data/portfolio'

export default function Navbar({
  profile = fallbackProfile,
  isSupabaseLive = false,
  onNavigate,
  onResume,
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    onNavigate?.(id)
  }

  const live = isSupabaseLive

  const statusPill = (
    <span
      title={live ? 'Reading projects from Supabase' : 'Rendering local fallback content'}
      className={`mono-tag inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        live
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
          : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
      }`}
    >
      <span
        className={`size-1.5 rounded-full animate-pulse-dot ${
          live ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
      />
      {live ? 'Supabase Live' : 'Local Fallback'}
    </span>
  )

  return (
    <header
      className={`sticky top-0 z-[60] w-full border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-white/10 bg-ink/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go('home')}
          className="group flex items-center gap-2.5"
          aria-label="Atharv Gidde — back to top"
        >
          <span className="grid size-7 place-items-center rounded-md border border-white/15 bg-white/5">
            <span className="mono-tag text-[10px] text-white/80">{profile.initials}</span>
          </span>
          <span className="mono-label text-white/70 transition-colors group-hover:text-white">
            {profile.firstName}
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="group flex items-baseline gap-1.5 text-[13px] text-white/55 transition-colors hover:text-white"
            >
              <span className="mono-tag text-[10px] text-white/25 transition-colors group-hover:text-white/60">
                {link.index}
              </span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:block">{statusPill}</span>

          <button
            type="button"
            onClick={onResume}
            className="mono-tag hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/80 transition-colors hover:bg-white hover:text-ink md:inline-flex"
          >
            <FileText className="size-3.5" />
            Resume
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-white/10 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? 'max-h-[26rem] border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="shell flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="flex items-baseline gap-3 border-b border-white/5 py-3 text-left text-base text-white/70 transition-colors hover:text-white"
            >
              <span className="mono-tag text-[10px] text-white/30">{link.index} /</span>
              {link.label}
            </button>
          ))}

          <div className="flex flex-wrap items-center gap-3 pt-5">
            {statusPill}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onResume?.()
              }}
              className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/80"
            >
              <FileText className="size-3.5" />
              Resume
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
