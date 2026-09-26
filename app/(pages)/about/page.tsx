import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Page = () => {
  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222]">
      <Navbar dark />

      {/* Grid Layout Container */}
      <section className="w-full pt-0">
        {/* Section 1: Hero Image + Main Title & Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Top Left Image */}
          <div className="relative aspect-4/5 w-full md:aspect-5/4 lg:aspect-5/4">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="ZTTW Beach Editorial"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Top Right Content */}
          <div className="flex flex-col justify-center px-3.5 py-10 sm:px-7 sm:py-0 lg:px-12 xl:px-32">
            <h1 className="text-[43px] font-black tracking-tight text-[#111] sm:text-4xl lg:text-5xl xl:text-6xl uppercase leading-tight">
              ZERO TO THE
              <br />
              WORLD
            </h1>
            <p className="mt-6 text-sm sm:text-sm lg:text-[15px] leading-relaxed tracking-wide text-black max-w-xl xl:text-base">
              ZTTW Is A Streetwear Brand Inspired By The Ethos &quot;The World
              Is Yours.&quot; Based In Lagos Nigeria, ZTTW Redefines Streetwear
              With A Refined, High-Quality Approach, Crafting Timeless Pieces
              That Exude Confidence And Inspire Individuality.
            </p>
          </div>
        </div>

        {/* Section 2: Secondary Description + Group Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 md:mt-0">
          {/* Bottom Left Content (Reordered on Desktop) */}
          <div className="order-2 md:order-1 flex flex-col justify-center px-3.5 py-10 sm:px-7 lg:px-12 xl:px-32">
            <p className="mt-6 text-sm sm:text-sm lg:text-[15px] leading-relaxed tracking-wide text-black max-w-xl xl:text-base">
              Each Garment Is Designed To Elevate Any Wardrobe, Merging
              Sophistication With Streetwear Edge To Create An Iconic Look For
              The Modern World-Changer.
            </p>
          </div>

          {/* Bottom Right Image (Reordered on Desktop) */}
          <div className="order-1 md:order-2 relative aspect-3/2 w-full md:aspect-3/2 lg:aspect-3/2">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
              alt="ZTTW Community"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Subtle Divider Line matching designs */}
      <div className="mx-3.5 sm:mx-7 lg:mx-12 mt-5 mb-8 md:mt-6 md:mb-11 lg:mt-8 lg:mb-12 xl:mb-14 border-b border-black/20" />
      <Footer />
    </main>
  );
};

export default Page;
