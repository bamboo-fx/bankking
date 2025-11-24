import { NextResponse } from "next/server";
// Stripe webhook disabled
// import { headers } from "next/headers";
// import { createClient } from "@supabase/supabase-js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Create Supabase client with service role for webhook (bypasses RLS)
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

export async function POST(request: Request) {
  // Stripe webhook disabled
  return NextResponse.json({ received: false, message: "Stripe webhooks are disabled" }, { status: 503 });
  
  /* DISABLED - Original Stripe webhook code
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;

        if (userId) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          // Determine tier from price ID
          const priceId = subscription.items.data[0].price.id;
          let tier: "monthly" | "yearly" = "monthly";

          if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
            tier = "yearly";
          }

          // Update user profile
          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: "active",
              subscription_tier: tier,
              stripe_subscription_id: subscription.id,
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get user by customer ID
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          let status: "active" | "canceled" | "past_due" = "active";

          if (subscription.status === "past_due") {
            status = "past_due";
          } else if (
            subscription.status === "canceled" ||
            subscription.status === "unpaid"
          ) {
            status = "canceled";
          }

          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: status,
            })
            .eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get user by customer ID
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: "canceled",
              subscription_tier: null,
              stripe_subscription_id: null,
            })
            .eq("id", profile.id);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
  */
}
