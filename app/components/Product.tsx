import Image from "next/image";
import Link from "next/link";
import type { Product as ProductType } from "@/library/constants";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

// Falls back to a mirrored front shot until real back-of-garment photos are added.
const getFallbackBackImage = (url: string) => `${url}&flip=h`;

const Product = ({ product }: { product: ProductType }) => {
  const backImage = product.backImage ?? getFallbackBackImage(product.image);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden bg-[#efeae1]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />
        <Image
          src={backImage}
          alt={`${product.name} - back`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
        />
      </div>
      <div className="mt-3 px-3 lg:px-4.5 xl:px-5">
        <p className="text-[13px] font-normal text-primary md:text-xs">
          {product.name}
        </p>
        <p className="text-[13px] text-black/60 md:text-xs">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default Product;
