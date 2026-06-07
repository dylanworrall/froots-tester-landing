/// /checkout/cancel — landing page Stripe redirects to when the user
/// closes Checkout without paying. A small "no charge, try again any
/// time" page that links back to /pricing.

import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-zinc-200/60 p-8 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-3">
          No charge
        </h1>
        <p className="text-zinc-600 mb-6">
          You closed checkout before paying. Nothing was charged. You can
          go back to pricing whenever you&apos;re ready.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-5 py-2 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-700"
        >
          Back to pricing
        </Link>
      </div>
    </div>
  );
}
