import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({
      name: "heroImages",
      title: "Hero Background Images",
      description: "Upload the two images that rotate in the homepage intro.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(2),
    }),
    defineField({
      name: "videoSource",
      title: "Homepage Video Source",
      type: "string",
      initialValue: "url",
      options: {
        list: [
          { title: "Upload a video", value: "upload" },
          { title: "Use a video URL", value: "url" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "videoFile",
      title: "Upload Homepage Video",
      description:
        "Upload a short MP4 video. For longer videos or high traffic, use a streaming host and add its direct video URL instead.",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoSource !== "upload",
    }),
    defineField({
      name: "videoUrl",
      title: "Homepage Video URL",
      description: "Paste a direct URL to an MP4 video hosted by a video provider.",
      type: "url",
      hidden: ({ parent }) => parent?.videoSource === "upload",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Content" }),
  },
});