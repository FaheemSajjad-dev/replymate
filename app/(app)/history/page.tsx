"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Reply {
  id: string;
  review_text: string;
  reply_text: string;
  tone: "professional" | "friendly" | "apologetic";
  business_name: string | null;
  created_at: string;
}

const TONE_STYLES: Record<string, { label: string; classes: string }> = {
  professional: {
    label: "Professional",
    classes: "bg-blue-100 text-blue-700",
  },
  friendly: {
    label: "Friendly",
    classes: "bg-green-100 text-green-700",
  },
  apologetic: {
    label: "Apologetic",
    classes: "bg-amber-100 text-amber-700",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ReplyCard({ reply }: { reply: Reply }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(reply.reply_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tone = TONE_STYLES[reply.tone] ?? {
    label: reply.tone,
    classes: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tone.classes}`}>
            {tone.label}
          </span>
          {reply.business_name && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {reply.business_name}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 shrink-0 mt-0.5">
          {formatDate(reply.created_at)}
        </span>
      </div>

      {/* Review */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Review
        </p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {reply.review_text}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Reply */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Generated Reply
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">
          {reply.reply_text}
        </p>
      </div>

      {/* Copy button */}
      <div className="flex justify-end pt-1">
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
              Copy Reply
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReplies() {
      try {
        const res = await fetch("/api/get-replies");
        const data = await res.json();
        if (!res.ok) {
          setError("Failed to load your reply history.");
        } else {
          setReplies(data.replies ?? []);
        }
      } catch {
        setError("Something went wrong. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    fetchReplies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-gray-900">History</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          All the replies you&apos;ve generated, newest first.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-3"
              >
                <div className="flex gap-2">
                  <div className="h-5 w-20 bg-gray-100 rounded-full" />
                  <div className="h-5 w-16 bg-gray-100 rounded-full" />
                </div>
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                </div>
                <div className="h-px bg-gray-100" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && replies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              No replies yet
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Generate your first reply to see it appear here.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Generate your first reply
            </Link>
          </div>
        )}

        {/* Reply list */}
        {!loading && !error && replies.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 font-medium">
              {replies.length} {replies.length === 1 ? "reply" : "replies"} total
            </p>
            {replies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
