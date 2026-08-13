"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { SECTIONS, useActiveSection } from "../lib/sections";
import { cn } from "../lib/cn";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const { active } = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't leave the sheet open behind a closed hamburger on resize to desktop.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="bg-grad fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <div
          className={cn(
            "flex w-full max-w-shell items-center justify-between rounded-full border px-3 py-2 transition-all duration-700 ease-smooth md:px-4",
            scrolled
              ? "border-white/10 bg-ink-950/70 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 rounded-full px-2 py-1"
          >
            <Mark />
            <span className="font-display text-[0.95rem] font-semibold tracking-tight text-white">
              Hazem Saad
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.slice(1).map((s, i) => {
              const isActive = active === i + 1;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/85"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.09]"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                    />
                  )}
                  {s.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.04] sm:inline-block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/80 backdrop-blur transition-colors hover:bg-white/[0.09] md:hidden"
            >
              {open ? <HiX /> : <HiOutlineMenuAlt4 />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong fixed inset-x-4 top-[76px] z-50 rounded-panel p-3 md:hidden"
          >
            {SECTIONS.slice(1).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[0.95rem] text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Monogram: an H drawn as two strokes with a gradient crossbar. */
function Mark() {
  return (
    <span className="relative grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.05]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M6 4v16M18 4v16"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="text-white"
        />
        <path
          d="M6 12h12"
          stroke="url(#mark-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mark-grad" x1="6" y1="12" x2="18" y2="12">
            <stop stopColor="#5eead4" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
