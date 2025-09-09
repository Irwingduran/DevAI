import { type NextRequest, NextResponse } from "next/server"
import { conversationDb } from "@/lib/services/conversation-service"
import { migrateAnonymousHistory } from "@/lib/utils/anonymous-user"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await conversationDb.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 12
    const password_hash = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await conversationDb.createUser({
      email,
      password_hash,
      name,
    })

    // Migrate anonymous history to new user account
    const migratedCount = await migrateAnonymousHistory(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      migratedConversations: migratedCount,
      message:
        migratedCount > 0
          ? `Account created successfully and migrated ${migratedCount} conversations from your previous session.`
          : "Account created successfully.",
    })
  } catch (error) {
    console.error("Error during registration:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
