"use client";

import { useEffect, useState } from "react";
import { ParticleBackground } from "./ParticleBackground";
import { motion } from "framer-motion";

type Props = {
  siteTitle: string;
  tagline?: string;
  keywords?: string[] | string;
  disableTransition?: boolean;
};

export function HeroSection({
  siteTitle,
  tagline,
  keywords,
  disableTransition,
}: Props) {
  const [scrollY, setScrollY] = useState(0);
  const motionOn = !disableTransition;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keywords robust normalisieren
  const list = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string"
      ? keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  // Titel in Kopf + letzten Buchstaben teilen (für exakte Andock-Position)
  const title = siteTitle ?? "";
  const head = title.slice(0, -1);
  const last = title.slice(-1);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 md:pt-0"
    >
      <ParticleBackground color="rgba(178,191,128," />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="relative inline-block">
            {/* Title */}
            <motion.h1
              className="inline-flex items-baseline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] leading-none xl:mb-6 text-foreground max-w-5xl"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                fontFamily: "Bebas Neue, sans-serif",
              }}
              {...(motionOn
                ? {
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, ease: "easeOut" as const },
                  }
                : {})}
            >
              <span>{head}</span>
              <span className="relative inline-block">
                <span>{last}</span>

                {/* Keywords: neben dem letzten Buchstaben (ab xl) */}
                {!!list.length && (
                  <motion.ul
                    className="hidden xl:flex flex-col gap-1 text-lg font-medium text-left
                               absolute xl:left-full top-1/2 xl:-translate-y-1/2 ml-6
                               text-crank-orange-1"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                    {...(motionOn
                      ? {
                          initial: "hidden",
                          animate: "visible",
                          variants: {
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.12 } },
                          },
                        }
                      : {})}
                  >
                    {list.map((k) => (
                      <motion.li
                        key={k}
                        className="whitespace-nowrap"
                        {...(motionOn
                          ? {
                              variants: {
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 },
                              },
                              transition: {
                                duration: 0.35,
                                ease: "easeOut" as const,
                              },
                            }
                          : {})}
                      >
                        {k}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </span>
            </motion.h1>

            {/* Keywords: mobil/klein unter dem Titel nebeneinander */}
            {!!list.length && (
              <motion.ul
                className="mt-4 flex flex-row flex-wrap gap-3 justify-center xl:hidden text-crank-orange-1"
                {...(motionOn
                  ? {
                      initial: "hidden",
                      animate: "visible",
                      variants: {
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12 } },
                      },
                    }
                  : {})}
              >
                {list.map((k) => (
                  <motion.li
                    key={k}
                    className="whitespace-nowrap [@media(max-width:320px)]:text-sm"
                    {...(motionOn
                      ? {
                          variants: {
                            hidden: { opacity: 0, y: 12 },
                            visible: { opacity: 1, y: 0 },
                          },
                          transition: {
                            duration: 0.3,
                            ease: "easeOut" as const,
                          },
                        }
                      : {})}
                  >
                    {k}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Tagline */}
          {tagline && (
            <motion.p
              className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                fontFamily: "Founders Grotesk, sans-serif",
              }}
              {...(motionOn
                ? {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.8,
                      delay: 0.2,
                      ease: "easeOut" as const,
                    },
                  }
                : {})}
            >
              {tagline}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
