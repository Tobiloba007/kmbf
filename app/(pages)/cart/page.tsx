/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Lock, ChevronDown, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/app/store/useCartStore";

const Page = () => {
  // Prevent hydration mismatch when using localStorage persistence
  const [mounted, setMounted] = useState(false);

  const {
    cartItems,
    orderNote,
    isGiftOpen,
    updateQuantity,
    removeItem,
    setOrderNote,
    toggleGiftOpen,
    getTotalQuantity,
    getSubtotal,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalQuantity = getTotalQuantity();
  const subtotal = getSubtotal();

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} NGN`;
  };

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#111] flex flex-col justify-between font-sans">
      <Navbar dark />

      <section className="px-3.5 py-12 sm:px-7 md:py-15 lg:py-20 lg:px-12 max-w-360 w-full mx-auto flex-grow transition-all duration-300">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Column: Cart Header & Items List */}
            <div className="md:col-span-7 lg:col-span-8 xl:col-span-9 flex flex-col">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#d8d1c5]">
                <p className="text-sm sm:text-sm lg:text-base font-normal tracking-wide text-[#111]">
                  Cart ({totalQuantity})
                </p>
                <Link
                  href="/collections/all"
                  className="px-4 py-2.5 border border-black text-xs font-normal tracking-widest uppercase rounded hover:bg-black hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] lg:px-5"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#d8d1c5] border-b border-[#d8d1c5]">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="py-4 flex gap-4 sm:gap-6 transition-all duration-300 hover:bg-black/[0.01]"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative aspect-square w-24 sm:w-24 h-24 shrink-0 bg-[#ebe6dd] overflow-hidden group">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover p-1 transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Item Info & Actions */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h2 className="text-sm sm:text-sm font-normal leading-snug text-[#111] lg:text-base">
                            {item.name}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Size: {item.size}
                          </p>
                        </div>

                        {/* Price */}
                        <p className="text-[13px] sm:text-sm font-normal text-[#111] whitespace-nowrap lg:text-base">
                          {formatCurrency(item.price).replace(" NGN", "")}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-[11px] tracking-wider uppercase text-[#111] hover:underline transition-opacity duration-200 hover:opacity-80 lg:text-xs"
                        >
                          REMOVE
                        </button>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#9a9997] px-2 py-2 rounded transition-colors duration-200 hover:border-black">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.size, -1)
                            }
                            className="px-1.5 text-gray-500 hover:text-black transition-colors duration-150 active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-[13px] font-normal">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.size, 1)
                            }
                            className="px-1.5 text-gray-500 hover:text-black transition-colors duration-150 active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Subtotal & Checkout Actions */}
            <div className="md:col-span-5 lg:col-span-4 xl:col-span-3 flex flex-col">
              {/* Subtotal Row */}
              <div className="flex items-baseline justify-between border-b border-[#d8d1c5] pb-6 md:flex-col md:pb-5 xl:flex-row flex-wrap">
                <span className="text-sm sm:text-xs font-normal tracking-widest uppercase text-[#111]">
                  SUBTOTAL
                </span>
                <span className="text-2xl sm:text-2xl xl:text-[21px] font-medium tracking-tight text-[#111]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Is This A Gift? Accordion */}
              <div className="border-b border-[#d8d1c5]">
                <button
                  type="button"
                  onClick={toggleGiftOpen}
                  className="w-full flex items-center justify-between py-4 text-xs sm:text-xs font-normal text-[#111] hover:opacity-80 transition-opacity"
                >
                  <span>Is This A Gift?</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1}
                    className={`transition-transform duration-300 ease-out ${
                      isGiftOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Animated Gift Note Drawer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isGiftOpen
                      ? "max-h-56 opacity-100 pb-5 translate-y-0"
                      : "max-h-0 opacity-0 pb-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <label
                    htmlFor="order-note"
                    className="block text-xs font-normal text-[#111] mb-2"
                  >
                    Leave A Note About Your Order
                  </label>
                  <textarea
                    id="order-note"
                    rows={4}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full bg-transparent border border-[#d8d1c5] rounded-xs p-3 text-xs text-[#111] focus:outline-none focus:border-black transition-colors duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Check Out Button */}
              <button
                type="button"
                className="mt-6 w-full bg-[#1c1c1c] text-white py-3.5 px-6 flex items-center justify-center rounded gap-2 text-xs font-medium tracking-widest uppercase hover:bg-black transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Lock size={14} className="mb-0.5" />
                <span>CHECK OUT</span>
              </button>

              {/* Shipping Notice */}
              <p className="mt-4 text-[13px] italic text-primary leading-relaxed">
                Shipping, Taxes, And Discount Codes Are Calculated At Checkout
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h2 className="text-xl font-normal tracking-wider uppercase mb-4">
              Your cart is empty
            </h2>
            <Link
              href="/collections/all"
              className="px-6 py-3 border border-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200 hover:scale-105"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
      </section>

      <div>
        <div className="mx-4 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-24 border-b border-[#d8d1c5]" />
        <Footer />
      </div>
    </main>
  );
};

export default Page;
