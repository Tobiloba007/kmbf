"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const UnderDevelopment = () => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222] flex flex-col justify-between overflow-x-hidden selection:bg-black selection:text-[#f5f2ec]">
      <Navbar dark />

      {/* Hero Section with Ambient Glow Background */}
      <section className="relative w-full flex-grow flex items-center justify-center px-4 sm:px-7 lg:px-12 py-20 pt-24 md:pt-28 lg:pt-32">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-black/5 via-black/3 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">
          {/* Animated Status Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#111] bg-black/5 border border-black/10 rounded-full backdrop-blur-xs mb-8 shadow-xs">
              {/* Pulsing Live Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
              </span>
              Under Development
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111] uppercase leading-[1.1]">
            SOMETHING NEW IS <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-black via-black/70 to-black bg-clip-text text-transparent">
              IN THE WORKS
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed tracking-wide text-black/75 max-w-xl mx-auto font-normal">
            We are crafting something exceptional for you. This experience is
            currently being refined and will be launching very soon.
          </p>

          {/* Interactive Editorial Image Card (Works on Mobile Touch & Desktop Hover) */}
          <div
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            onClick={() => setIsTouched((prev) => !prev)}
            className="group relative w-full max-w-md aspect-16/9 my-10 rounded-sm overflow-hidden border border-black/15 shadow-md bg-black/5 transition-all duration-500 active:scale-[0.98] cursor-pointer"
          >
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="KMBF Editorial Preview"
              fill
              priority
              className={`object-cover transition-all duration-700 ease-out ${
                isTouched
                  ? "grayscale-0 scale-105"
                  : "grayscale group-hover:grayscale-0 group-hover:scale-105"
              }`}
            />

            {/* Floating Glassmorphic Overlay Badge */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500 flex items-end justify-center pb-4 ${
                isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <span className="text-[11px] text-white tracking-widest font-semibold uppercase backdrop-blur-xs px-3 py-1 bg-black/40 border border-white/20">
                KMBF / Exclusive Preview
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="group relative w-full sm:w-auto px-9 py-3.5 bg-[#111] text-[#f5f2ec] text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-black active:scale-[0.98] text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Return Home
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto px-9 py-3.5 border border-black text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-[#f5f2ec] transition-all duration-300 active:scale-[0.98] text-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Divider and Footer */}
      <div>
        <div className="mx-3.5 sm:mx-7 lg:mx-12 mb-8 border-b border-black/20" />
        <Footer />
      </div>
    </main>
  );
};

export default UnderDevelopment;
