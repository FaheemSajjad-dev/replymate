import { anthropic } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const FREE_LIMIT = 10;

export async function POST(req: NextRequest) {
  try {
    // ── Auth ────────────────────────────────────────────
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Validate request body ───────────────────────────
    const body = await req.json();
    const { review, tone, businessName } = body as {
      review: string;
      tone: "professional" | "friendly" | "apologetic";
      businessName?: string;
    };

    if (!review || typeof review !== "string" || review.trim() === "") {
      return NextResponse.json(
        { error: "review is required" },
        { status: 400 }
      );
    }

    if (!["professional", "friendly", "apologetic"].includes(tone)) {
      return NextResponse.json(
        { error: "tone must be professional, friendly, or apologetic" },
        { status: 400 }
      );
    }

    // ── Fetch or create usage row ───────────────────────
    const { data: existing, error: fetchError } = await supabase
      .from("usage")
      .select("reply_count, is_pro")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[generate-reply] fetch usage:", fetchError);
      return NextResponse.json(
        { error: "Failed to check usage." },
        { status: 500 }
      );
    }

    let replyCount = 0;
    let isPro = false;

    if (!existing) {
      const { error: insertError } = await supabase
        .from("usage")
        .insert({ user_id: user.id, reply_count: 0, is_pro: false });

      if (insertError) {
        console.error("[generate-reply] insert usage:", insertError);
        return NextResponse.json(
          { error: "Failed to initialise usage." },
          { status: 500 }
        );
      }
    } else {
      replyCount = existing.reply_count;
      isPro = existing.is_pro;
    }

    // ── Enforce free tier limit ─────────────────────────
    if (!isPro && replyCount >= FREE_LIMIT) {
      return NextResponse.json({ error: "limit_reached" }, { status: 403 });
    }

    // ── Call Claude ─────────────────────────────────────
    const businessContext = businessName
      ? `The business is called "${businessName}".`
      : "";

    const userPrompt = `${businessContext ? businessContext + "\n\n" : ""}Customer review:\n${review.trim()}\n\nWrite a ${tone} response to this review.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 256,
      system:
        "You are an expert at writing polished, helpful responses to customer reviews for local businesses. Write a response that is concise (2-4 sentences), sounds human, and matches the requested tone. Never use generic phrases like 'Thank you for your feedback.' Always address the specific points in the review.",
      messages: [{ role: "user", content: userPrompt }],
    });

    const reply =
      message.content[0].type === "text" ? message.content[0].text : "";

    // ── Save reply to history ───────────────────────────
    const { error: saveError } = await supabase.from("replies").insert({
      user_id: user.id,
      review_text: review.trim(),
      reply_text: reply,
      tone,
      business_name: businessName?.trim() || null,
    });

    if (saveError) {
      // Non-fatal — reply was generated, just log it
      console.error("[generate-reply] save reply:", saveError);
    }

    // ── Increment reply_count ───────────────────────────
    const { error: updateError } = await supabase
      .from("usage")
      .update({ reply_count: replyCount + 1 })
      .eq("user_id", user.id);

    if (updateError) {
      // Non-fatal — reply was generated, just log it
      console.error("[generate-reply] increment usage:", updateError);
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[generate-reply]", err);
    return NextResponse.json(
      { error: "Failed to generate reply. Please try again." },
      { status: 500 }
    );
  }
}
