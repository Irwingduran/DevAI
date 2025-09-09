import { type NextRequest, NextResponse } from "next/server"
import { conversationDb } from "@/lib/services/conversation-service"
import { getAnonymousUserId } from "@/lib/utils/anonymous-user"

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (implement your auth logic)
    const userId = null // Replace with actual user ID from session/JWT

    let anonymousId: string | null = null
    if (!userId) {
      anonymousId = await getAnonymousUserId()
    }

    if (!userId && !anonymousId) {
      return NextResponse.json({ conversations: [] })
    }

    const conversations = await conversationDb.getConversationsWithMessages(
      userId || undefined,
      anonymousId || undefined,
    )

    return NextResponse.json({
      success: true,
      conversations,
      totalCount: conversations.length,
    })
  } catch (error) {
    console.error("Error fetching conversation history:", error)
    return NextResponse.json({ error: "Failed to fetch conversation history" }, { status: 500 })
  }
}
