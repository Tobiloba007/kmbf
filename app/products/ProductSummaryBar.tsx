import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/library/constants";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

type ProductSummaryBarProps = {
  product: Product;
};

const ProductSummaryBar = ({ product }: ProductSummaryBarProps) => {
  const [isProductOutOfView, setIsProductOutOfView] = useState(false);
  const [hasFooterPassed, setHasFooterPassed] = useState(false);

  useEffect(() => {
    const productSection = document.getElementById("product-details");
    const footer = document.getElementById("site-footer");

    if (!productSection || !footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "product-details") {
            setIsProductOutOfView(!entry.isIntersecting);
          }

          if (entry.target.id === "site-footer") {
            setHasFooterPassed(
              !entry.isIntersecting && entry.boundingClientRect.bottom <= 0,
            );
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(productSection);
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`bg-[#222] text-[#f5f2ec] shadow-sm drop-shadow-neutral-700 shadow-slate-900 transition-transform duration-600 ${
        hasFooterPassed
          ? "static translate-y-0"
          : `fixed inset-x-0 bottom-0 z-60 ${
              isProductOutOfView ? "translate-y-0" : "translate-y-full"
            }`
      }`}
    >
      <div className="bg-[#f5f2ec] px-3.5 py-7 text-[#222] sm:px-7 md:px-8 md:py-4 lg:px-12 lg:py-4">
        <div className="mx-auto flex max-w-360 flex-col gap-4.5 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="text-[15px] text-center font-bold uppercase leading-tight md:text-lg xl:text-lg">
            {product.name}
            <span className="mx-3 font-normal text-sm xl:text-[15px]">
              &#8226;
            </span>
            <span className="font-normal text-sm xl:text-[15px]">
              {formatPrice(product.price)}
            </span>
          </p>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center border rounded-sm border-[#222] text-sm uppercase transition-colors hover:bg-[#222] hover:text-[#f5f2ec] md:w-64 md:h-12 lg:w-80"
          >
            Continue To Checkout
            <ChevronUp size={16} strokeWidth={1.5} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSummaryBar;
