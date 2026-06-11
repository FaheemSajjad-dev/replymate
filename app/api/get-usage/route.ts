import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("usage")
      .select("reply_count, is_pro")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = row not found, anything else is a real error
      console.error("[get-usage]", error);
      return NextResponse.json(
        { error: "Failed to fetch usage." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ reply_count: 0, is_pro: false });
    }

    return NextResponse.json({
      reply_count: data.reply_count,
      is_pro: data.is_pro,
    });
  } catch (err) {
    console.error("[get-usage]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
