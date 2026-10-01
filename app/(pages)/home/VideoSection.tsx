"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

const VideoSection = ({
  src = FALLBACK_VIDEO_URL,
  poster,
}: {
  src?: string;
  poster?: string;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f2ec]">
      <div className="relative h-[75vh] min-h-screen max-h-[120vh] w-full overflow-hidden bg-black">
        <video
          className="block h-full w-full object-cover"
          src={shouldLoadVideo ? src : undefined}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
      </div>
    </section>
  );
};

export default VideoSection;
