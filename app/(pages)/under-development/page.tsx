import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const UnderDevelopment = () => {
  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222] flex flex-col justify-between">
      <Navbar dark />

      {/* Main Hero Container */}
      <section className="w-full flex-grow flex items-center justify-center px-4 sm:px-7 lg:px-12 py-20 pt-20 md:pt-22 lg:pt-24">
        <div className="max-w-3xl w-full text-center flex flex-col items-center">
          {/* Badge */}
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#111] bg-black/5 border border-black/10 rounded-full mb-6">
            Under Development
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111] uppercase leading-tight">
            SOMETHING NEW IS <br className="hidden sm:block" />
            IN THE WORKS
          </h1>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed tracking-wide text-black/80 max-w-xl mx-auto">
            We are crafting something exceptional for you. This page is
            currently under development and will be launching very soon.
          </p>

          {/* Optional Visual Editorial Image Accent */}
          <div className="relative w-full max-w-md aspect-16/9 my-8 rounded-sm overflow-hidden border border-black/10 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="ZTTW Editorial Preview"
              fill
              priority
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111] text-[#f5f2ec] text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors text-center"
            >
              Return Home
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-3.5 border border-black text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-[#f5f2ec] transition-colors text-center"
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
