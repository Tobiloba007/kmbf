/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Ruler,
  Truck,
} from "lucide-react";
import { use, useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import RelatedProducts from "../RelatedProducts";
import ProductSummaryBar from "../ProductSummaryBar";
import FAQ from "@/app/components/FAQ";
import ShopBenefits from "@/app/components/ShopBenefits";
import Footer from "@/app/components/Footer";
import { useCartStore } from "@/app/store/useCartStore";
import { useRouter, notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export interface SanityVariant {
  size: string;
  sku?: string;
  stock?: number;
}

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  description?: any;
  freeShippingThreshold?: string;
  shippingAndReturns?: any;
  images?: string[];
  category?: string;
  collections?: string[];
  variants?: SanityVariant[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

function ProductDetailContent({ product }: { product: SanityProduct }) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder.jpg"];

  const availableSizes =
    product.variants && product.variants.length > 0
      ? product.variants.map((v) => v.size)
      : ["S", "M", "L", "XL", "2XL", "3XL"];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [returnsOpen, setReturnsOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: images[0],
      quantity: quantity,
      _id: undefined
    });
    router.push("/cart");
  };

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222]">
      <Navbar dark />
      <div
        id="product-details"
        className="mx-auto grid max-w-360 gap-6 px-3.5 pb-12 pt-8 sm:gap-8 sm:px-7 sm:pt-9 md:grid-cols-2 md:gap-10 md:px-8 md:pt-9 lg:gap-16 lg:px-12 lg:pt-10 xl:gap-28 xl:pt-10"
      >
        {/* Gallery Section */}
        <section>
          <div className="group relative aspect-square overflow-hidden bg-[#efeae1]">
            {images[activeImage] && (
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-8 sm:p-12 md:p-10 lg:p-16"
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous product image"
                  onClick={() =>
                    setActiveImage(
                      (activeImage + images.length - 1) % images.length,
                    )
                  }
                  className="group/arrow absolute left-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center overflow-hidden bg-white/75 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:left-4 md:size-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-full bg-[#efeae1] transition-transform duration-300 ease-out group-hover/arrow:translate-y-0"
                  />
                  <ChevronLeft
                    className="relative z-10"
                    size={22}
                    strokeWidth={1}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Next product image"
                  onClick={() =>
                    setActiveImage((activeImage + 1) % images.length)
                  }
                  className="group/arrow absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center overflow-hidden bg-white/75 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:right-4 md:size-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-full bg-[#efeae1] transition-transform duration-300 ease-out group-hover/arrow:translate-y-0"
                  />
                  <ChevronRight
                    className="relative z-10"
                    size={22}
                    strokeWidth={1}
                  />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-3 grid w-full grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  aria-label={`Show product image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square overflow-hidden bg-[#efeae1] ${
                    activeImage === index ? "border-b-2 border-[#8f8a7c]" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="50px"
                    className="object-contain p-2 sm:p-3"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product Details Section */}
        <section className="md:pt-1 lg:pt-0">
          <h1 className="max-w-xl text-xl font-bold uppercase leading-tight sm:text-2xl md:text-xl lg:text-2xl">
            {product.name}
          </h1>
          <p className="mt-3 text-[15px] md:mt-3 md:text-sm lg:text-base">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-base md:text-sm lg:text-base">
            <span className="underline underline-offset-7 border-black">
              Shipping
            </span>{" "}
            Calculated At Checkout.
          </p>

          {/* Size Selector */}
          <div className="mt-8 md:mt-8 lg:mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-medium md:text-xl">Size</h2>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white md:h-6 md:w-6">
                <Ruler size={16} strokeWidth={1.5} />
              </div>
            </div>
            <p className="mt-2 text-sm">{selectedSize}</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {availableSizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 w-11 items-center justify-center rounded-sm border text-xs transition-colors lg:h-11 lg:w-12 md:text-xs ${
                    selectedSize === size
                      ? "border-black bg-[#222] text-white"
                      : "border-black/30 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-5 grid grid-cols-[1fr_1.8fr] gap-2 sm:gap-3 md:mt-5">
            <div className="flex h-12 items-center justify-between rounded-sm border border-black px-4 lg:h-13 md:px-6">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={17} strokeWidth={1.5} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={17} strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              type="button"
              className="h-12 rounded-sm bg-[#6889ba] text-xs font-medium text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#6889ba]/90 active:scale-[0.99] lg:h-13 md:text-xs"
            >
              ADD TO CART
            </button>
          </div>
          <button
            type="button"
            className="mt-3 h-12 w-full rounded-sm bg-[#222] text-[13px] font-medium text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#222]/90 active:scale-[0.99] md:mt-3 lg:h-13 md:text-xs"
          >
            BUY IT NOW
          </button>

          {/* Shipping Threshold Banner */}
          <div className="mt-7 flex items-center gap-2 text-sm md:mt-8 md:gap-3">
            <Truck size={22} strokeWidth={1} />
            {product.freeShippingThreshold ||
              "Free Shipping On Orders Over ₦200,000"}
          </div>

          {/* Product Descriptions */}
          {product.shortDescription ? (
            <p className="mt-4 max-w-xl text-base leading-snug md:mt-5">
              {product.shortDescription}
            </p>
          ) : product.description ? (
            <div className="prose prose-sm mt-4 max-w-xl text-base leading-snug md:mt-5">
              <PortableText value={product.description} />
            </div>
          ) : null}

          {/* Shipping & Returns Accordion */}
          <div className="mt-14 border-b border-black/20 md:mt-10">
            <button
              type="button"
              onClick={() => setReturnsOpen((open) => !open)}
              className="flex w-full items-center justify-between pb-4 text-left text-sm"
              aria-expanded={returnsOpen}
            >
              Shipping And Returns
              <ChevronDown
                size={18}
                strokeWidth={1}
                className={returnsOpen ? "rotate-180" : ""}
              />
            </button>
            {returnsOpen && (
              <div className="pb-4 mt-1 text-sm leading-relaxed lg:text-sm">
                {product.shippingAndReturns ? (
                  <PortableText value={product.shippingAndReturns} />
                ) : (
                  <p>
                    Orders are prepared within 2-4 business days. Returns are
                    accepted for unworn items within 14 days of delivery.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      <RelatedProducts currentProduct={product as any} />
      <FAQ />
      <ShopBenefits />
      <Footer reserveSummarySpace />
      <ProductSummaryBar product={product as any} />
    </main>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<SanityProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
        if (!data) {
          notFound();
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f2ec] text-[#222]">
        <div className="animate-pulse text-sm font-medium tracking-wide">
          LOADING PRODUCT...
        </div>
      </main>
    );
  }

  if (!product) return null;

  return <ProductDetailContent product={product} />;
}
