import { type NextRequest, NextResponse } from "next/server"
import { conversationDb } from "@/lib/services/conversation-service"
import { migrateAnonymousHistory } from "@/lib/utils/anonymous-user"
import { SignJWT } from 'jose'
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await conversationDb.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Migrate anonymous history to user account
    const migratedCount = await migrateAnonymousHistory(user.id)

    // Create JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-change-in-production'
    )
    
    const token = await new SignJWT({ 
      email: user.email,
      userId: user.id,
      name: user.name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      migratedConversations: migratedCount,
      message:
        migratedCount > 0
          ? `Successfully logged in and migrated ${migratedCount} conversations from your previous session.`
          : "Successfully logged in.",
    })

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
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
