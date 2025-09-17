// components/PortableText/PortableTextComponents.tsx
import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Normal paragraph
    normal: ({ children }) => (
      <p
        className="text-base sm:text-lg text-foreground leading-relaxed font-light mb-6"
        style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.7" }}
      >
        {children}
      </p>
    ),
    // H3 subheadings
    h3: ({ children }) => (
      <h3
        className="text-lg sm:text-xl text-primary font-medium mb-4 mt-12 first:mt-0 tracking-wide uppercase"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        {children}
      </h3>
    ),
    // H4 smaller subheadings
    h4: ({ children }) => (
      <h4
        className="text-base sm:text-lg text-foreground font-medium mb-3 mt-8 first:mt-0"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        {children}
      </h4>
    ),
  },
  marks: {
    // Strong text
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    // Emphasized text
    em: ({ children }) => (
      <em className="italic text-foreground/90">{children}</em>
    ),
    // Links
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-2"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    // Custom highlight block
    highlight: ({ value }) => (
      <div className="bg-primary/10 border-l-4 border-primary p-4 my-6 rounded-r">
        <p
          className="text-base sm:text-lg text-foreground font-normal italic"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {value.text}
        </p>
      </div>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 space-y-2 mb-6">{children}</ul>
    ),
    // Numbered lists
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 space-y-2 mb-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }) => (
      <li
        className="text-base sm:text-lg text-foreground leading-relaxed font-light"
        style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.7" }}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        className="text-base sm:text-lg text-foreground leading-relaxed font-light"
        style={{ fontFamily: "Lato, sans-serif", lineHeight: "1.7" }}
      >
        {children}
      </li>
    ),
  },
};
