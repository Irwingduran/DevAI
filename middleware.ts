import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Define protected routes
const protectedRoutes = ['/dashboard', '/api/conversation', '/api/payments']
const authRoutes = ['/login', '/register']

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60000, // 1 minute
  maxRequests: 100,
  api: {
    '/api/conversation': 20, // More restrictive for AI endpoints
    '/api/auth': 50,
  },
}

function getRateLimit(pathname: string): number {
  for (const [path, limit] of Object.entries(RATE_LIMIT.api)) {
    if (pathname.startsWith(path)) {
      return limit
    }
  }
  return RATE_LIMIT.maxRequests
}

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    return false
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-change-in-production'
    )
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

function checkRateLimit(ip: string, pathname: string): boolean {
  const now = Date.now()
  const limit = getRateLimit(pathname)
  const key = `${ip}:${pathname}`
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Security headers
  const headers = new Headers(request.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-XSS-Protection', '1; mode=block')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  
  // CORS for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      process.env.NEXT_PUBLIC_APP_URL || '',
    ].filter(Boolean)
    
    if (origin && allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin)
      headers.set('Access-Control-Allow-Credentials', 'true')
      headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
      headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      )
    }
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers })
    }
    
    // Rate limiting for API routes
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip, pathname)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      )
    }
  }
  
  // Authentication check for protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    const isAuthenticated = await verifyAuth(request)
    
    if (!isAuthenticated) {
      // For API routes, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401, headers }
        )
      }
      
      // For pages, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Redirect authenticated users away from auth pages
  if (authRoutes.includes(pathname)) {
    const isAuthenticated = await verifyAuth(request)
    
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.openai.com https://api.anthropic.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
  
  headers.set('Content-Security-Policy', csp)
  
  return NextResponse.next({
    headers,
    request: {
      headers,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}