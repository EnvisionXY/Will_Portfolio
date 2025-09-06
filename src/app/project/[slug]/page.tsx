import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { PROJECT_BY_SLUG } from "../../../../sanity/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";

export const revalidate = 60;

// ---- Typen für die Sanity-Daten ----
type Illustration = {
  image?: unknown;
  alt?: string;
  title?: string;
  text?: string;
  layout?: "image-left" | "image-right";
};

type ProjectDetailData = {
  title: string;
  role?: string;
  overview?: string;
  tags?: string[];
  features?: string[];
  links?: { live?: string; repo?: string };
  images?: Illustration[];
};

// ---- Seite ----
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await client.fetch<ProjectDetailData>(PROJECT_BY_SLUG, {
    slug: params.slug,
  });
  if (!data) {
    return <main className="container mx-auto px-6 py-16">Not found.</main>;
  }

  return (
    <main className="container mx-auto px-6 py-16">
      {/* Titel */}
      <h1 className="text-4xl font-bold">{data.title}</h1>

      {/* Meta */}
      <div className="mt-3 text-sm opacity-80 flex flex-wrap gap-3">
        {data.role && (
          <span>
            Role: <strong>{data.role}</strong>
          </span>
        )}
        {data.tags?.length ? <span>· {data.tags.join(" · ")}</span> : null}
      </div>

      {/* Überblick */}
      {data.overview && <p className="mt-6 leading-relaxed">{data.overview}</p>}

      {/* Key Features */}
      {data.features?.length ? (
        <ul className="mt-6 list-disc pl-6 space-y-1">
          {data.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}

      {/* Links */}
      {(data.links?.live || data.links?.repo) && (
        <div className="mt-8 flex gap-3">
          {data.links?.live && (
            <a
              href={data.links.live}
              target="_blank"
              className="px-4 py-2 rounded-xl border hover:bg-white/5"
            >
              Live
            </a>
          )}
          {data.links?.repo && (
            <a
              href={data.links.repo}
              target="_blank"
              className="px-4 py-2 rounded-xl border hover:bg-white/5"
            >
              Repo
            </a>
          )}
        </div>
      )}

      {/* Illustrationen (Z-Muster per layout) */}
      {data.images?.length ? (
        <div className="mt-12 space-y-12">
          {data.images.map((it, i) => {
            const imageLeft = it?.layout
              ? it.layout === "image-left"
              : i % 2 === 0;

            const src = it?.image
              ? urlFor(it.image as Parameters<typeof urlFor>[0])
                  .width(1600)
                  .height(1200)
                  .fit("crop")
                  .url()
              : undefined;

            return (
              <section
                key={i}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Bild */}
                <div className={imageLeft ? "order-1" : "order-2"}>
                  {src && (
                    <Image
                      src={src}
                      alt={it?.alt ?? data.title}
                      width={1600}
                      height={1200}
                      className="rounded-xl object-cover"
                    />
                  )}
                </div>

                {/* Text */}
                <div className={imageLeft ? "order-2" : "order-1"}>
                  {it?.title && (
                    <h3 className="text-2xl font-semibold mb-2">{it.title}</h3>
                  )}
                  {it?.text && (
                    <p className="leading-relaxed text-gray-300">{it.text}</p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : null}
    </main>
  );
}
