import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 1. BUILD SAFETY CHECK: If keys are missing, don't crash the build.
// This prevents the "supabaseUrl is required" error on Vercel.
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("Supabase keys are missing. Check your .env.local file!");
  }
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'iron-haven-auth',
        // 2. STORAGE SAFETY: Check if window is defined (browser-side)
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    })
  : null; // Fallback so the build can finish