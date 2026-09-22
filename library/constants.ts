export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  backImage?: string;
  slug: string;
};

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?q=80&w=1200&auto=format&fit=crop`;

// Rotates through the known-good photo set to stand in as a "back" shot per product.
const BACK_IMAGE_MAP: Record<string, string> = {
  "photo-1521572163474-6864f9cf17ab": "photo-1551028719-00167b16eac5",
  "photo-1551028719-00167b16eac5": "photo-1556821840-3a63f95609a7",
  "photo-1556821840-3a63f95609a7": "photo-1520975916090-3105956dac38",
  "photo-1520975916090-3105956dac38": "photo-1591195853828-11db59a44f6b",
  "photo-1591195853828-11db59a44f6b": "photo-1594633312681-425c7b97ccd1",
  "photo-1594633312681-425c7b97ccd1": "photo-1521369909029-2afed882baee",
  "photo-1521369909029-2afed882baee": "photo-1483985988355-763728e1935b",
  "photo-1483985988355-763728e1935b": "photo-1521572163474-6864f9cf17ab",
};

const unsplashBack = (frontPhotoId: string) =>
  unsplash(BACK_IMAGE_MAP[frontPhotoId] ?? frontPhotoId);

export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  SHIRTS: [
    {
      id: "shirt-hero-armless-black",
      name: "Hero Armless Tee - Black",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "hero-armless-tee-black",
    },
    {
      id: "shirt-hero-armless-white",
      name: "Hero Armless Tee - White",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "hero-armless-tee-white",
    },
  ],
  JACKETS: [
    {
      id: "jacket-27w-black",
      name: "27W Varsity Jacket - Black",
      price: 450000,
      image: unsplash("photo-1551028719-00167b16eac5"),
      backImage: unsplashBack("photo-1551028719-00167b16eac5"),
      slug: "27w-varsity-jacket-black",
    },
    {
      id: "jacket-27w-green",
      name: "27W Varsity Jacket - Green",
      price: 450000,
      image: unsplash("photo-1551028719-00167b16eac5"),
      backImage: unsplashBack("photo-1551028719-00167b16eac5"),
      slug: "27w-varsity-jacket-green",
    },
  ],
  HOODIES: [
    {
      id: "hoodie-core-black",
      name: "Core Hoodie - Black",
      price: 320000,
      image: unsplash("photo-1556821840-3a63f95609a7"),
      backImage: unsplashBack("photo-1556821840-3a63f95609a7"),
      slug: "core-hoodie-black",
    },
  ],
  SWEATSHIRTS: [
    {
      id: "sweatshirt-forest-drift",
      name: "Zttw Forest Drift Longsleeve",
      price: 375000,
      image: unsplash("photo-1520975916090-3105956dac38"),
      backImage: unsplashBack("photo-1520975916090-3105956dac38"),
      slug: "zttw-forest-drift-longsleeve",
    },
  ],
  SHORTS: [
    {
      id: "shorts-denim-black",
      name: "Denim Shorts - Black",
      price: 210000,
      image: unsplash("photo-1591195853828-11db59a44f6b"),
      backImage: unsplashBack("photo-1591195853828-11db59a44f6b"),
      slug: "denim-shorts-black",
    },
  ],
  PANTS: [
    {
      id: "pants-denim-black",
      name: "Denim Pants - Black",
      price: 280000,
      image: unsplash("photo-1594633312681-425c7b97ccd1"),
      backImage: unsplashBack("photo-1594633312681-425c7b97ccd1"),
      slug: "denim-pants-black",
    },
  ],
  HATS: [
    {
      id: "hat-signature-cap",
      name: "Signature Cap",
      price: 95000,
      image: unsplash("photo-1521369909029-2afed882baee"),
      backImage: unsplashBack("photo-1521369909029-2afed882baee"),
      slug: "signature-cap",
    },
  ],
  SETS: [
    {
      id: "set-patchwork-polo",
      name: "Zttw Patchwork Polo",
      price: 405000,
      image: unsplash("photo-1483985988355-763728e1935b"),
      backImage: unsplashBack("photo-1483985988355-763728e1935b"),
      slug: "zttw-patchwork-polo",
    },
  ],
};

export const ALL_PRODUCTS: Product[] = Object.values(
  PRODUCTS_BY_CATEGORY,
).flat();

export const COLLECTIONS: Record<string, Product[]> = {
  "BEST SELLERS": [
    {
      id: "best-hero-armless-black",
      name: "Hero Armless Tee - Black",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "hero-armless-tee-black",
    },
    {
      id: "best-hero-armless-white",
      name: "Hero Armless Tee - White",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "hero-armless-tee-white",
    },
    {
      id: "best-forest-drift-longsleeve",
      name: "Zttw Forest Drift Longsleeve",
      price: 375000,
      image: unsplash("photo-1520975916090-3105956dac38"),
      backImage: unsplashBack("photo-1520975916090-3105956dac38"),
      slug: "zttw-forest-drift-longsleeve",
    },
    {
      id: "best-patchwork-polo",
      name: "Zttw Patchwork Polo",
      price: 405000,
      image: unsplash("photo-1483985988355-763728e1935b"),
      backImage: unsplashBack("photo-1483985988355-763728e1935b"),
      slug: "zttw-patchwork-polo",
    },
  ],
  LATEST: [
    {
      id: "latest-27w-varsity-black",
      name: "27W Varsity Jacket - Black",
      price: 450000,
      image: unsplash("photo-1551028719-00167b16eac5"),
      backImage: unsplashBack("photo-1551028719-00167b16eac5"),
      slug: "27w-varsity-jacket-black",
    },
    {
      id: "latest-27w-varsity-green",
      name: "27W Varsity Jacket - Green",
      price: 450000,
      image: unsplash("photo-1551028719-00167b16eac5"),
      backImage: unsplashBack("photo-1551028719-00167b16eac5"),
      slug: "27w-varsity-jacket-green",
    },
    {
      id: "latest-denim-overshirt-black",
      name: "Denim Overshirt - Black",
      price: 260000,
      image: unsplash("photo-1594633312681-425c7b97ccd1"),
      backImage: unsplashBack("photo-1594633312681-425c7b97ccd1"),
      slug: "denim-overshirt-black",
    },
    {
      id: "latest-denim-pants-black",
      name: "Denim Pants - Black",
      price: 280000,
      image: unsplash("photo-1594633312681-425c7b97ccd1"),
      backImage: unsplashBack("photo-1594633312681-425c7b97ccd1"),
      slug: "denim-pants-black",
    },
    {
      id: "latest-core-hoodie-black",
      name: "Core Hoodie - Black",
      price: 320000,
      image: unsplash("photo-1556821840-3a63f95609a7"),
      backImage: unsplashBack("photo-1556821840-3a63f95609a7"),
      slug: "core-hoodie-black",
    },
    {
      id: "latest-signature-cap",
      name: "Signature Cap",
      price: 95000,
      image: unsplash("photo-1521369909029-2afed882baee"),
      backImage: unsplashBack("photo-1521369909029-2afed882baee"),
      slug: "signature-cap",
    },
    {
      id: "latest-denim-shorts-black",
      name: "Denim Shorts - Black",
      price: 210000,
      image: unsplash("photo-1591195853828-11db59a44f6b"),
      backImage: unsplashBack("photo-1591195853828-11db59a44f6b"),
      slug: "denim-shorts-black",
    },
    {
      id: "latest-patchwork-polo",
      name: "Zttw Patchwork Polo",
      price: 405000,
      image: unsplash("photo-1483985988355-763728e1935b"),
      backImage: unsplashBack("photo-1483985988355-763728e1935b"),
      slug: "zttw-patchwork-polo",
    },
  ],
  AMBITION: [
    {
      id: "ambition-armless-tee-black",
      name: "Ambitions Armless Tee - Black",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "ambitions-armless-tee-black",
    },
    {
      id: "ambition-armless-tee-white",
      name: "Ambitions Armless Tee - White",
      price: 240000,
      image: unsplash("photo-1521572163474-6864f9cf17ab"),
      backImage: unsplashBack("photo-1521572163474-6864f9cf17ab"),
      slug: "ambitions-armless-tee-white",
    },
    {
      id: "ambition-hoodie-black",
      name: "Ambitions Hoodie - Black",
      price: 320000,
      image: unsplash("photo-1556821840-3a63f95609a7"),
      backImage: unsplashBack("photo-1556821840-3a63f95609a7"),
      slug: "ambitions-hoodie-black",
    },
    {
      id: "ambition-forest-drift-longsleeve",
      name: "Ambitions Forest Drift Longsleeve",
      price: 375000,
      image: unsplash("photo-1520975916090-3105956dac38"),
      backImage: unsplashBack("photo-1520975916090-3105956dac38"),
      slug: "ambitions-forest-drift-longsleeve",
    },
    {
      id: "ambition-denim-shorts-black",
      name: "Ambitions Denim Shorts - Black",
      price: 210000,
      image: unsplash("photo-1591195853828-11db59a44f6b"),
      backImage: unsplashBack("photo-1591195853828-11db59a44f6b"),
      slug: "ambitions-denim-shorts-black",
    },
    {
      id: "ambition-denim-pants-black",
      name: "Ambitions Denim Pants - Black",
      price: 280000,
      image: unsplash("photo-1594633312681-425c7b97ccd1"),
      backImage: unsplashBack("photo-1594633312681-425c7b97ccd1"),
      slug: "ambitions-denim-pants-black",
    },
    {
      id: "ambition-27w-varsity-black",
      name: "27W Varsity Jacket - Black",
      price: 450000,
      image: unsplash("photo-1551028719-00167b16eac5"),
      backImage: unsplashBack("photo-1551028719-00167b16eac5"),
      slug: "27w-varsity-jacket-black-ambition",
    },
    {
      id: "ambition-signature-cap",
      name: "Ambitions Signature Cap",
      price: 95000,
      image: unsplash("photo-1521369909029-2afed882baee"),
      backImage: unsplashBack("photo-1521369909029-2afed882baee"),
      slug: "ambitions-signature-cap",
    },
  ],
};

export const BEST_SELLERS = COLLECTIONS["BEST SELLERS"];
export const LATEST = COLLECTIONS.LATEST;
export const AMBITION = COLLECTIONS.AMBITION;

