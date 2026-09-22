import Product from "@/app/components/Product";
import { ALL_PRODUCTS, type Product as ProductType } from "@/library/constants";

type RelatedProductsProps = {
  currentProduct: ProductType;
};

const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const relatedProducts = ALL_PRODUCTS.filter(
    (product) => product.slug !== currentProduct.slug,
  ).slice(0, 4);

  return (
    <section className="bg-[#f5f2ec] px-3.5 pb-14 pt-10 sm:px-7 md:pt-22 lg:px-12 lg:pb-20 lg:pt-24 xl:pt-28">
      <h2 className="mb-5 border-b w-fit text-[13px] border-black font-normal tracking-wide sm:mb-7 lg:mb-7 lg:text-sm xl:mb-9">
        RELATED PRODUCTS
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:-mx-7 sm:flex sm:overflow-x-auto sm:px-7 sm:pb-4 sm:scroll-smooth sm:[scrollbar-width:none] lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="sm:w-[42vw] sm:min-w-[42vw] md:w-[30vw] md:min-w-[30vw] lg:w-[23vw] lg:min-w-[23vw]"
          >
            <Product product={relatedProduct} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
