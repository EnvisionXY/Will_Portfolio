"use client";

import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";
import { ArrowLeft, ExternalLink, Github, User, Tag } from "lucide-react";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

type Illustration = {
  image?: SanityImageObject;
  alt?: string;
  title?: string;
  text?: string;
  layout?: "image-hero" | "image-left" | "image-right";
};

type ProjectLink = {
  live?: string;
  repo?: string;
};

type Project = {
  title: string;
  hoverText?: string;
  role?: string;
  overview?: string;
  tags?: string[];
  features?: string[];
  links?: ProjectLink;
  images?: Illustration[];
};

type ProjectDetailsProps = {
  project: Project;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { title, role, overview, tags, features, links, images } = project;

  const hasImages = images && images.length > 0;
  const hasTags = tags && tags.length > 0;
  const hasFeatures = features && features.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {title.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* Carousel Section */}
      {hasImages && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ProjectCarousel images={images!} projectTitle={title} />
          </div>
        </section>
      )}

      {/* Project Overview - Two Column Layout */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            {/* Left: Project Overview */}
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-3xl text-crank-orange-1 sm:text-4xl md:text-5xl ">
                PROJEKTÜBERSICHT
              </h2>
              {overview && (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {overview}
                </p>
              )}
            </div>

            {/* Right: Project Details & Features */}
            <div className="space-y-8">
              {/* Project Details Cards */}
              <div className="space-y-4">
                <h3 className="text-xl text-crank-orange-3 font-semibold mb-4">
                  Projekt-Details
                </h3>
                <div className="space-y-3">
                  {/* Role */}
                  {role && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <User className="w-5 h-5 text-crank-orange-1 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-400">Role</span>
                        <p className="text-white font-medium">{role}</p>
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {hasTags && (
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <Tag className="w-5 h-5 text-crank-orange-1 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-400">
                          Technologies
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full h-6 px-2.5 text-xs leading-none text-gray-300 bg-white/10 border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {links && (links.live || links.repo) && (
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <ExternalLink className="w-5 h-5 text-crank-orange-1 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-400">Links</span>
                        <div className="flex gap-3 mt-1">
                          {links.repo && (
                            <a
                              href={links.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-white hover:text-crank-orange-1 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </a>
                          )}
                          {links.live && (
                            <a
                              href={links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-white hover:text-crank-orange-1 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              {hasFeatures && (
                <div className="space-y-4">
                  <h3 className="text-xl text-crank-orange-3 font-semibold mb-4">
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div
                        key={`${feature}-${index}`}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-crank-orange-1 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20 sm:py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Back to Projects */}
              <Link
                href="/#work"
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-border text-foreground hover:bg-accent hover:border-crank-orange-1 transition-all duration-300 rounded-xl group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Projects</span>
              </Link>

              {/* View Project */}
              {links?.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-crank-orange-1 text-background hover:bg-opacity-90 transition-all duration-300 rounded-xl group"
                >
                  <span className="font-medium">View Project</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
