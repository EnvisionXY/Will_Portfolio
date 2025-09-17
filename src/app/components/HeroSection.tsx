"use client";

import { useEffect, useState } from "react";

type Props = {
  siteTitle: string;
  tagline?: string;
  keywords?: string[] | string;
  disableTransition?: boolean;
};

export function HeroSection({ siteTitle, tagline, disableTransition }: Props) {
  const [scrollY, setScrollY] = useState(0);
  const animationsEnabled = !disableTransition;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full">
        <div className="text-center relative">
          {/* Main Title */}
          <h1
            className={`font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none text-foreground mb-8 ${
              animationsEnabled ? "animate-slide-up" : ""
            }`}
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            {siteTitle.toUpperCase()}
          </h1>

          {/* Tagline */}
          {tagline && (
            <p
              className={`font-body text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 ${
                animationsEnabled ? "animate-slide-up-delayed" : ""
              }`}
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {tagline}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
