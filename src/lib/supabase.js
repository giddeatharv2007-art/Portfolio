import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client that is safe to import before the project is configured.
 *
 * If `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing (or the project
 * is paused), `supabase` is `null` and the app silently renders the local
 * fallback content from `src/data/portfolio.js`. Nothing throws.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { 'x-application-name': 'atharv-gidde-portfolio' } },
    })
  : null

export default supabase
