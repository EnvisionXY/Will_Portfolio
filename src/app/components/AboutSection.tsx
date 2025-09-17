"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../../sanity/lib/image";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { portableTextComponents } from "../components/PortableText";

type Props = {
  title?: string;
  aboutContent?: PortableTextBlock[]; // Properly typed Portable Text content
  photo?: SanityImageObject;
  // Keep legacy props for backward compatibility during migration
  principle?: string;
  pitch?: string;
};

export function AboutSection({
  title = "Über mich",
  aboutContent,
  photo,
  // Legacy fallbacks for migration period
  principle,
  pitch,
}: Props) {
  const { ref, isIntersecting: isVisible } = useIntersectionObserver({
    threshold: 0.2,
  });

  // Debug: Check what data we're receiving
  console.log("AboutSection props:", {
    title,
    aboutContent,
    photo,
    principle,
    pitch,
  });

  const imgSrc = photo
    ? urlFor(photo).width(600).height(800).fit("fillmax").url()
    : undefined;

  // Fallback content if no Portable Text content is provided
  const fallbackContent = [
    {
      _type: "block",
      _key: "fallback1",
      style: "normal",
      children: [
        {
          _type: "span",
          text: principle || "Bitte fügen Sie Ihren Inhalt im CMS hinzu.",
        },
      ],
    },
    ...(pitch
      ? [
          {
            _type: "block",
            _key: "fallback2",
            style: "h3",
            children: [{ _type: "span", text: "Wie ich arbeite" }],
          },
          {
            _type: "block",
            _key: "fallback3",
            style: "normal",
            children: [{ _type: "span", text: pitch }],
          },
        ]
      : []),
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-40 sm:py-48 lg:py-56 mt-48 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-16 sm:gap-20 lg:gap-24 items-start">
          {/* Text Left */}
          <div
            className={`lg:col-span-7 scroll-animate ${isVisible ? "in-view" : ""}`}
          >
            {/* Section Heading */}
            <h2
              className="text-5xl text-crank-orange-1 sm:text-6xl md:text-7xl font-bold mb-16 sm:mb-20"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              {title.toUpperCase()}
            </h2>

            {/* Portable Text Content */}
            <div className="max-w-2xl">
              <PortableText
                value={aboutContent || fallbackContent}
                components={portableTextComponents}
              />
            </div>
          </div>

          {/* Image Right */}
          <div
            className={`lg:col-span-5 scroll-animate ${isVisible ? "in-view" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="relative">
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={title || "About photo"}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-all duration-700 ease-out hover:scale-[1.02]"
                />
              ) : (
                <div className="aspect-[3/4] bg-white/5 grid place-items-center">
                  <span
                    className="text-sm text-gray-400 font-light"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    No image
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
