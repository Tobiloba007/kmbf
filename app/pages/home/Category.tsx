import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Product from "@/app/components/Product";
import type { Product as ProductType } from "@/library/constants";

type CategoryProps = {
  title?: string;
  products: ProductType[];
  href: string;
  showViewMore?: boolean;
  showButton?: boolean;
  flush?: boolean;
};

const Category = ({
  title,
  products,
  href,
  showViewMore,
  showButton,
  flush,
}: CategoryProps) => {
  return (
    <section
      className={`w-full bg-[#f5f2ec] py-12 ${
        flush ? "px-0" : "px-3.5 sm:px-7 lg:px-12"
      }`}
    >
      {(title || showButton) && (
        <div className="mb-5 flex flex-col items-start justify-between gap-3.5 w-full text-primary md:flex-row md:items-center lg:mb-7 xl:mb-9">
          {title && (
            <h2 className="text-xl font-bold tracking-wide">{title}</h2>
          )}
          {showButton && (
            <Link
              href={href}
              className="group relative flex items-center gap-1.5 overflow-hidden rounded border border-black px-4.5 py-2.5 text-xs font-medium tracking-wide lg:px-5 xl:py-3"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#efeae1] transition-transform duration-300 ease-out group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-300">
                SHOP NOW
              </span>
              <ChevronRight
                size={16}
                strokeWidth={1.5}
                className="relative z-10 transition-all duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-2 gap-x-4 gap-y-8 md:gap-y-8 ${
          flush
            ? "lg:grid-cols-2 lg:gap-7 lg:gap-y-11 xl:gap-8 xl:gap-y-11"
            : "lg:grid-cols-4 lg:gap-7 lg:gap-y-11 xl:gap-8 xl:gap-y-11"
        }`}
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {showViewMore && (
        <div className="mt-11 flex justify-center lg:mt-12">
          <Link
            href={href}
            className="text-base font-medium leading-none text-[#303236] underline decoration-1 underline-offset-1 transition-opacity hover:opacity-70"
          >
            View More
          </Link>
        </div>
      )}
    </section>
  );
};

export default Category;
