"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);

  return { ref, isVisible } as const;
}
