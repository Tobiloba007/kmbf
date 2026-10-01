/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-27";

export const client = createClient({
  // Fallback to a placeholder string if missing during static page generation
  projectId: projectId || "placeholder_project_id",
  dataset,
  apiVersion,
  useCdn: true,
});

export const contentClient = client.withConfig({ useCdn: false });

const imageBuilder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return null;
  return imageBuilder.image(source);
}