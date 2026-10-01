import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Store Settings",
  type: "document",
  fields: [
    defineField({
      name: "storeAddress",
      title: "Store Address",
      description: "Use a new line for each line of the address.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "xUrl",
      title: "X URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Store Settings" }),
  },
});