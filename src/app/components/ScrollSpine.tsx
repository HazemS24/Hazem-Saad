"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SECTIONS, useActiveSection } from "../lib/sections";
import { cn } from "../lib/cn";

/**
 * A fixed rail down the left edge. The track is dim; a gradient fill draws
 * itself in as you scroll, a glow rides its leading edge, and each section
 * marker lights up as you reach it. Doubles as section navigation.
 */
export function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });
  const headTop = useTransform(fill, (v) => `${v * 100}%`);
  const { active, offsets } = useActiveSection();

  return (
    <nav
      aria-label="Sections"
      className="fixed left-6 top-1/2 z-40 hidden h-[54vh] -translate-y-1/2 xl:block"
    >
      <div className="relative h-full w-px bg-white/[0.10]">
        {/* Gradient fill drawn by scroll progress */}
        <motion.span
          aria-hidden
          className="bg-grad absolute inset-x-0 top-0 h-full origin-top"
          style={{ scaleY: fill }}
        />

        {/* Glow riding the leading edge */}
        <motion.span
          aria-hidden
          className="bg-grad absolute left-1/2 h-2 w-2 rounded-full shadow-pill"
          style={{ top: headTop, x: "-50%", y: "-50%" }}
        />

        {/* Section markers */}
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={i === active ? "true" : undefined}
            className="group absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center py-2"
            style={{ top: `${offsets[i] * 100}%` }}
          >
            <span
              aria-hidden
              className={cn(
                "block rounded-full border transition-all duration-500 ease-smooth",
                i <= active
                  ? "h-2.5 w-2.5 border-transparent bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)]"
                  : "h-1.5 w-1.5 border-white/30 bg-ink-950 group-hover:border-white/60"
              )}
            />
            <span
              className={cn(
                "pointer-events-none absolute left-5 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.18em] transition-all duration-500",
                i === active
                  ? "text-white/80 opacity-100"
                  : "text-white/40 opacity-0 group-hover:opacity-100"
              )}
            >
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
