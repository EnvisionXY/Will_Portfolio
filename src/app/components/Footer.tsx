"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  CheckCircle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export function Footer({
  email = "william@willblack.de",
  linkedin = "https://www.linkedin.com/in/willblackcoast/",
  instagram = "https://www.instagram.com/will.black_music/",
  github = "https://github.com/EnvisionXY",
}: {
  email?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        "service_u19x508",
        "template_3vpl24p",
        {
          name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "sPoZTYy7w5DoYHeSG"
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email failed:", error);
      setError(
        "Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socials = [
    email && {
      name: "E-Mail",
      href: `mailto:${email}`,
      icon: Mail,
      label: "E-Mail",
    },
    github && {
      name: "GitHub",
      href: github,
      icon: Github,
      label: "GitHub",
    },
    linkedin && {
      name: "LinkedIn",
      href: linkedin,
      icon: Linkedin,
      label: "LinkedIn",
    },
    instagram && {
      name: "Instagram",
      href: instagram,
      icon: Instagram,
      label: "Instagram",
    },
  ].filter(
    (
      social
    ): social is {
      name: string;
      href: string;
      icon: LucideIcon;
      label: string;
    } => Boolean(social)
  );

  return (
    <footer id="contact" className="relative z-10">
      {/* Contact Section */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-20 lg:gap-24 items-start">
            {/* Left Side - Heading & Info */}
            <div className="space-y-12">
              <div>
                <h2
                  className="text-5xl text-crank-orange-1 sm:text-6xl md:text-7xl text-primary font-bold mb-8"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  LASS UNS SPRECHEN
                </h2>
                <p
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light"
                  style={{ fontFamily: "Lato, sans-serif", color: "#B5B5B5" }}
                >
                  Bereit für ein neues Projekt? Ich freue mich darauf, von
                  deinen Ideen zu hören.
                </p>
              </div>

              {/* Social Links */}
              {socials.length > 0 && (
                <div className="space-y-4">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.name !== "E-Mail" ? "_blank" : undefined}
                      rel={
                        social.name !== "E-Mail"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "Lato, sans-serif" }}
                      whileHover={{ x: 4 }}
                    >
                      <social.icon className="w-5 h-5" />
                      {social.label}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:pl-8">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-8" />
                  <h3
                    className="text-2xl text-foreground mb-6"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    NACHRICHT GESENDET
                  </h3>
                  <p
                    className="text-gray-300 mb-8"
                    style={{ fontFamily: "Lato, sans-serif", color: "#B5B5B5" }}
                  >
                    Vielen Dank! Ich melde mich bald bei dir.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:text-primary/80 transition-colors"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Weitere Nachricht senden
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span style={{ fontFamily: "Lato, sans-serif" }}>
                        {error}
                      </span>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Dein Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-foreground placeholder-gray-400 focus:border-primary focus:outline-none transition-colors text-lg"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Deine E-Mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-foreground placeholder-gray-400 focus:border-primary focus:outline-none transition-colors text-lg"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Deine Nachricht"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-foreground placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none text-lg"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 border border-white text-white hover:text-crank-orange-3 hover:border-crank-orange-3 px-8 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5 transition-colors" />
                    {isSubmitting ? "SENDEN..." : "NACHRICHT SENDEN"}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p style={{ fontFamily: "Lato, sans-serif" }}>
              © 2025 William Black. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <a
                href="/datenschutz"
                className="hover:text-crank-orange-3 transition-colors duration-200"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Datenschutz
              </a>
              <a
                href="/impressum"
                className="hover:text-crank-orange-3 transition-colors duration-200"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Impressum
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
