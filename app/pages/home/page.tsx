import HomeIntro from "./HomeIntro";
import Category from "./Category";
import VideoSection from "./VideoSection";
import Image from "next/image";
import Link from "next/link";
import { BEST_SELLERS, LATEST, AMBITION } from "@/library/constants";
import Footer from "@/app/components/Footer";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <HomeIntro />
      <Category
        title="BEST SELLERS"
        showButton
        products={BEST_SELLERS}
        href="/shop"
      />
      <Category
        title="LATEST"
        showButton
        products={LATEST}
        href="/shop"
        showViewMore
      />
      <VideoSection />
      <Category
        title="AMBITION"
        showButton
        products={AMBITION}
        href="/shop"
        showViewMore
      />
      <div className="w-full h-full bg-[#f5f2ec] px-3.5 pt-4 sm:px-7 md:pt-0 md:grid md:grid-cols-2 md:gap-x-5 md:items-stretch lg:gap-x-8 lg:px-12 xl:gap-x-8">
        <div className="relative order-2 h-115 w-full overflow-hidden bg-black md:order-2 md:my-12 md:h-auto md:min-h-0 md:self-stretch">
          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop"
            alt="Zero to the World collection"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-4 text-center text-white">
            <p className="text-2xl font-medium leading-none">
              ZERO TO THE WORLD
            </p>
            <Link
              href="/shop"
              className="mt-11 border border-white px-5 py-4 text-[15px] rounded leading-none transition-colors md:py-5 md:px-6 hover:bg-white hover:text-black"
            >
              VIEW
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-1 w-full h-full">
          <Category products={BEST_SELLERS} href="/shop" flush />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
