"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { CartItem } from "@/app/store/useCartStore";

interface OrderSummaryProps {
  cart?: CartItem[];
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  totalItemCount: number;
  variant?: "top-accordion" | "mobile-inline-accordion" | "desktop";
}

const OrderSummary = ({
  cart = [],
  subtotal = 0,
  shippingFee = 0,
  grandTotal = 0,
  totalItemCount = 0,
  variant = "desktop",
}: OrderSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const summaryContent = (
    <div className="space-y-4 py-4">
      {/* Cart Items List with pt-2 to prevent clipping top badge */}
      <div className="space-y-4 max-h-64 overflow-y-auto pt-2 pr-1">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3">
              {/* Product Thumbnail Container */}
              <div className="relative h-16 w-16 shrink-0 rounded-2xl border border-gray-200 bg-gray-100 overflow-visible">
                {/* Image Clipper Wrapper */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Quantity Badge */}
                <span className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white ring-2 ring-white shadow-sm">
                  {item.quantity}
                </span>
              </div>

              <div>
                <p className="font-normal text-xs text-gray-900 xl:text-[13px]">{item.name}</p>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
            </div>
            <span className="font-medium text-gray-900">
              ₦{formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Discount Field */}
      <div className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-3 text-sm outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]"
        />
        <button
          type="button"
          className="rounded-lg bg-gray-200 px-5 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Price Calculations */}
      <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>
            Subtotal · {totalItemCount}{" "}
            {totalItemCount === 1 ? "item" : "items"}
          </span>
          <span className="font-medium text-gray-900">
            ₦{formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            Shipping <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
          </span>
          <span className="font-medium text-gray-900">
            ₦{formatCurrency(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
          <span>Total</span>
          <span className="flex items-baseline gap-1">
            <span className="text-xs font-normal text-gray-500">NGN</span>
            <span className="text-lg">₦{formatCurrency(grandTotal)}</span>
          </span>
        </div>
      </div>
    </div>
  );

  /* Variant 1: Top Collapsible Banner (< lg) */
  if (variant === "top-accordion") {
    return (
      <div className="w-full border-b border-gray-200 bg-[#f8f9fa] lg:hidden">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between px-4 py-4 sm:px-8 text-sm text-[#10B981] max-w-2xl mx-auto"
        >
          <span className="flex items-center gap-1.5 font-medium">
            Order summary
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
          <span className="text-lg font-bold text-gray-900">
            ₦{formatCurrency(grandTotal)}
          </span>
        </button>
        {isExpanded && (
          <div className="max-w-2xl mx-auto px-4 sm:px-8">{summaryContent}</div>
        )}
      </div>
    );
  }

  /* Variant 2: Bottom Collapsible Accordion Dropdown Above Pay Button (< lg) */
  if (variant === "mobile-inline-accordion") {
    return (
      <div className="rounded-xl border border-gray-200 bg-[#F5F5F5] overflow-hidden lg:hidden">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-4 sm:p-5 text-sm text-[#10B981] font-medium"
        >
          <span className="flex items-center gap-1.5 font-bold text-gray-900 text-base">
            Order summary
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-[#10B981]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#10B981]" />
            )}
          </span>
          <span className="text-lg font-bold text-gray-900">
            ₦{formatCurrency(grandTotal)}
          </span>
        </button>
        {isExpanded && (
          <div className="px-4 pb-2 sm:px-5 border-t border-gray-200 bg-white">
            {summaryContent}
          </div>
        )}
      </div>
    );
  }

  /* Variant 3: Desktop Sidebar Content (>= lg) */
  return summaryContent;
};

export default OrderSummary;
