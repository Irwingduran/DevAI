import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import PDFDocument from "pdfkit"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 })
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["customer", "payment_method"],
    })

    if (!paymentIntent) {
      return NextResponse.json({ error: "Payment intent not found" }, { status: 404 })
    }

    // Create PDF receipt
    const doc = new PDFDocument({ margin: 50 })
    const chunks: Buffer[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
    })

    // Header
    doc.fontSize(20).text("Payment Receipt", { align: "center" })
    doc.moveDown()

    // Company info
    doc.fontSize(12)
    doc.text("Your Company Name", { align: "right" })
    doc.text("123 Business Street", { align: "right" })
    doc.text("City, State 12345", { align: "right" })
    doc.text("support@yourcompany.com", { align: "right" })
    doc.moveDown()

    // Receipt details
    doc.fontSize(14).text("Receipt Details", { underline: true })
    doc.moveDown(0.5)

    doc.fontSize(12)
    doc.text(`Receipt #: ${paymentIntent.id}`)
    doc.text(`Date: ${new Date(paymentIntent.created * 1000).toLocaleDateString()}`)
    doc.text(`Amount: $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()}`)
    doc.text(`Status: ${paymentIntent.status.charAt(0).toUpperCase() + paymentIntent.status.slice(1)}`)
    doc.moveDown()

    // Customer info
    if (paymentIntent.customer && typeof paymentIntent.customer === "object") {
      doc.fontSize(14).text("Customer Information", { underline: true })
      doc.moveDown(0.5)

      doc.fontSize(12)
      doc.text(`Name: ${paymentIntent.customer.name || "N/A"}`)
      doc.text(`Email: ${paymentIntent.customer.email || "N/A"}`)

      if (paymentIntent.metadata.company) {
        doc.text(`Company: ${paymentIntent.metadata.company}`)
      }
      doc.moveDown()
    }

    // Service details
    doc.fontSize(14).text("Service Details", { underline: true })
    doc.moveDown(0.5)

    doc.fontSize(12)
    doc.text(`Service ID: ${paymentIntent.metadata.serviceId}`)
    doc.text(`Description: ${paymentIntent.description || "Service payment"}`)

    if (paymentIntent.metadata.isDeposit === "true") {
      doc.text("Payment Type: Deposit Payment")
    } else {
      doc.text("Payment Type: Full Payment")
    }
    doc.moveDown()

    // Payment method
    if (paymentIntent.payment_method && typeof paymentIntent.payment_method === "object") {
      doc.fontSize(14).text("Payment Method", { underline: true })
      doc.moveDown(0.5)

      doc.fontSize(12)
      if (paymentIntent.payment_method.card) {
        doc.text(`Card: **** **** **** ${paymentIntent.payment_method.card.last4}`)
        doc.text(`Brand: ${paymentIntent.payment_method.card.brand.toUpperCase()}`)
        doc.text(
          `Expires: ${paymentIntent.payment_method.card.exp_month}/${paymentIntent.payment_method.card.exp_year}`,
        )
      }
      doc.moveDown()
    }

    // Footer
    doc.fontSize(10)
    doc.text("Thank you for your business!", { align: "center" })
    doc.text("This is an official receipt for your payment.", { align: "center" })

    doc.end()

    const pdfBuffer = await pdfPromise

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${paymentIntentId}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating receipt:", error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to generate receipt" }, { status: 500 })
  }
}
