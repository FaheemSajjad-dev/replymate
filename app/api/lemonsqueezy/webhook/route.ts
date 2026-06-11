import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Lemon Squeezy webhook handler.
 *
 * Setup (Lemon Squeezy dashboard → Settings → Webhooks):
 *   URL:    https://<your-domain>/api/lemonsqueezy/webhook
 *   Secret: same value as LEMONSQUEEZY_WEBHOOK_SECRET env var
 *   Events: subscription_created, subscription_updated,
 *           subscription_resumed, subscription_expired
 *
 * The checkout link on the billing page passes the Supabase user id as
 * checkout[custom][user_id], which Lemon Squeezy echoes back in
 * meta.custom_data — that's how we know whose flag to flip.
 */

// Statuses that should keep Pro access. "cancelled" stays true because the
// customer keeps access until the end of the billing period; the
// subscription_expired event flips it off when the period actually ends.
const PRO_STATUSES = new Set(["active", "on_trial", "past_due", "cancelled", "paused"]);

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[ls-webhook] LEMONSQUEEZY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // ── Verify signature (HMAC-SHA256 of the raw body) ──────────────
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const sigBuf = Buffer.from(signature, "hex");
  const digBuf = Buffer.from(digest, "hex");

  if (sigBuf.length !== digBuf.length || !crypto.timingSafeEqual(sigBuf, digBuf)) {
    console.error("[ls-webhook] invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // ── Parse payload ────────────────────────────────────────────────
  type LsPayload = {
    meta?: { event_name?: string; custom_data?: { user_id?: string } };
    data?: { attributes?: { status?: string } };
  };

  let payload: LsPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName: string = payload?.meta?.event_name ?? "";
  const userId: string | undefined = payload?.meta?.custom_data?.user_id;
  const status: string = payload?.data?.attributes?.status ?? "";

  if (!eventName.startsWith("subscription_")) {
    // Not a subscription event — acknowledge and ignore.
    return NextResponse.json({ received: true });
  }

  if (!userId) {
    // Without the custom user_id we can't map this to an account.
    console.error("[ls-webhook] missing custom_data.user_id for", eventName);
    return NextResponse.json({ received: true });
  }

  const isPro = eventName === "subscription_expired" ? false : PRO_STATUSES.has(status);

  // ── Update Supabase ──────────────────────────────────────────────
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("usage")
    .upsert(
      { user_id: userId, is_pro: isPro },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("[ls-webhook] supabase update failed:", error);
    // 500 so Lemon Squeezy retries the delivery.
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  console.log(`[ls-webhook] ${eventName} → user ${userId} is_pro=${isPro}`);
  return NextResponse.json({ received: true });
}
