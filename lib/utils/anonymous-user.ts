import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import { conversationDb } from "@/lib/services/conversation-service"

const ANONYMOUS_COOKIE_NAME = "anon_user_id"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export async function getOrCreateAnonymousUser(): Promise<string> {
  const cookieStore = await cookies()
  let anonymousCookieId = cookieStore.get(ANONYMOUS_COOKIE_NAME)?.value

  if (!anonymousCookieId) {
    // Generate new anonymous ID
    anonymousCookieId = uuidv4()

    // Set secure cookie
    cookieStore.set(ANONYMOUS_COOKIE_NAME, anonymousCookieId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })
  }

  // Ensure anonymous user exists in database
  let anonymousUser = await conversationDb.getAnonymousUserByCookieId(anonymousCookieId)
  if (!anonymousUser) {
    anonymousUser = await conversationDb.createAnonymousUser(anonymousCookieId)
  }

  return anonymousUser.id
}

export async function getAnonymousUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const anonymousCookieId = cookieStore.get(ANONYMOUS_COOKIE_NAME)?.value

  if (!anonymousCookieId) return null

  const anonymousUser = await conversationDb.getAnonymousUserByCookieId(anonymousCookieId)
  return anonymousUser?.id || null
}

export async function clearAnonymousCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ANONYMOUS_COOKIE_NAME)
}

export async function migrateAnonymousHistory(userId: string): Promise<number> {
  const anonymousId = await getAnonymousUserId()
  if (!anonymousId) return 0

  // Migrate conversations
  const migratedCount = await conversationDb.migrateConversationsToUser(anonymousId, userId)

  // Mark anonymous user as migrated
  await conversationDb.markAnonymousUserAsMigrated(anonymousId)

  // Clear the anonymous cookie
  await clearAnonymousCookie()

  return migratedCount
}
