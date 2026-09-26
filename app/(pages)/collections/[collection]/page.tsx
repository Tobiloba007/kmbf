import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CollectionView from "./CollectionView";
import {
  ALL_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  COLLECTIONS,
} from "@/library/constants";

// Maps a URL slug (e.g. "shirts", "best-sellers", "all") to a title + product list.
const resolveCollection = (slug: string) => {
  if (slug === "all") {
    return { title: "ALL PRODUCTS", products: ALL_PRODUCTS };
  }

  const key = slug.replace(/-/g, " ").toUpperCase();

  if (PRODUCTS_BY_CATEGORY[key]) {
    return { title: key, products: PRODUCTS_BY_CATEGORY[key] };
  }

  if (COLLECTIONS[key]) {
    return { title: key, products: COLLECTIONS[key] };
  }

  return { title: "ALL PRODUCTS", products: ALL_PRODUCTS };
};

const Page = async ({
  params,
}: {
  params: Promise<{ collection: string }>;
}) => {
  const { collection } = await params;
  const { title, products } = resolveCollection(collection);

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222]">
      <Navbar dark />
      <div className="mx-auto px-3.5 pb-16 pt-8 sm:px-7 sm:pt-9 lg:px-12 lg:pb-28 lg:pt-13 xl:pb-32">
        <h1 className="mb-7 text-2xl font-bold tracking-wide lg:font-extrabold lg:text-3xl lg:mb-9">{title}</h1>
        <CollectionView products={products} title={title} />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
