"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      // If already on home page, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Otherwise, let the Link navigate normally
  };

  const handleNavClick = (targetId: string) => {
    if (isHomePage) {
      // Already on home page - just scroll
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // On another page - navigate to home with hash
      router.push(`/#${targetId}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-neutral-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Click to go home or scroll to top */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
            aria-label="Zur Startseite"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 324.61 563.83"
              className="scale-125 translate-y-1"
            >
              <path
                fill="#f29a2e"
                d="M90,428.07V44.94h94.13a206.52,206.52,0,0,1,46.12,4.73q20.58,4.72,35.48,15.84t22.94,30q8,18.92,8,47.77q0,23.19-6.38,39.73t-18.69,26.26q-12.3,9.69-30.74,13,22.69,3.8,37.6,15.85t22.23,31.46q7.33,19.39,7.33,46.82t-6.86,48.49q-6.85,21-20.34,35T247.28,421q-20.11,7.09-47.06,7.09ZM160,201.5h23.65q20.81,0,32.17-6.15a33.19,33.19,0,0,0,15.84-18.92q4.5-12.77,4.5-32.16,0-20.34-6.86-31.46T208.73,97.68q-13.72-4-35-4H160Zm0,177.38H186.5q31.68,0,43-15.37T240.9,316q0-23.18-5.44-37.6t-18-21.53q-12.54-7.09-33.35-7.09H160Z"
              />
              <rect fill="#f29a2e" y="44.94" width="70.79" height="70.79" />
            </svg>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick("work")}
              className="font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200"
            >
              Projekte
            </button>

            <button
              onClick={() => handleNavClick("about")}
              className="font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200"
            >
              Über mich
            </button>

            <button
              onClick={() => handleNavClick("contact")}
              className="font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200"
            >
              Kontakt
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-crank-orange-1 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-6 space-y-4 border-t border-neutral-700/40 mt-4">
            <button
              onClick={() => handleNavClick("work")}
              className="block w-full text-left font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200 py-2"
            >
              Projekte
            </button>

            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200 py-2"
            >
              Über mich
            </button>

            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left font-body text-base text-foreground hover:text-crank-orange-1 transition-colors duration-200 py-2"
            >
              Kontakt
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
