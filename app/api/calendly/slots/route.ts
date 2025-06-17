import { NextResponse } from "next/server"

// Environment variables should be added to your .env.local file (never commit secrets)
// CALENDLY_PAT: Personal access token generated in Calendly
// CALENDLY_EVENT_TYPE_UUID: The UUID portion of the event-type URI, e.g. "12345678-aaaa-bbbb-cccc-123456abcdef"

export async function GET(request: Request) {
  const token = process.env.CALENDLY_PAT
  const eventType = process.env.CALENDLY_EVENT_TYPE_UUID

  if (!token || !eventType) {
    return NextResponse.json(
      { error: "Calendly environment variables are missing" },
      { status: 500 },
    )
  }

  const { searchParams } = new URL(request.url)
  const now = new Date()
  const startISO = searchParams.get("start") ?? now.toISOString()
  const endISO =
    searchParams.get("end") ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week window

  const url = `https://api.calendly.com/event_types/${eventType}/available_times?start_time=${encodeURIComponent(
    startISO,
  )}&end_time=${encodeURIComponent(endISO)}`

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error("Calendly API error:", text)
      return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
    }

    const data = await resp.json()

    // "collection" contains slots with start_time/end_time/utc_offset/...
    const slots = (data.collection || []).map((slot: any) => ({
      time: slot.start_time, // ISO
      available: true,
      timezone: slot.start_time.slice(-6) || "UTC",
    }))

    return NextResponse.json(slots)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
