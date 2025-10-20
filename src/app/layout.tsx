import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will Black - Portfolio",
  description:
    "Frontend-Entwickler und UX-/UI-Designer mit Fokus auf digitale Lern- und Produktlösungen",
  icons: {
    icon: "/Logo_Entwurf.svg",
  },
  openGraph: {
    title: "Will Black - Portfolio",
    description:
      "Frontend-Entwickler und UX-/UI-Designer mit Fokus auf digitale Lern- und Produktlösungen",
    url: "https://www.willblack.de",
    siteName: "Will Black Portfolio",
    images: [
      {
        url: "https://www.willblack.de/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Will Black Portfolio - Frontend-Entwickler und UX-/UI-Designer",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Black - Portfolio",
    description:
      "Frontend-Entwickler und UX-/UI-Designer mit Fokus auf digitale Lern- und Produktlösungen",
    images: ["https://www.willblack.de/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
