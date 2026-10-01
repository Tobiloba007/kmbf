"use client";

import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "@/sanity/lib/client";

// Import Schemas
import { product } from "@/sanity/schemas/product";
import { category } from "@/sanity/schemas/category";
import { collection } from "@/sanity/schemas/collection";
import { productVariant } from "@/sanity/schemas/objects/productVariant";
import { order } from "@/sanity/schemas/order";
import { homePage } from "@/sanity/schemas/homePage";
import { galleryPage } from "@/sanity/schemas/galleryPage";
import { siteSettings } from "@/sanity/schemas/siteSettings";

const singletonTypes = ["homePage", "galleryPage", "siteSettings"];

const studioStructure: StructureResolver = (S) =>
  S.list()
    .title("KMBF Content")
    .items([
      S.listItem()
        .title("Homepage Content")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Gallery Page")
        .child(
          S.document().schemaType("galleryPage").documentId("galleryPage"),
        ),
      S.listItem()
        .title("Store Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.includes(item.getId() as string),
      ),
    ]);

const config = defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  title: "KMBF Studio",
  plugins: [structureTool({ structure: studioStructure }), visionTool()],
  schema: {
    types: [
      product,
      category,
      collection,
      productVariant,
      order,
      homePage,
      galleryPage,
      siteSettings,
    ],
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
