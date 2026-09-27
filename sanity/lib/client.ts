import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-27";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const imageBuilder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}