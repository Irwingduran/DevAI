import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

export async function POST(request: NextRequest) {
  try {
    // Create JWT token for demo user
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-change-in-production'
    )
    
    const token = await new SignJWT({ 
      email: 'demo@futureflow.com',
      userId: 'demo-user-123',
      name: 'Demo User' 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    const response = NextResponse.json(
      { 
        message: 'Demo access granted',
        user: { 
          email: 'demo@futureflow.com', 
          name: 'Demo User',
          id: 'demo-user-123'
        }
      },
      { status: 200 }
    )

    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Demo auth error:', error)
    return NextResponse.json(
      { message: 'Demo access failed' },
      { status: 500 }
    )
  }
}