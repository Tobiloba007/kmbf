/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeIntro from "./HomeIntro";
import Category from "./Category";
import VideoSection from "./VideoSection";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { contentClient } from "@/sanity/lib/client";
import {
  ALL_CATEGORIES_WITH_PRODUCTS_QUERY,
  HOME_PAGE_CONTENT_QUERY,
} from "@/sanity/lib/queries";

interface SanityCategoryData {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  products?: any[];
}

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const [categories, homePageContent] = await Promise.all([
    contentClient.fetch<SanityCategoryData[]>(
      ALL_CATEGORIES_WITH_PRODUCTS_QUERY,
    ),
    contentClient.fetch<{
      heroImages?: { url?: string }[];
      videoUrl?: string;
    } | null>(HOME_PAGE_CONTENT_QUERY),
  ]);

  const heroImages = homePageContent?.heroImages
    ?.map((image) => image.url)
    .filter((url): url is string => Boolean(url));

  // Filter out categories that don't have products
  const activeCategories =
    categories?.filter((cat) => cat?.products && cat?.products.length > 0) ||
    [];

  const featuredCategory = activeCategories[0];
  const featuredProducts = featuredCategory?.products || [];

  return (
    <div className="flex w-full flex-col">
      <HomeIntro images={heroImages?.length === 2 ? heroImages : undefined} />

      {/* Render active categories with automatic 8-item chunking */}
      {activeCategories.map((category, index) => {
        const isSecondCategory = index === 1;

        return (
          <div key={category._id} className="w-full">
            <Category
              title={category.title.toUpperCase()}
              showButton
              products={category.products || []}
              href={`/collections/${category.slug}`}
              pageSize={8}
            />
            {isSecondCategory && (
              <VideoSection
                src={homePageContent?.videoUrl}
                poster={heroImages?.[0]}
              />
            )}
          </div>
        );
      })}

      {/* Render VideoSection if fewer than 2 active categories exist */}
      {activeCategories.length < 2 && (
        <VideoSection
          src={homePageContent?.videoUrl}
          poster={heroImages?.[0]}
        />
      )}

      {/* Dynamic Split Banner Section */}
      {featuredCategory && (
        <div className="w-full h-full bg-[#f5f2ec] px-3.5 pt-4 sm:px-7 md:pt-0 md:grid md:grid-cols-2 md:gap-x-5 md:items-stretch lg:gap-x-8 lg:px-12 xl:gap-x-8">
          <div className="relative order-2 h-115 w-full overflow-hidden bg-black md:order-2 md:my-12 md:h-auto md:min-h-0 md:self-stretch">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop"
              alt={`${featuredCategory.title} featured collection`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-4 text-center text-white">
              <p className="text-2xl font-medium leading-none">
                ZERO TO THE WORLD
              </p>
              <Link
                href={`/collections/${featuredCategory.slug}`}
                className="mt-11 border border-white px-5 py-4 text-[15px] rounded leading-none transition-colors md:py-5 md:px-6 hover:bg-white hover:text-black"
              >
                VIEW
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-1 w-full h-full">
            <Category
              products={featuredProducts?.slice(0, 4)}
              href={`/collections/${featuredCategory.slug}`}
              flush
              pageSize={4}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
