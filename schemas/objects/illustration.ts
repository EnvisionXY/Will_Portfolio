import { defineType, defineField } from "sanity";

const illustration = defineType({
  name: "illustration",
  title: "Illustration",
  type: "object",
  fields: [
    // Exact same pattern as your working aboutPhoto field
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    // Title field for the image
    defineField({
      name: "title",
      title: "Title",
      type: "text",
    }),
    // Optional text field for styling later
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
    // Layout option for left/right positioning
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order in the carousel (1 = first)",
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export default illustration;
