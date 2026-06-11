import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Simple pricing
        </h1>
        <p className="text-gray-500">
          Start free. Upgrade when your reviews keep coming.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Free</h2>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            $0
            <span className="text-base font-normal text-gray-400"> forever</span>
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-8">
            <li>10 AI-generated review replies</li>
            <li>3 tones: professional, friendly, apologetic</li>
            <li>Reply history</li>
          </ul>
          <Link
            href="/signup"
            className="block text-center border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition"
          >
            Get started
          </Link>
        </div>

        <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most popular
          </span>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Pro</h2>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            $9
            <span className="text-base font-normal text-gray-400"> /month</span>
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-8">
            <li>Unlimited review replies</li>
            <li>All tones included</li>
            <li>Full reply history</li>
            <li>Cancel anytime</li>
          </ul>
          <Link
            href="/billing"
            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </main>
  );
}
