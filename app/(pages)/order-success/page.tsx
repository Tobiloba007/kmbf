// app/order-success/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle2 className="h-16 w-16 text-[#10B981] mb-4" />
      <h1 className="text-3xl font-extrabold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Thank you for your purchase. Your payment was successful and your order
        is being processed.
      </p>
      {ref && (
        <p className="text-xs text-gray-600 bg-gray-100 px-4 py-2 rounded-lg font-mono mb-8">
          Reference: {ref}
        </p>
      )}
      <Link
        href="/"
        className="rounded-xl bg-[#10B981] px-6 py-3 font-bold text-white transition-all hover:bg-[#0e9f6e]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-gray-500">
          Loading order details...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
