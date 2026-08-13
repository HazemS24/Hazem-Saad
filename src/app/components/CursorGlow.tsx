"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Two layers of cursor feedback:
 *  - an ambient spotlight painted from CSS vars on <body>
 *  - a springy ring that swells over anything interactive
 * Both are disabled for coarse pointers and reduced-motion users.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    setEnabled(true);

    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const paint = () => {
      frame = 0;
      document.body.style.setProperty("--cursor-x", `${lastX}px`);
      document.body.style.setProperty("--cursor-y", `${lastY}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!frame) frame = requestAnimationFrame(paint);

      const el = e.target as HTMLElement | null;
      setActive(
        Boolean(el?.closest('a, button, [role="button"], input, [data-magnetic]'))
      );
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <div aria-hidden className="cursor-spotlight" />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-white/40 mix-blend-difference md:block"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 46 : 20,
          height: active ? 46 : 20,
          opacity: pressed ? 0.5 : active ? 1 : 0.65,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      />
    </>
  );
}
