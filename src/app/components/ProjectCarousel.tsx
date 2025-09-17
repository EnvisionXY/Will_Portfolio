"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../../sanity/lib/image";

type Illustration = {
  image?: SanityImageObject;
  alt?: string;
  title?: string;
  text?: string;
};

export default function ProjectCarousel({
  images,
  projectTitle,
}: {
  images: Illustration[];
  projectTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images?.length) return null;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];
  const imageUrl = currentImage?.image
    ? urlFor(currentImage.image).width(1600).quality(90).url()
    : null;

  if (!imageUrl) return null;

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Image Container - Fixed height for consistency */}
      <div className="relative bg-white/5 rounded-xl overflow-hidden">
        <div className="relative flex items-center justify-center h-[500px]">
          <Image
            src={imageUrl}
            alt={
              currentImage.alt || `${projectTitle} - Image ${currentIndex + 1}`
            }
            width={1600}
            height={900}
            className="max-h-full max-w-full w-auto h-auto object-contain"
            priority
          />
        </div>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Image Caption */}
      {(currentImage.title || currentImage.text) && (
        <div className="mt-6 space-y-2 text-center">
          {currentImage.title && (
            <h3 className="text-lg font-semibold text-foreground">
              {currentImage.title}
            </h3>
          )}
          {currentImage.text && (
            <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto text-left">
              {currentImage.text}
            </p>
          )}
        </div>
      )}

      {/* Pagination Dots - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-crank-orange-1 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
