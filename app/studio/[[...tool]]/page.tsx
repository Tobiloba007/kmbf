"use client";

import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "@/sanity/lib/client";

// Import Schemas
import { product } from "@/sanity/schemas/product";
import { category } from "@/sanity/schemas/category";
import { collection } from "@/sanity/schemas/collection";
import { productVariant } from "@/sanity/schemas/objects/productVariant";
import { order } from "@/sanity/schemas/order";

const config = defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  title: "KMBF Studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [product, category, collection, productVariant, order],
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}