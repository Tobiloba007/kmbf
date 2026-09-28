import { groq } from "next-sanity";

// Fetch all products for collection grids
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
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

// Fetch products belonging to a category or collection
export const PRODUCTS_BY_SLUG_QUERY = groq`
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

// Fetch Category or Collection title
export const TITLE_BY_SLUG_QUERY = groq`
  coalesce(
    *[_type == "category" && slug.current == $slug][0].title,
    *[_type == "collection" && slug.current == $slug][0].title,
    $fallbackTitle
  )
`;

// Fetch SINGLE product details for Product Detail Page (PDP)
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    shortDescription,
    description,
    freeShippingThreshold,
    shippingAndReturns,
    "images": images[].asset->url,
    "category": category->title,
    "collections": collections[]->title,
    variants[] {
      size,
      sku,
      stock
    }
  }
`;

// Fetch all collections with basic details
export const ALL_COLLECTIONS_QUERY = groq`
*[_type == "collection"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      price,
      compareAtPrice,
      "images": images[].asset->url,
      isFeatured,
      isNewArrival
    }
  }
`;

// Fetch all categories with basic details
export const ALL_CATEGORIES_WITH_PRODUCTS_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "products": coalesce(
      products[]-> {
        _id,
        name,
        "slug": slug.current,
        price,
        compareAtPrice,
        "images": images[].asset->url,
        shortDescription,
        variants
      },
      *[_type == "product" && (^._id in categories[]._ref || category._ref == ^._id)] {
        _id,
        name,
        "slug": slug.current,
        price,
        compareAtPrice,
        "images": images[].asset->url,
        shortDescription,
        variants
      }
    )
  }
`;