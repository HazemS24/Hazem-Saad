"use client";

import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * Tracks which section the reader is in, plus where each section sits as a
 * fraction of the page — the spine uses the fractions to place its dots.
 */
export function useActiveSection() {
  const [active, setActive] = useState(0);
  const [offsets, setOffsets] = useState<number[]>(() =>
    SECTIONS.map((_, i) => i / (SECTIONS.length - 1))
  );

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setOffsets(
        SECTIONS.map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return 0;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return Math.min(1, Math.max(0, top / scrollable));
        })
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // A section counts as "current" once its top passes 45% of the viewport.
        const line = window.scrollY + window.innerHeight * 0.45;
        let next = 0;
        SECTIONS.forEach(({ id }, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= line) {
            next = i;
          }
        });
        setActive(next);
      });
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { active, offsets };
}
