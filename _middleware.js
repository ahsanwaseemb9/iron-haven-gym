import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()

  // 2. PROTECT THE VAULT: If no user and trying to access /profile, kick to /login
  if (!user && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. AUTO-FORWARD: If user is logged in and tries to go to /login, send to /profile
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return response
}

// This "matcher" tells Next.js which pages the bouncer should watch
export const config = {
  matcher: ['/profile/:path*', '/login'],
}