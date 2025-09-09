import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, serviceId, isDeposit, customerInfo, billingAddress, savePaymentMethod } =
      await request.json()

    // Validate required fields
    if (!amount || !currency || !serviceId || !customerInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create or retrieve customer
    let customer
    try {
      const existingCustomers = await stripe.customers.list({
        email: customerInfo.email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]

        // Update customer info if needed
        await stripe.customers.update(customer.id, {
          name: customerInfo.name,
          address: billingAddress,
          metadata: {
            company: customerInfo.company || "",
          },
        })
      } else {
        customer = await stripe.customers.create({
          email: customerInfo.email,
          name: customerInfo.name,
          address: billingAddress,
          metadata: {
            company: customerInfo.company || "",
          },
        })
      }
    } catch (error) {
      console.error("Error creating/updating customer:", error)
      return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
    }

    // Create payment intent
    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      customer: customer.id,
      metadata: {
        serviceId,
        isDeposit: isDeposit ? "true" : "false",
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        company: customerInfo.company || "",
      },
      description: `Payment for service ${serviceId}${isDeposit ? " (Deposit)" : ""}`,
      receipt_email: customerInfo.email,
    }

    if (savePaymentMethod) {
      paymentIntentData.setup_future_usage = "on_session"
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)

    // Log the payment intent creation for tracking
    console.log(`Payment intent created: ${paymentIntent.id} for customer: ${customer.id}`)

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      customer_id: customer.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
