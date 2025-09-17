import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "keywords",
      title: "Suchbegriffe",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tagline",
      title: "Untertitel",
      type: "string",
    }),
    defineField({
      name: "contact",
      title: "Kontakt",
      type: "object",
      fields: [
        {
          name: "email",
          title: "E-Mail",
          type: "string",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "cvUrl",
          title: "Lebenslauf URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "aboutTitle",
      title: "Über mich – Titel",
      type: "string",
      initialValue: "Über mich",
    }),
    defineField({
      name: "aboutContent",
      title: "Über mich – Inhalt",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Zwischenüberschrift", value: "h3" },
            { title: "Kleine Überschrift", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Fett", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "In neuem Tab öffnen",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "highlight",
          title: "Hervorgehobener Text",
          fields: [
            {
              name: "text",
              type: "string",
              title: "Text",
            },
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({
              title: `💡 ${title}`,
              subtitle: "Hervorhebung",
            }),
          },
        },
      ],
    }),
    // Keep legacy fields for backward compatibility during migration
    defineField({
      name: "aboutPrinciple",
      title: "About – Principle (Legacy)",
      type: "text",
      description: "⚠️ Wird durch 'Über mich – Inhalt' ersetzt",
      hidden: true, // Hide in UI but keep for data migration
    }),
    defineField({
      name: "aboutPitch",
      title: "About – Text (Legacy)",
      type: "text",
      description: "⚠️ Wird durch 'Über mich – Inhalt' ersetzt",
      hidden: true, // Hide in UI but keep for data migration
    }),
    defineField({
      name: "aboutPhoto",
      title: "Über mich – Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cvFile",
      title: "Lebenslauf (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare: ({ title }) => ({
      title: title || "Website-Einstellungen",
    }),
  },
});
