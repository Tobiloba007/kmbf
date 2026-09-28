import { defineType, defineField } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collections / Drops",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Collection Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "bannerImage",
    //   title: "Hero Banner Image",
    //   type: "image",
    //   options: { hotspot: true },
    // }),
    defineField({
      name: "products",
      title: "Products in Collection",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});