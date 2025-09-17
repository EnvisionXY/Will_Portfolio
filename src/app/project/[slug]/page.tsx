import { client } from "../../../../sanity/lib/client";
import { PROJECT_BY_SLUG } from "../../../../sanity/lib/queries";
import { ProjectDetails } from "@/app/components/ProjectDetails";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

export const revalidate = 60;

// ---- Types for Sanity Data ----
type Illustration = {
  image?: SanityImageObject; // Changed from unknown to SanityImageObject
  alt?: string;
  title?: string;
  text?: string;
  layout?: "image-left" | "image-right";
};

type ProjectDetailData = {
  title: string;
  hoverText?: string; // Added this field for consistency with ProjectDetails
  role?: string;
  overview?: string;
  tags?: string[];
  features?: string[];
  links?: { live?: string; repo?: string };
  images?: Illustration[];
};

// ---- Page Component ----
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await client.fetch<ProjectDetailData>(PROJECT_BY_SLUG, {
    slug,
  });

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <a
            href="/projects"
            className="px-6 py-3 bg-crank-orange-1 text-black rounded-lg hover:bg-crank-orange-1/90 transition-colors"
          >
            Back to Projects
          </a>
        </div>
      </main>
    );
  }

  // Transform the data to match ProjectDetails component expectations
  const projectData = {
    title: data.title,
    hoverText: data.hoverText,
    role: data.role,
    overview: data.overview,
    tags: data.tags,
    features: data.features,
    links: data.links,
    images: data.images,
  };

  return (
    <main>
      <ProjectDetails project={projectData} />
    </main>
  );
}
