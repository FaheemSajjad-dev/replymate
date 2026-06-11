"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function navLink(href: string, label: string) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`text-sm font-medium transition ${
          active
            ? "text-indigo-600"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 grid grid-cols-3 items-center">

        {/* Logo — left (hidden on dashboard) */}
        <div className="justify-self-start">
          {!isDashboard && (
            <Link
              href="/dashboard"
              className="text-lg font-bold text-indigo-600 tracking-tight"
            >
              ReplyMate
            </Link>
          )}
        </div>

        {/* Nav links — center
            Dashboard: only History
            All other pages: Generate + History */}
        <div className="flex items-center justify-center gap-6">
          {!isDashboard && navLink("/generate", "Generate")}
          {navLink("/history", "History")}
        </div>

        {/* Right side — Log out (redirects to home) */}
        <div className="justify-self-end">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-400 hover:text-red-500 transition"
          >
            Log out
          </button>
        </div>

      </div>
    </nav>
  );
}
