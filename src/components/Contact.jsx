import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ExternalLink, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { contact, profile as fallbackProfile } from '../data/portfolio'

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

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
  }
  fallbackCopy(text)
  return Promise.resolve()
}

/** Fallback for browsers/contexts without the async Clipboard API. */
function fallbackCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.top = '-1000px'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  try {
    document.execCommand('copy')
  } catch {
    // Nothing else we can do — the email is still visible/selectable on screen.
  }
  document.body.removeChild(area)
}

const emptyForm = { name: '', email: '', message: '' }

export default function Contact({ profile = fallbackProfile, isSupabaseLive = false }) {
  const [topic, setTopic] = useState(contact.topics[0])
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(0)

  useEffect(() => () => {
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
  }, [])

  const handleCopy = async () => {
    await copyToClipboard(profile.email)
    setCopied(true)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    if (status !== 'sending') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      topic,
      message: form.message.trim(),
    }

    // No Supabase project configured yet → simulate a clean local confirmation.
    if (!isSupabaseConfigured || !supabase) {
      setForm(emptyForm)
      setStatus('local')
      return
    }

    try {
      const { error } = await supabase.from('messages').insert(payload)
      if (error) throw error
      setForm(emptyForm)
      setStatus('sent')
    } catch {
      // Keep the visitor's message available for retry if delivery failed.
      setStatus('error')
    }
  }

  const emailSubject = encodeURIComponent(topic)
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${emailSubject}`
  const inputClass =
    'w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors focus:border-white/35 focus:outline-none'

  return (
    <section id="contact" className="shell scroll-mt-20 py-20 md:py-28">
      <div className="flex items-baseline gap-4" data-reveal>
        <span className="mono-label">{contact.index} /</span>
        <span className="mono-label">{contact.label}</span>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div data-reveal>
          <h2 className="display max-w-lg text-[clamp(1.9rem,5.5vw,3.25rem)] text-white">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">{contact.blurb}</p>

          <div className="mt-9 flex flex-wrap gap-2">
            {contact.topics.map((item) => {
              const selected = topic === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTopic(item)
                    if (status !== 'sending') setStatus('idle')
                  }}
                  aria-pressed={selected}
                  className={`mono-tag rounded-full border px-3.5 py-2 transition-colors ${
                    selected
                      ? 'border-white bg-white text-ink'
                      : 'border-white/12 text-white/55 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <div className="hairline mt-9 flex flex-wrap items-center gap-3 pt-7">
            <button
              type="button"
              onClick={handleCopy}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-white/40"
            >
              <Mail className="size-4 text-white/50" strokeWidth={1.5} />
              <span className="mono-tag text-white/80">{profile.email}</span>
              {copied ? (
                <span className="mono-tag inline-flex items-center gap-1.5 text-emerald-300">
                  <Check className="size-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="size-3.5 text-white/30 transition-colors group-hover:text-white/70" />
              )}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}?subject=${emailSubject}`}
              className="mono-tag inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-ink transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-3.5" />
              Email Me
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-white/65 transition-colors hover:border-white/40 hover:text-white"
            >
              <LinkedInIcon className="size-3.5" />
              LinkedIn
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-white/65 transition-colors hover:border-white/40 hover:text-white"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-tag inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-white/65 transition-colors hover:border-white/40 hover:text-white"
            >
              <ExternalLink className="size-3.5" />
              Gmail
            </a>
            <span className="mono-tag inline-flex items-center gap-2 text-white/35">
              <MapPin className="size-3.5" strokeWidth={1.5} />
              {profile.location}
            </span>
          </div>
        </div>

        {/* ---- contact form ---- */}
        <form onSubmit={handleSubmit} className="card rounded-2xl p-6 md:p-8" data-reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mono-label">Name</span>
              <input
                required
                maxLength={120}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                className={`mt-3 ${inputClass}`}
              />
            </label>

            <label className="block">
              <span className="mono-label">Email</span>
              <input
                required
                type="email"
                maxLength={200}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                className={`mt-3 ${inputClass}`}
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mono-label">Message</span>
            <textarea
              required
              maxLength={4000}
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder={`Topic: ${topic}`}
              className={`mt-3 resize-none ${inputClass}`}
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              ) : (
                <Send className="size-4" strokeWidth={1.75} />
              )}
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <span className="mono-tag text-white/30">
              Topic: {topic} · {isSupabaseLive ? 'Supabase connected' : 'Local fallback'}
            </span>
          </div>

          {status === 'sent' && (
            <p role="status" className="mono-tag mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/8 px-4 py-3 text-emerald-300">
              Message received — thank you. I’ll reply by email.
            </p>
          )}

          {status === 'local' && (
            <div role="status" className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/8 px-4 py-3">
              <p className="mono-tag text-amber-300">
                Local preview — Supabase isn’t configured yet, so this message was captured on
                screen only.
              </p>
              <p className="mt-2 text-xs text-amber-200/70">
                Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local` (and run
                `supabase/schema.sql`) to deliver it for real.
              </p>
            </div>
          )}

          {status === 'error' && (
            <p role="alert" className="mono-tag mt-5 rounded-xl border border-red-400/25 bg-red-400/8 px-4 py-3 text-red-300">
              Message could not be sent. Your entries are still here; please retry or use Email Me.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
