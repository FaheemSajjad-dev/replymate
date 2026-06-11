import Link from "next/link";

/* ─────────────────────────────────────────
   Icons (inline SVG helpers)
───────────────────────────────────────── */
function IconClipboard() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
function IconSliders() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}
function IconCopy() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* ── 1. NAVBAR ───────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">ReplyMate</span>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 px-4 py-2 rounded-lg transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition shadow-sm"
            >
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      {/* ── 2. HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-28 px-4 sm:px-6 text-center">
        {/* Soft radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="w-[700px] h-[400px] rounded-full bg-indigo-200/30 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Review Replies
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Reply to Every Review{" "}
            <span className="text-indigo-600">in Seconds</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            ReplyMate uses AI to generate polished, professional responses to
            your Google and Yelp reviews — in one click.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              Start For Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            No credit card required · Free to get started
          </p>

          {/* Mock UI card */}
          <div className="mt-10 mx-auto max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl p-5 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer review</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              &quot;The food was amazing and the service was fast. Only downside was
              the parking — really hard to find a spot. Will definitely come back
              though!&quot;
            </p>
            <div className="h-px bg-gray-100 mb-4" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI-Generated reply</p>
            <p className="text-sm text-gray-800 leading-relaxed">
              &quot;We&apos;re so glad you enjoyed the food and our team&apos;s service! We
              completely understand the parking frustration — it&apos;s something we
              hear often and are actively working on solutions for. Can&apos;t wait to
              welcome you back!&quot;
            </p>
            <div className="mt-4 flex justify-end">
              <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ✓ Copied to clipboard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ─────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500 text-base">Three steps. Under 30 seconds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div aria-hidden className="hidden sm:block absolute top-10 left-1/3 right-1/3 h-px bg-indigo-100" />

            {[
              { step: "01", icon: <IconClipboard />, title: "Paste Your Review", desc: "Copy any review from Google, Yelp, or any platform and paste it in." },
              { step: "02", icon: <IconSliders />, title: "Choose Your Tone", desc: "Pick Professional, Friendly, or Apologetic to match the situation." },
              { step: "03", icon: <IconCopy />, title: "Copy Your Reply", desc: "Your AI reply is ready instantly. Copy it and post it in seconds." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="relative w-20 h-20 bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center mb-5 transition text-indigo-600">
                  {icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURES ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-3 text-gray-500 text-base">Built for busy business owners who don&apos;t have time to waste.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
                title: "3 Reply Tones",
                desc: "Professional, Friendly, or Apologetic — match the perfect tone to every review and situation.",
                color: "bg-violet-50 text-violet-600",
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Works With Any Review",
                desc: "Google, Yelp, TripAdvisor, or any platform. If you can paste it, ReplyMate can reply to it.",
                color: "bg-sky-50 text-sky-600",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Instant Results",
                desc: "AI-powered replies generated in under 3 seconds. No waiting, no writer&apos;s block, no stress.",
                color: "bg-amber-50 text-amber-600",
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SOCIAL PROOF ─────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trusted by Local Businesses</h2>
            <p className="mt-3 text-gray-500 text-base">Join hundreds of owners who reply to every review without the stress.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                quote: "This saved me so much time. I used to spend 20 minutes on each reply.",
                name: "Sarah K.",
                role: "Restaurant Owner",
                initials: "SK",
                color: "bg-rose-100 text-rose-700",
              },
              {
                quote: "My response rate went from 10% to 100% in one week.",
                name: "James T.",
                role: "Hotel Manager",
                initials: "JT",
                color: "bg-indigo-100 text-indigo-700",
              },
              {
                quote: "The replies sound so natural. Customers think I wrote them myself.",
                name: "Maria L.",
                role: "Salon Owner",
                initials: "ML",
                color: "bg-emerald-100 text-emerald-700",
              },
            ].map(({ quote, name, role, initials, color }) => (
              <div
                key={name}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${color}`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple Pricing</h2>
            <p className="mt-3 text-gray-500 text-base">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

            {/* Free plan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-all duration-200">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "10 replies per month",
                  "3 tone options",
                  "Copy to clipboard",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <IconCheck />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center text-sm font-semibold text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 py-3 rounded-xl transition"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro plan */}
            <div className="relative bg-indigo-600 rounded-2xl p-8 shadow-xl shadow-indigo-200/50 hover:shadow-indigo-300/60 transition-all duration-200">
              {/* Badge */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow">
                Most Popular
              </span>

              <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wide mb-2">Pro</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-extrabold text-white">$19</span>
                <span className="text-indigo-300 mb-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited replies",
                  "All tone options",
                  "Reply history",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-indigo-100">
                    <svg className="w-4 h-4 text-indigo-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center text-sm font-semibold text-indigo-700 bg-white hover:bg-indigo-50 py-3 rounded-xl transition shadow"
              >
                Start Pro Trial
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Start replying smarter today
          </h2>
          <p className="text-indigo-200 text-base">
            Join hundreds of local businesses saving hours every week with
            AI-generated review replies.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold text-base px-8 py-3.5 rounded-xl shadow transition"
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-indigo-300 text-sm">No credit card required</p>
        </div>
      </section>

      {/* ── 7. FOOTER ───────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4 text-center">
        <p className="text-sm text-gray-400">&copy; 2026 ReplyMate. All rights reserved.</p>
      </footer>

    </div>
  );
}
