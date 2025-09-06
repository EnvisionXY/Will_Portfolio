import { defineType, defineField } from "sanity";

const illustration = defineType({
  name: "illustration",
  title: "Illustration",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "text", type: "text" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Bild links / Text rechts", value: "image-left" },
          { title: "Bild rechts / Text links", value: "image-right" },
        ],
      },
      initialValue: "image-left",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default illustration;
