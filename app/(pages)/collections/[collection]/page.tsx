import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CollectionView from "./CollectionView";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { groq } from "next-sanity";

// Query to fetch products by category or collection slug
const PRODUCTS_BY_SLUG_QUERY = groq`
  *[_type == "product" && (
    category->slug.current == $slug || 
    references(*[_type == "collection" && slug.current == $slug]._id)
  )] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    "images": images[].asset->url,
    "category": category->title,
    "collections": collections[]->title,
    isFeatured,
    isNewArrival
  }
`;

// Query to get the exact title of the category or collection
const TITLE_BY_SLUG_QUERY = groq`
  coalesce(
    *[_type == "category" && slug.current == $slug][0].title,
    *[_type == "collection" && slug.current == $slug][0].title,
    $fallbackTitle
  )
`;

async function resolveCollectionData(slug: string) {
  if (!slug || slug === "all") {
    const products = await client.fetch(ALL_PRODUCTS_QUERY);
    return { title: "ALL PRODUCTS", products };
  }

  const fallbackTitle = slug.replace(/-/g, " ").toUpperCase();

  const [products, fetchedTitle] = await Promise.all([
    client?.fetch(PRODUCTS_BY_SLUG_QUERY, { slug }),
    client?.fetch(TITLE_BY_SLUG_QUERY, { slug, fallbackTitle }),
  ]);

  return {
    title: (fetchedTitle || fallbackTitle).toUpperCase(),
    products,
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{ collection: string }>;
}) => {
  const { collection } = await params;
  const { title, products } = await resolveCollectionData(collection);

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#222]">
      <Navbar dark />
      <div className="mx-auto px-3.5 pb-16 pt-8 sm:px-7 sm:pt-9 lg:px-12 lg:pb-28 lg:pt-13 xl:pb-32">
        <h1 className="mb-7 text-2xl font-bold tracking-wide lg:mb-9 lg:text-3xl lg:font-extrabold">
          {title}
        </h1>
        <CollectionView products={products} title={title} />
      </div>
      <Footer />
    </main>
  );
};

export default Page;

