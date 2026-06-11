"use client";

import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const FREE_LIMIT = 10;

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const res = await fetch("/api/get-usage");
        if (res.ok) {
          const data = await res.json();
          setIsPro(data.is_pro);
          setReplyCount(data.reply_count);
        }

        const base = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;
        if (base && user) {
          const url = new URL(base);
          url.searchParams.set("checkout[custom][user_id]", user.id);
          if (user.email) url.searchParams.set("checkout[email]", user.email);
          setCheckoutUrl(url.toString());
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Billing</h1>
        <p className="text-sm text-gray-500 mb-8">
          Manage your ReplyMate plan.
        </p>

        {loading ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : isPro ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-900">
                ReplyMate Pro
              </span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Unlimited replies. Thanks for supporting ReplyMate!
            </p>
            <p className="text-xs text-gray-400 mt-4">
              To update your payment method or cancel, use the “Manage
              subscription” link in your Lemon Squeezy receipt email.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900">
                Free plan
              </span>
              <span className="text-sm text-gray-500">
                {replyCount} / {FREE_LIMIT} replies used
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min((replyCount / FREE_LIMIT) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Upgrade to Pro for unlimited AI review replies — $9/month,
              cancel anytime.
            </p>
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
              >
                Upgrade to Pro
              </a>
            ) : (
              <p className="text-xs text-gray-400">
                Checkout isn’t configured yet (set NEXT_PUBLIC_LS_CHECKOUT_URL).
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
