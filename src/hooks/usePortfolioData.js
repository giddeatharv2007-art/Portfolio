import { useEffect, useState } from 'react'
import {
  profile as fallbackProfile,
  projects as fallbackProjects,
} from '../data/portfolio'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const FETCH_TIMEOUT_MS = 4000
const nonEmpty = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null)

function mergeProfile(row) {
  if (!row) return fallbackProfile

  const fullName = nonEmpty(row.full_name) ?? fallbackProfile.name
  const [firstName = fallbackProfile.firstName, ...lastParts] = fullName.split(/\s+/)
  const lastName = lastParts.join(' ') || fallbackProfile.lastName

  return {
    ...fallbackProfile,
    name: fullName,
    firstName: firstName.toUpperCase(),
    lastName: lastName.toUpperCase(),
    tagline: nonEmpty(row.headline) ?? fallbackProfile.tagline,
    email: nonEmpty(row.email) ?? fallbackProfile.email,
    location: nonEmpty(row.location) ?? fallbackProfile.location,
    status: nonEmpty(row.status_text) ?? fallbackProfile.status,
    heroImage: nonEmpty(row.hero_image_url) ?? fallbackProfile.heroImage,
    localHeroImage: fallbackProfile.heroImage,
    aboutImage: nonEmpty(row.about_image_url) ?? fallbackProfile.aboutImage,
    socials: {
      ...fallbackProfile.socials,
      linkedin: nonEmpty(row.linkedin_url) ?? fallbackProfile.socials.linkedin,
      github: nonEmpty(row.github_url) ?? fallbackProfile.socials.github,
    },
  }
}

function mergeProjects(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return fallbackProjects

  const fallbackBySlug = new Map(fallbackProjects.map((project) => [project.slug, project]))
  const liveBySlug = new Map(rows.map((project) => [project.slug, project]))

  const mergedFallbacks = fallbackProjects.map((fallback) => {
    const live = liveBySlug.get(fallback.slug)
    if (!live) return fallback

    return {
      ...fallback,
      ...live,
      title: nonEmpty(live.title) ?? fallback.title,
      category: nonEmpty(live.category) ?? fallback.category,
      description: nonEmpty(live.description) ?? fallback.description,
      stack: Array.isArray(live.stack) ? live.stack : fallback.stack,
      github_url: nonEmpty(live.github_url) ?? fallback.github_url,
      live_url: nonEmpty(live.live_url) ?? fallback.live_url,
      image_url: nonEmpty(live.image_url),
      localImage: fallback.localImage ?? null,
    }
  })

  const liveOnly = rows
    .filter((project) => !fallbackBySlug.has(project.slug))
    .map((project) => ({
      ...project,
      title: nonEmpty(project.title) ?? 'Untitled project',
      stack: Array.isArray(project.stack) ? project.stack : [],
      image_url: nonEmpty(project.image_url),
      localImage: null,
    }))

  return [...mergedFallbacks, ...liveOnly]
}

/**
 * Fetches public profile and project content in parallel. Missing credentials,
 * paused projects, schema errors, and timeouts all resolve to local content.
 */
export default function usePortfolioData() {
  const [data, setData] = useState({
    profile: fallbackProfile,
    projects: fallbackProjects,
    isSupabaseLive: false,
  })

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined

    let cancelled = false
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    const load = async () => {
      const [profileResult, projectsResult] = await Promise.allSettled([
        supabase
          .from('profile_settings')
          .select(
            'full_name,headline,email,linkedin_url,github_url,hero_image_url,about_image_url,location,status_text',
          )
          .eq('id', 1)
          .maybeSingle()
          .abortSignal(controller.signal),
        supabase
          .from('projects')
          .select(
            'id,title,slug,category,description,stack,github_url,live_url,featured,created_at,image_url',
          )
          .order('created_at', { ascending: false })
          .abortSignal(controller.signal),
      ])

      if (cancelled) return

      const profileRow =
        profileResult.status === 'fulfilled' && !profileResult.value.error
          ? profileResult.value.data
          : null
      const projectRows =
        projectsResult.status === 'fulfilled' && !projectsResult.value.error
          ? projectsResult.value.data
          : null

      const profileIsLive = profileResult.status === 'fulfilled' && !profileResult.value.error
      const projectsAreLive =
        projectsResult.status === 'fulfilled' && !projectsResult.value.error

      setData({
        profile: mergeProfile(profileRow),
        projects: mergeProjects(projectRows),
        isSupabaseLive: profileIsLive || projectsAreLive,
      })
    }

    load()
      .catch(() => {
        // Keep the already-rendered local content; backend availability is optional.
      })
      .finally(() => window.clearTimeout(timeoutId))

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return data
}
