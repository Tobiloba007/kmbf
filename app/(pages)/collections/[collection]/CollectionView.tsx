/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import Product from "@/app/components/Product";
import {
  PRODUCTS_BY_CATEGORY,
  type Product as ProductType,
} from "@/library/constants";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "most-relevant", label: "Most Relevant" },
  { value: "best-selling", label: "Best Selling" },
  { value: "az", label: "Alphabetically, A-Z" },
  { value: "za", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, Low To High" },
  { value: "price-desc", label: "Price, High To Low" },
  { value: "date-old", label: "Date, Old To New" },
  { value: "date-new", label: "Date, New To Old" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// Reverse-lookup so the filter drawer can offer category checkboxes for a product set.
const CATEGORY_BY_PRODUCT_ID: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCTS_BY_CATEGORY).flatMap(([category, products]) =>
    products.map((product) => [product.id, category]),
  ),
);

const CollectionView = ({ products, title }: { products: ProductType[]; title: string }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState<SortValue>("featured");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Availability state
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);

  const priceBounds = useMemo<[number, number]>(() => {
    if (products.length === 0) return [0, 0];
    const prices = products.map((product) => product.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  const [minPrice, maxPrice] = priceRange ?? priceBounds;

  const availableCategories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => CATEGORY_BY_PRODUCT_ID[product.id])
            .filter(Boolean),
        ),
      ),
    [products],
  );

  const visibleProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(CATEGORY_BY_PRODUCT_ID[product.id]),
      );
    }

    if (inStockOnly && !outOfStockOnly) {
      result = result.filter((product) => (product as any).inStock ?? true);
    } else if (outOfStockOnly && !inStockOnly) {
      result = result.filter((product) => (product as any).inStock === false);
    }

    switch (sortValue) {
      case "az":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return [...result].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  }, [products, sortValue, minPrice, maxPrice, selectedCategories, inStockOnly, outOfStockOnly]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(null);
    setInStockOnly(false);
    setOutOfStockOnly(false);
  };

  return (
    <div>
      {/* Toolbar: negative margins cancel the page's side padding so it spans edge-to-edge */}
      <div className="sticky top-0 z-20 -mx-3.5 grid grid-cols-[auto_1fr_auto] border-y border-black/12 bg-[#f5f2ec] sm:-mx-7 lg:-mx-12">
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 border-r border-black/12 py-4.5 pl-3.5 pr-4 text-xs text-black font-normal tracking-wider sm:pl-9 sm:pr-9 sm:py-5 lg:pl-12 lg:text-[13px] xl:py-5.5 xl:px-16"
        >
          <Filter size={15} strokeWidth={1} color="#808080" />
          FILTERS
        </button>

        <div />

        <div className="relative border-l border-black/12">
          <button
            type="button"
            onClick={() => setIsSortOpen((open) => !open)}
            className="flex items-center justify-center gap-2 py-4.5 pl-4 pr-3.5 text-xs text-black font-normal tracking-wider sm:pl-8 sm:pr-8 sm:py-5 lg:pr-12 lg:text-[13px] xl:py-5.5 xl:px-16"
          >
            SORT BY
            {isSortOpen ? (
              <ChevronUp size={15} strokeWidth={1} color="#808080" />
            ) : (
              <ChevronDown size={15} strokeWidth={1} color="#808080" />
            )}
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsSortOpen(false)}
              />
              <ul className="absolute right-0 z-40 w-56 bg-[#f5f2ec] py-2 shadow-lg">
                {SORT_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setSortValue(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full px-5 py-2.5 text-left text-sm tracking-wide hover:bg-black/5 ${
                        option.value === sortValue ? "font-semibold" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs tracking-wide text-black/50 lg:mt-5">
        {visibleProducts.length} product
        {visibleProducts.length === 1 ? "" : "s"}
      </p>

      {/* Product grid */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-y-8 md:grid-cols-3 lg:gap-7 lg:gap-y-11 xl:gap-8 xl:gap-y-11">
        {visibleProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {/* Filter drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-[#f5f2ec] text-black transition-transform duration-300 ease-out ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-6">
          <span className="text-sm font-bold tracking-wide">FILTERS</span>
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
          >
            <X size={20} strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Availability Section */}
          <div className="mb-8 border-b border-black/15 pb-6">
            <button
              type="button"
              onClick={() => setIsAvailabilityOpen((open) => !open)}
              className="flex w-full items-center justify-between py-1 text-left"
            >
              <span className="text-sm font-medium tracking-wide">Availability</span>
              {isAvailabilityOpen ? (
                <ChevronUp size={16} strokeWidth={1.2} color="#000000" />
              ) : (
                <ChevronDown size={16} strokeWidth={1.2} color="#000000" />
              )}
            </button>

            {isAvailabilityOpen && (
              <div className="mt-4 flex flex-col gap-3">
                <label className="flex items-center gap-3 text-sm text-black/80 font-normal tracking-wide cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="size-4 rounded-none border-black/30 accent-black"
                  />
                  In Stock
                </label>

                <label className="flex items-center gap-3 text-sm text-black/80 font-normal tracking-wide cursor-pointer">
                  <input
                    type="checkbox"
                    checked={outOfStockOnly}
                    onChange={(e) => setOutOfStockOnly(e.target.checked)}
                    className="size-4 rounded-none border-black/30 accent-black"
                  />
                  Out Of Stock
                </label>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-xs font-semibold tracking-wide">PRICE</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={priceBounds[0]}
                max={maxPrice}
                value={minPrice}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), maxPrice])
                }
                className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm"
              />
              <span className="text-black/40">–</span>
              <input
                type="number"
                min={minPrice}
                max={priceBounds[1]}
                value={maxPrice}
                onChange={(e) =>
                  setPriceRange([minPrice, Number(e.target.value)])
                }
                className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          {availableCategories.length > 0 && (
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-wide">
                CATEGORY
              </h3>
              <ul className="flex flex-col gap-3">
                {availableCategories.map((category) => (
                  <li key={category}>
                    <label className="flex items-center gap-3 text-sm tracking-wide">
                      <input
                        type="checkbox"
                        checked={title === "ALL PRODUCTS" ? selectedCategories.includes(category) : true}
                        onChange={() => toggleCategory(category)}
                        disabled={title !== "ALL PRODUCTS"}
                        className="size-4 accent-black"
                      />
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-black/10 px-5 py-5">
          <button
            type="button"
            onClick={clearFilters}
            className="flex-1 border border-black py-3 text-xs font-medium tracking-wide"
          >
            CLEAR ALL
          </button>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="flex-1 bg-black py-3 text-xs font-medium tracking-wide text-white"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionView;



// "use client";

// import { useMemo, useState } from "react";
// import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
// import Product from "@/app/components/Product";
// import {
//   PRODUCTS_BY_CATEGORY,
//   type Product as ProductType,
// } from "@/library/constants";

// const SORT_OPTIONS = [
//   { value: "featured", label: "Featured" },
//   { value: "most-relevant", label: "Most Relevant" },
//   { value: "best-selling", label: "Best Selling" },
//   { value: "az", label: "Alphabetically, A-Z" },
//   { value: "za", label: "Alphabetically, Z-A" },
//   { value: "price-asc", label: "Price, Low To High" },
//   { value: "price-desc", label: "Price, High To Low" },
//   { value: "date-old", label: "Date, Old To New" },
//   { value: "date-new", label: "Date, New To Old" },
// ] as const;

// type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// // Reverse-lookup so the filter drawer can offer category checkboxes for a product set.
// const CATEGORY_BY_PRODUCT_ID: Record<string, string> = Object.fromEntries(
//   Object.entries(PRODUCTS_BY_CATEGORY).flatMap(([category, products]) =>
//     products.map((product) => [product.id, category]),
//   ),
// );

// const CollectionView = ({ products, title }: { products: ProductType[]; title: string }) => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [sortValue, setSortValue] = useState<SortValue>("featured");

//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

//   const priceBounds = useMemo<[number, number]>(() => {
//     if (products.length === 0) return [0, 0];
//     const prices = products.map((product) => product.price);
//     return [Math.min(...prices), Math.max(...prices)];
//   }, [products]);

//   const [minPrice, maxPrice] = priceRange ?? priceBounds;

//   const availableCategories = useMemo(
//     () =>
//       Array.from(
//         new Set(
//           products
//             .map((product) => CATEGORY_BY_PRODUCT_ID[product.id])
//             .filter(Boolean),
//         ),
//       ),
//     [products],
//   );

//   const visibleProducts = useMemo(() => {
//     let result = products.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice,
//     );

//     if (selectedCategories.length > 0) {
//       result = result.filter((product) =>
//         selectedCategories.includes(CATEGORY_BY_PRODUCT_ID[product.id]),
//       );
//     }

//     switch (sortValue) {
//       case "az":
//         return [...result].sort((a, b) => a.name.localeCompare(b.name));
//       case "za":
//         return [...result].sort((a, b) => b.name.localeCompare(a.name));
//       case "price-asc":
//         return [...result].sort((a, b) => a.price - b.price);
//       case "price-desc":
//         return [...result].sort((a, b) => b.price - a.price);
//       default:
//         return result;
//     }
//   }, [products, sortValue, minPrice, maxPrice, selectedCategories]);

//   const toggleCategory = (category: string) => {
//     setSelectedCategories((current) =>
//       current.includes(category)
//         ? current.filter((item) => item !== category)
//         : [...current, category],
//     );
//   };

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange(null);
//   };

//   return (
//     <div>
//       {/* Toolbar: negative margins cancel the page's side padding so it spans edge-to-edge */}
//       <div className="sticky top-0 z-20 -mx-3.5 grid grid-cols-[auto_1fr_auto] border-y border-black/12 bg-[#f5f2ec] sm:-mx-7 lg:-mx-12">
//         <button
//           type="button"
//           onClick={() => setIsFilterOpen(true)}
//           className="flex items-center justify-center gap-2 border-r border-black/12 py-4.5 pl-3.5 pr-4 text-xs text-black font-normal tracking-wider sm:pl-9 sm:pr-9 sm:py-5 lg:pl-12 lg:text-[13px] xl:py-5.5 xl:px-16"
//         >
//           <Filter size={15} strokeWidth={1} color="#808080" />
//           FILTERS
//         </button>

//         <div />

//         <div className="relative border-l border-black/12">
//           <button
//             type="button"
//             onClick={() => setIsSortOpen((open) => !open)}
//             className="flex items-center justify-center gap-2 py-4.5 pl-4 pr-3.5 text-xs text-black font-normal tracking-wider sm:pl-8 sm:pr-8 sm:py-5 lg:pr-12 lg:text-[13px] xl:py-5.5 xl:px-16"
//           >
//             SORT BY
//             {isSortOpen ? (
//               <ChevronUp size={15} strokeWidth={1} color="#808080" />
//             ) : (
//               <ChevronDown size={15} strokeWidth={1} color="#808080" />
//             )}
//           </button>

//           {isSortOpen && (
//             <>
//               <div
//                 className="fixed inset-0 z-30"
//                 onClick={() => setIsSortOpen(false)}
//               />
//               <ul className="absolute right-0 z-40 w-56 bg-[#f5f2ec] py-2 shadow-lg">
//                 {SORT_OPTIONS.map((option) => (
//                   <li key={option.value}>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSortValue(option.value);
//                         setIsSortOpen(false);
//                       }}
//                       className={`block w-full px-5 py-2.5 text-left text-sm tracking-wide hover:bg-black/5 ${
//                         option.value === sortValue ? "font-semibold" : ""
//                       }`}
//                     >
//                       {option.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </div>

//       <p className="mt-4 text-xs tracking-wide text-black/50 lg:mt-5">
//         {visibleProducts.length} product
//         {visibleProducts.length === 1 ? "" : "s"}
//       </p>

//       {/* Product grid */}
//       <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-y-8 md:grid-cols-3 lg:gap-7 lg:gap-y-11 xl:gap-8 xl:gap-y-11">
//         {visibleProducts.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </div>

//       {/* Filter drawer */}
//       <div
//         className={`fixed inset-0 z-40 transition-opacity duration-300 ${
//           isFilterOpen ? "opacity-100" : "pointer-events-none opacity-0"
//         }`}
//         aria-hidden="true"
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-[#f5f2ec] text-black transition-transform duration-300 ease-out ${
//           isFilterOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between border-b border-black/10 px-5 py-6">
//           <span className="text-sm font-bold tracking-wide">FILTERS</span>
//           <button
//             type="button"
//             aria-label="Close filters"
//             onClick={() => setIsFilterOpen(false)}
//           >
//             <X size={20} strokeWidth={1} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 py-6">
//           <div className="mb-8">
//             <h3 className="mb-4 text-xs font-semibold tracking-wide">PRICE</h3>
//             <div className="flex items-center gap-3">
//               <input
//                 type="number"
//                 min={priceBounds[0]}
//                 max={maxPrice}
//                 value={minPrice}
//                 onChange={(e) =>
//                   setPriceRange([Number(e.target.value), maxPrice])
//                 }
//                 className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm"
//               />
//               <span className="text-black/40">–</span>
//               <input
//                 type="number"
//                 min={minPrice}
//                 max={priceBounds[1]}
//                 value={maxPrice}
//                 onChange={(e) =>
//                   setPriceRange([minPrice, Number(e.target.value)])
//                 }
//                 className="w-full border border-black/20 bg-transparent px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           {availableCategories.length > 0 && (
//             <div>
//               <h3 className="mb-4 text-xs font-semibold tracking-wide">
//                 CATEGORY
//               </h3>
//               <ul className="flex flex-col gap-3">
//                 {availableCategories.map((category) => (
//                   <li key={category}>
//                     <label className="flex items-center gap-3 text-sm tracking-wide">
//                       <input
//                         type="checkbox"
//                         checked={title === "ALL PRODUCTS" ? selectedCategories.includes(category) : true}
//                         onChange={() => toggleCategory(category)}
//                         disabled={title !== "ALL PRODUCTS"}
//                         className="size-4 accent-black"
//                       />
//                       {category}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-3 border-t border-black/10 px-5 py-5">
//           <button
//             type="button"
//             onClick={clearFilters}
//             className="flex-1 border border-black py-3 text-xs font-medium tracking-wide"
//           >
//             CLEAR ALL
//           </button>
//           <button
//             type="button"
//             onClick={() => setIsFilterOpen(false)}
//             className="flex-1 bg-black py-3 text-xs font-medium tracking-wide text-white"
//           >
//             APPLY
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollectionView;
