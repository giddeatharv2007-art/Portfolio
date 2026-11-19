import { useCallback, useEffect, useRef, useState } from 'react'
import usePortfolioData from './hooks/usePortfolioData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Craft from './components/Craft'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import Writing from './components/Writing'
import JourneyAndProofs from './components/JourneyAndProofs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'
import ArticleModal from './components/ArticleModal'
import ProjectDemoModal from './components/ProjectDemoModal'

// Registered exactly once for the whole app.
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(
    () =>
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [resumeOpen, setResumeOpen] = useState(false)
  const [articleOpen, setArticleOpen] = useState(false)
  const [demoProject, setDemoProject] = useState(null)

  const rootRef = useRef(null)
  const lenisRef = useRef(null)
  const {
    profile,
    projects: portfolioProjects,
    isSupabaseLive,
  } = usePortfolioData()

  /* ------------------------------------------------------------------
     Lenis smooth scroll + one global GSAP reveal context.
     Everything is torn down in the cleanup so no element is ever left
     stranded at opacity: 0.
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          },
        )
      })
    }, rootRef)

    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafId)
      ctx.revert()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const modalOpen = resumeOpen || articleOpen || Boolean(demoProject)

  /* Freeze page scroll behind the preloader and any open modal. */
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (loading || modalOpen) lenis.stop()
    else lenis.start()
  }, [loading, modalOpen])

  /* Re-measure once the preloader releases the page. */
  useEffect(() => {
    if (!loading) ScrollTrigger.refresh()
  }, [loading])

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id)
    if (!element) return

    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(element, { offset: -72, duration: 1.15 })
    else element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-screen bg-ink text-white">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar
        profile={profile}
        isSupabaseLive={isSupabaseLive}
        onNavigate={scrollToSection}
        onResume={() => setResumeOpen(true)}
      />

      <main>
        <Hero
          profile={profile}
          isSupabaseLive={isSupabaseLive}
          onNavigate={scrollToSection}
          onResume={() => setResumeOpen(true)}
        />
        <About profile={profile} isSupabaseLive={isSupabaseLive} />
        <Craft />
        <Marquee />
        <Projects
          projects={portfolioProjects}
          profile={profile}
          isSupabaseLive={isSupabaseLive}
          onOpenDemo={setDemoProject}
        />
        <Writing onReadArticle={() => setArticleOpen(true)} />
        <JourneyAndProofs />
        <Contact profile={profile} isSupabaseLive={isSupabaseLive} />
      </main>

      <Footer profile={profile} onNavigate={scrollToSection} />

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        isSupabaseLive={isSupabaseLive}
      />
      <ArticleModal open={articleOpen} onClose={() => setArticleOpen(false)} />
      <ProjectDemoModal project={demoProject} onClose={() => setDemoProject(null)} />
    </div>
  )
}
