import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Project title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) =>
        Rule.required().error("Slug is required for URL generation"),
    }),

    // Selected Works Section
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags shown in project previews",
    }),
    defineField({
      name: "hoverText",
      title: "Hover Text",
      type: "string",
      description: "Short description shown on project cards (main page)",
    }),

    // Project Details Section
    defineField({
      name: "overview",
      title: "Project Overview",
      type: "text",
      description: "Brief project description",
      rows: 3,
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      description: "Your role in this project",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key features or accomplishments",
    }),
    defineField({
      name: "links",
      title: "Project Links",
      type: "object",
      fields: [
        {
          name: "live",
          title: "Live Site",
          type: "url",
          description: "Link to the live project",
        },
        {
          name: "repo",
          title: "Repository",
          type: "url",
          description: "Link to the code repository",
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: "images",
      title: "Project Images",
      type: "array",
      of: [{ type: "illustration" }],
      description: "Images with optional descriptions - drag & drop to reorder",
      options: {
        layout: "grid", // Better visual layout for images
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 999,
      description: "Lower numbers appear first in project lists",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "hoverText",
      media: "images.0.image", // Uses first project image as preview
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
});
