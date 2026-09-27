"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product as ProductType } from "@/library/constants";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

const Product = ({ product }: { product: ProductType }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Swipe gesture tracking state for mobile/tablet
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = [product.image, product.backImage ?? product.image];

  const minSwipeDistance = 30; // Min px threshold to trigger swipe

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
      // Swipe left -> Next image (Back)
      setActiveImageIndex(1);
    } else if (isRightSwipe) {
      // Swipe right -> Previous image (Front)
      setActiveImageIndex(0);
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image Container */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#efeae1]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Mobile & Tablet Slider (< lg) */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out lg:hidden"
          style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={src}
                alt={`${product.name} view ${idx + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={`object-contain p-6 ${
                  idx === 1 && !product.backImage ? "scale-x-[-1]" : ""
                }`}
              />
            </div>
          ))}
        </div>

        {/* Desktop Hover Transition (lg and above) */}
        <div className="hidden lg:block">
          <Image
            src={images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />
          <Image
            src={images[1]}
            alt={`${product.name} - back`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`object-contain p-6 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 ${
              !product.backImage ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
      </div>

      {/* Product Details & Indicator Bar */}
      <div className="mt-2.5 px-3 lg:px-4.5 xl:px-5">
        {/* Mobile & Tablet Slide Progress Indicator Bar (< lg) */}
        <div className="relative h-[2px] w-full max-w-[140px] bg-black/15 overflow-hidden lg:hidden">
          <div
            className="absolute top-0 bottom-0 bg-black transition-all duration-300 ease-out"
            style={{
              width: "50%",
              left: `${activeImageIndex * 50}%`,
            }}
          />
        </div>

        {/* Name and Price */}
        <div className="mt-3 lg:mt-0">
          <p className="text-[13px] font-normal text-primary md:text-xs">
            {product.name}
          </p>
          <p className="text-[13px] text-black/60 md:text-xs mt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
