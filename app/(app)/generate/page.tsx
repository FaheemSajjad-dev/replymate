"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

type Tone = "professional" | "friendly" | "apologetic";

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: "professional", label: "Professional", description: "Formal & polished" },
  { value: "friendly", label: "Friendly", description: "Warm & personable" },
  { value: "apologetic", label: "Apologetic", description: "Empathetic & sorry" },
];

const FREE_LIMIT = 10;

interface Usage {
  reply_count: number;
  is_pro: boolean;
}

export default function GeneratePage() {
  const [review, setReview] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [copied, setCopied] = useState(false);

  const [usage, setUsage] = useState<Usage | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await fetch("/api/get-usage");
        if (res.ok) {
          const data: Usage = await res.json();
          setUsage(data);
          if (!data.is_pro && data.reply_count >= FREE_LIMIT) {
            setLimitReached(true);
          }
        }
      } catch {
        // Non-fatal — usage counter just won't show
      } finally {
        setUsageLoading(false);
      }
    }
    fetchUsage();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!review.trim()) return;

    setLoading(true);
    setError(null);
    setLimitReached(false);
    setReply("");
    setCopied(false);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: review.trim(),
          tone,
          businessName: businessName.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.status === 403 && data.error === "limit_reached") {
        setLimitReached(true);
      } else if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setReply(data.reply);
        // Optimistically update local usage counter
        setUsage((prev) =>
          prev ? { ...prev, reply_count: prev.reply_count + 1 } : prev
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const usedCount = usage?.reply_count ?? 0;
  const isPro = usage?.is_pro ?? false;
  const progressPct = isPro ? 100 : Math.min((usedCount / FREE_LIMIT) * 100, 100);
  const nearLimit = !isPro && usedCount >= FREE_LIMIT - 2;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Generate Reply</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Paste a customer review and get an AI-crafted response in seconds.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* ── Usage counter ─────────────────────────────── */}
        {!usageLoading && usage !== null && (
          <div className={`rounded-2xl border p-4 ${
            isPro
              ? "bg-indigo-50 border-indigo-100"
              : nearLimit
              ? "bg-amber-50 border-amber-200"
              : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center justify-between mb-2">
              {isPro ? (
                <span className="text-sm font-medium text-indigo-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Pro plan — unlimited replies
                </span>
              ) : (
                <span className={`text-sm font-medium ${nearLimit ? "text-amber-700" : "text-gray-700"}`}>
                  {usedCount} / {FREE_LIMIT} free replies used
                </span>
              )}
              {!isPro && (
                <Link
                  href="/billing"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  Upgrade to Pro →
                </Link>
              )}
            </div>
            {!isPro && (
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progressPct >= 100
                      ? "bg-red-500"
                      : nearLimit
                      ? "bg-amber-400"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Limit reached banner ──────────────────────── */}
        {limitReached && (
          <div className="bg-white border border-amber-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              You&apos;ve used all {FREE_LIMIT} free replies
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Upgrade to Pro for unlimited replies, reply history, and priority support.
            </p>
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-sm"
            >
              Upgrade to Pro
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Review textarea */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-2">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Customer review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review"
              rows={6}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Paste your Google or Yelp review here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Business name + tone */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business name{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Joe's Pizza"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-gray-700">Tone</p>
              <div className="grid grid-cols-3 gap-3">
                {TONES.map(({ value, label, description }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTone(value)}
                    className={`flex flex-col items-center text-center px-3 py-3 rounded-xl border-2 transition ${
                      tone === value
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium text-sm">{label}</span>
                    <span className={`text-xs mt-0.5 ${tone === value ? "text-indigo-500" : "text-gray-400"}`}>
                      {description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !review.trim() || limitReached}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating…
              </>
            ) : (
              "Generate Reply"
            )}
          </button>
        </form>

        {/* Generic error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {/* Result */}
        {reply && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Generated Reply
              </h2>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                  copied
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}
