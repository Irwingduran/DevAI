import { type NextRequest, NextResponse } from "next/server"
import { conversationDb } from "@/lib/services/conversation-service"
import { getAnonymousUserId } from "@/lib/utils/anonymous-user"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id

    // Get conversation
    const conversation = await conversationDb.getConversationById(conversationId)
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    // Check access permissions
    const userId = null // Replace with actual user ID from session/JWT
    const anonymousId = await getAnonymousUserId()

    const hasAccess =
      (userId && conversation.userId === userId) || (anonymousId && conversation.anonymousId === anonymousId)

    if (!hasAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get messages
    const messages = await conversationDb.getMessagesByConversationId(conversationId)

    return NextResponse.json({
      success: true,
      conversation: {
        ...conversation,
        messages,
        messageCount: messages.length,
      },
    })
  } catch (error) {
    console.error("Error fetching conversation:", error)
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id
    const body = await request.json()
    const { title } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Check if conversation exists and user has access
    const conversation = await conversationDb.getConversationById(conversationId)
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    const userId = null // Replace with actual user ID from session/JWT
    const anonymousId = await getAnonymousUserId()

    const hasAccess =
      (userId && conversation.userId === userId) || (anonymousId && conversation.anonymousId === anonymousId)

    if (!hasAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    await conversationDb.updateConversationTitle(conversationId, title)

    return NextResponse.json({
      success: true,
      message: "Conversation title updated",
    })
  } catch (error) {
    console.error("Error updating conversation:", error)
    return NextResponse.json({ error: "Failed to update conversation" }, { status: 500 })
  }
}
