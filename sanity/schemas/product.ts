import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Base Price (NGN)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare At Price (Original Price)",
      type: "number",
      description: "Original price before discount (leave blank if not on sale)",
    }),
    defineField({
      name: "images",
      title: "Product Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    // defineField({
    //   name: "category",
    //   title: "Category",
    //   type: "reference",
    //   to: [{ type: "category" }],
    // }),
    defineField({
  name: "categories",
  title: "Categories",
  type: "array",
  description: "Select one or more categories for this product (e.g. Shirts, Best Sellers)",
  of: [
    {
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
}),
    defineField({
      name: "collections",
      title: "Collections / Drops",
      type: "array",
      description: "Select one or more collections this product belongs to (e.g. Essentials, Summer Drop)",
      of: [
        {
          type: "reference",
          to: [{ type: "collection" }],
        },
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief summary rendered directly under the product title on the detail page.",
    }),
defineField({
      name: "variants",
      title: "Product Variants (Sizes & SKUs)",
      type: "array",
      of: [
        {
          type: "object",
          name: "variant",
          title: "Variant",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "XS", value: "XS" },
                  { title: "S", value: "S" },
                  { title: "M", value: "M" },
                  { title: "L", value: "L" },
                  { title: "XL", value: "XL" },
                  { title: "2XL", value: "2XL" },
                  { title: "3XL", value: "3XL" },
                  { title: "One Size", value: "OS" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sku",
              title: "SKU / Stock Code",
              type: "string",
            }),
            defineField({
              name: "stock",
              title: "Stock Quantity",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: "size",
              subtitle: "stock",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Size: ${title}`,
                subtitle: `In Stock: ${subtitle ?? 0}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `₦${subtitle.toLocaleString()}` : "",
        media,
      };
    },
  },
});