"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

type Card = {
  title: string;
  slug: { current: string };
  tags?: string[];
  hoverText?: string;
};

export function SelectedWorks({ projects }: { projects: Card[] }) {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  if (!projects?.length) return null;

  return (
    <section id="work" ref={ref} className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-12 sm:mb-16 text-foreground"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Selected Works
        </motion.h2>

        <div className="space-y-0">
          {projects.map((p, index) => {
            const key = p.slug?.current ?? String(index);
            return (
              <motion.div
                key={key}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
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
                  <div className="py-6 sm:py-8 border-b border-border last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                      {/* Title */}
                      <div className="flex-1">
                        <h3
                          className="text-2xl sm:text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors duration-200"
                          style={{
                            fontFamily: "Bebas Neue, sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          {p.title}
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
                                fontFamily: "Founders Grotesk, sans-serif",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover-Description */}
                    <AnimatePresence>
                      {hovered === key && p.hoverText && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                            height: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 sm:pt-6">
                            <p
                              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl"
                              style={{
                                fontFamily: "Founders Grotesk, sans-serif",
                              }}
                            >
                              {p.hoverText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
