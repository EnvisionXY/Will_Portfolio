import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas"; // <— zentrale Sammelstelle
import { deskStructure } from "./deskStructure";

export default defineConfig({
  name: "default",
  title: "Will Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes, // <— nicht mehr manuell
  },
});
