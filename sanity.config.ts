import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import project from "./schemas/project";
import tag from "./schemas/tag";

export default defineConfig({
  name: "default",
  title: "Will Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: [project, tag],
  },
});
