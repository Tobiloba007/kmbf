/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  LayoutGrid,
} from "lucide-react";

// Mock Lookbook with 30 Images
const LOOKBOOK_IMAGES = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  src: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
  ][index % 10],
  alt: `ZTTW Lookbook Item ${index + 1}`,
}));

// Utility helper to chunk array into blocks of 20
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const SLIDESHOW_INTERVAL = 3000; // 3 seconds per image

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Swipe gesture tracking state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const selectedImage =
    selectedIndex !== null ? LOOKBOOK_IMAGES[selectedIndex] : null;

  // Split images into blocks of 20 for lg/xl screens
  const imageBlocks = chunkArray(LOOKBOOK_IMAGES, 20);

  // Manual image navigation
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setProgress(0);
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? LOOKBOOK_IMAGES.length - 1 : (prev as number) - 1,
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setProgress(0);
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === LOOKBOOK_IMAGES.length - 1 ? 0 : (prev as number) + 1,
      );
    }
  };

  // Touch Swipe Handlers for mobile & touch devices
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Thumbnail strip scroll controls
  const handleScrollLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: -140, behavior: "smooth" });
    }
  };

  const handleScrollRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: 140, behavior: "smooth" });
    }
  };

  // Toggle Slideshow Play/Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  // Toggle Thumbnail Strip Visibility
  const toggleThumbnails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowThumbnails((prev) => !prev);
  };

  // Toggle Browser Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keep fullscreen state updated
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Smooth Progress Bar & Slideshow Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isPlaying && selectedIndex !== null) {
      const fpsStep = 16;

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (fpsStep / SLIDESHOW_INTERVAL) * 100;
        });
      }, fpsStep);

      interval = setInterval(() => {
        setSelectedIndex((prev) =>
          prev === LOOKBOOK_IMAGES.length - 1 ? 0 : (prev as number) + 1,
        );
        setProgress(0);
      }, SLIDESHOW_INTERVAL);
    } else {
      setProgress(0);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, selectedIndex]);

  const closeModal = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setSelectedIndex(null);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#111] flex flex-col justify-between">
      <Navbar dark />

      {/* Main Grid Section */}
      <section className="px-3.5 pt-8 pb-12 sm:px-7 md:pt-9 lg:pt-10 lg:px-12 max-w-360 w-full mx-auto flex-grow">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111] mb-8 sm:mb-10">
          LOOKBOOK
        </h1>

        {/* Dynamic Image Blocks (20 images per block on lg/xl) */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {imageBlocks.map((block, blockIdx) => (
            <div
              key={`block-${blockIdx}`}
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 sm:gap-3.5 lg:gap-4 w-full"
            >
              {block.map((img) => {
                const globalIndex = img.id - 1;

                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      setSelectedIndex(globalIndex);
                      setIsPlaying(false);
                    }}
                    className="group relative aspect-[3/4] w-full overflow-hidden bg-gray-200 focus:outline-none cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 10vw"
                      className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-90"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/85 backdrop-blur-md pt-0 pb-2 select-none transition-all duration-300 ease-out"
          onClick={closeModal}
        >
          {/* Top Full-Width Edge Progress Bar */}
          <div className="fixed inset-x-0 top-0 z-50 h-0.5 w-screen overflow-hidden bg-white/10 pointer-events-none">
            <div
              className="bg-white h-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="p-1 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleThumbnails}
                className={`p-1 transition-all duration-200 hover:scale-110 active:scale-95 ${
                  showThumbnails
                    ? "opacity-100 text-white"
                    : "opacity-40 text-white/60 hover:opacity-80"
                }`}
                title={showThumbnails ? "Hide thumbnails" : "Show thumbnails"}
                aria-label="Toggle thumbnails"
              >
                <LayoutGrid size={18} />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="p-1 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Main Featured Center Image Container with Swipe Support */}
          <div
            className="relative flex-1 my-2 w-full flex items-center justify-center px-8 sm:px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-full max-h-[50vh] sm:max-h-[68vh] aspect-[3/4] border-2 border-white shadow-2xl transition-all duration-500 ease-out transform scale-100">
              <Image
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                priority
                className="object-cover transition-opacity duration-300 ease-out"
              />
            </div>
          </div>

          {/* Bottom Horizontal Thumbnail Strip */}
          <div
            className={`w-full bg-black/70 py-3 px-2 flex items-center border-t border-white/10 transition-all duration-300 ease-out overflow-hidden ${
              showThumbnails
                ? "max-h-36 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-4 py-0 border-transparent pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleScrollLeft}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 shrink-0"
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeft size={22} />
            </button>

            <div
              ref={stripRef}
              className="w-full overflow-x-auto no-scrollbar flex items-center gap-2.5 px-2 scroll-smooth"
            >
              {LOOKBOOK_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setProgress(0);
                  }}
                  className={`relative shrink-0 aspect-[3/4] h-20 sm:h-24 lg:h-28 transition-all duration-300 ease-out border ${
                    idx === selectedIndex
                      ? "border-white scale-105 opacity-100 shadow-md"
                      : "border-transparent opacity-40 hover:opacity-80 hover:scale-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleScrollRight}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 shrink-0"
              aria-label="Scroll thumbnails right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

      {/* Footer Divider & Footer */}
      <div>
        <div className="mx-3.5 sm:mx-7 lg:mx-12 mt-12 mb-8 border-b border-black/20" />
        <Footer />
      </div>
    </main>
  );
};

export default Page;
