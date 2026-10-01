"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop",
];

const FADE_INTERVAL = 5000; // Time each image stays visible (5 seconds)

type HomeIntroProps = {
  images?: string[];
};

const HomeIntro = ({ images = HERO_IMAGES }: HomeIntroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, FADE_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-[75vh] min-h-[420px] lg:h-screen w-full overflow-hidden bg-black">
      {/* Background Images Crossfade */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          } transition-transform duration-[6000ms] ease-out`}
        >
          <Image
            src={src}
            alt={`Fashion hero ${index + 1}`}
            fill
            priority={index === 0}
            loading={index === 1 ? "eager" : undefined}
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Navbar positioned on top */}
      <div className="relative z-10">
        <Navbar />
      </div>
    </div>
  );
};

export default HomeIntro;
