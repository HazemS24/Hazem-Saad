"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { SECTIONS, useActiveSection } from "../lib/sections";
import { cn } from "../lib/cn";

/** One line per section, in the same order as SECTIONS. */
const LINES: Record<(typeof SECTIONS)[number]["id"], string> = {
  top: "Hey — I'm Hazem. Keep scrolling and I'll walk you through it.",
  about: "Robotics research on one side, product engineering on the other.",
  experience: "Shopify, Waterloo RoboHub, Zoocasa — most recent first.",
  work: "Filter these. Toyota's challenge I won twice, two years apart.",
  stack: "Ruby and PyTorch, mostly. Whatever the problem actually needs.",
  contact: "Still here? Then you should probably email me.",
};

/**
 * A small version of the avatar pinned to the corner, narrating the section
 * you're currently reading. Appears once you're past the hero.
 */
export function Companion() {
  const { active } = useActiveSection();
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const section = SECTIONS[active] ?? SECTIONS[0];

  return (
    <motion.div
      aria-live="polite"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed bottom-4 right-4 z-40 flex items-end gap-3 md:bottom-8 md:right-8",
        visible ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <AnimatePresence mode="wait">
        {open && (
          <motion.p
            key={section.id}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong hidden max-w-[26ch] rounded-[22px] rounded-br-md px-5 py-3.5 text-sm leading-snug text-white/80 shadow-soft sm:block"
          >
            {LINES[section.id]}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide the guide" : "Show the guide"}
        aria-expanded={open}
        className="group relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/10 bg-ink-900/70 backdrop-blur-md transition-transform duration-500 hover:scale-105 active:scale-95 md:h-[84px] md:w-[84px] md:backdrop-blur-xl"
      >
        <span
          aria-hidden
          className="bg-grad absolute inset-0 -z-10 rounded-full opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-45"
        />
        {/* Fixed width, not a percentage: inside a centred grid the item is
            sized to content, so a % width against a w-full SVG collapses to 0. */}
        <Avatar
          className="w-11 -translate-y-[3%] md:w-[68px]"
          intensity={0.55}
          aura={false}
          breathe={false}
        />
      </button>
    </motion.div>
  );
}
