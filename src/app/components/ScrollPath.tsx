"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "../lib/cn";

const D =
  "M8 44C120 4 200 76 320 44S520 6 640 40 840 76 992 30";

/**
 * A horizontal squiggle that inks itself in with the gradient as the section
 * scrolls past, with a bead riding the tip.
 */
export function ScrollPath({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 40%"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const beadLeft = useTransform(draw, (v) => `${2 + v * 96}%`);
  const beadOpacity = useTransform(draw, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        aria-hidden
        className="h-16 w-full"
      >
        <path
          d={D}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          d={D}
          stroke="url(#scrollpath-grad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
        <defs>
          <linearGradient
            id="scrollpath-grad"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5eead4" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>

      <motion.span
        aria-hidden
        className="bg-grad absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full shadow-pill"
        style={{ left: beadLeft, opacity: beadOpacity }}
      />
    </div>
  );
}
