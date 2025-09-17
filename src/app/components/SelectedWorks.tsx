"use client";

import { useState } from "react";
import Link from "next/link";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

type Card = {
  title: string;
  slug: { current: string };
  tags?: string[];
  hoverText?: string;
};

export function SelectedWorks({ projects }: { projects: Card[] }) {
  const { ref, isIntersecting: isVisible } = useIntersectionObserver({
    threshold: 0.1,
  });
  const [hovered, setHovered] = useState<string | null>(null);

  if (!projects?.length) return null;

  return (
    <section id="work" ref={ref} className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className={`text-5xl text-crank-orange-1 sm:text-6xl md:text-7xl mb-16 sm:mb-20 text-primary font-bold scroll-animate ${
            isVisible ? "in-view" : ""
          }`}
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          PROJEKTE
        </h2>

        <div className="space-y-0">
          {projects.map((p, index) => {
            const key = p.slug?.current ?? String(index);
            const isHoveredItem = hovered === key;

            return (
              <div
                key={key}
                className={`group scroll-animate ${isVisible ? "in-view" : ""}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Ganze Zeile klickbar */}
                <Link
                  href={`/project/${p.slug.current}`}
                  className="block"
                  aria-label={`${p.title} – open project`}
                >
                  {/* Row */}
                  <div className="py-8 sm:py-10 border-b border-border last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                      {/* Title */}
                      <div className="flex-1">
                        <h3
                          className="text-lg sm:text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-200 font-semibold"
                          style={{
                            fontFamily: "Oswald, sans-serif",
                          }}
                        >
                          {p.title.toUpperCase()}
                        </h3>
                      </div>

                      {/* Tags */}
                      {!!p.tags?.length && (
                        <div className="flex flex-wrap gap-2 sm:justify-end">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full h-7 px-3 text-[11px] leading-none
             text-gray-300 bg-white/5 border border-white/10
             shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
             transition-colors duration-300 ease-out
             group-hover:border-crank-orange-1"
                              style={{
                                fontFamily: "Lato, sans-serif",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description - Always visible on mobile/tablet, hover on desktop */}
                    {p.hoverText && (
                      <>
                        {/* Mobile/Tablet version - always visible */}
                        <div className="block md:hidden mt-4 sm:mt-6">
                          <p
                            className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-4xl font-light"
                            style={{
                              fontFamily: "Lato, sans-serif",
                            }}
                          >
                            {p.hoverText}
                          </p>
                        </div>

                        {/* Desktop version - hover to show */}
                        <div
                          className={`hidden md:block overflow-hidden transition-[max-height,opacity,margin-top] duration-400 ease-out ${
                            isHoveredItem
                              ? "mt-4 sm:mt-6 opacity-100"
                              : "mt-0 opacity-0"
                          }`}
                          style={{
                            maxHeight: isHoveredItem ? "200px" : "0px",
                          }}
                        >
                          <div
                            className={`transition-transform duration-400 ease-out ${
                              isHoveredItem ? "translate-y-0" : "-translate-y-4"
                            }`}
                          >
                            <p
                              className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-4xl font-light"
                              style={{
                                fontFamily: "Lato, sans-serif",
                              }}
                            >
                              {p.hoverText}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
