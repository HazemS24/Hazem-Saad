"use client";

import { motion, useInView } from "framer-motion";
import {
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- Scroll reveal: fade + blur + rise ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(10px)" }
      }
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Section shell ---------------- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        // overflow-hidden keeps the decorative blobs from widening the page
        "section-pad relative scroll-mt-24 overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 mx-auto w-full max-w-shell">{children}</div>
    </section>
  );
}

/* ---------------- Eyebrow pill ---------------- */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/55 backdrop-blur",
        className
      )}
    >
      <span className="bg-grad h-1.5 w-1.5 rounded-full" />
      {children}
    </span>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <Reveal>
      <Pill>{eyebrow}</Pill>
      <h2 className="display-lg mt-7 max-w-[20ch] text-balance text-white">
        {title}
      </h2>
      {lede && (
        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-white/50 md:text-lg">
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- Glass card with a cursor-tracking sheen ---------------- */
export function GlassCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (!interactive || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className={cn(
        "group relative overflow-hidden rounded-panel border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-700 ease-smooth md:backdrop-blur-xl",
        interactive &&
          "hover:border-white/20 hover:bg-white/[0.055] md:hover:-translate-y-1.5 md:hover:shadow-lift",
        className
      )}
    >
      {/* Sheen that follows the pointer across the card */}
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={
            {
              background: `radial-gradient(340px circle at ${pos.x}% ${pos.y}%, rgba(129,140,248,0.14), transparent 60%)`,
            } as CSSProperties
          }
        />
      )}
      {/* Gradient hairline along the top edge */}
      {interactive && (
        <span
          aria-hidden
          className="bg-grad pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [d, setD] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      data-magnetic
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setD({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onPointerLeave={() => setD({ x: 0, y: 0 })}
      animate={{ x: d.x, y: d.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Buttons ---------------- */
export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
} & React.ComponentPropsWithoutRef<"a">) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[0.94rem] font-medium transition-all duration-500 ease-smooth";

  const styles =
    variant === "primary"
      ? "bg-white text-ink-950 hover:shadow-pill"
      : "border border-white/15 bg-white/[0.04] text-white/85 backdrop-blur hover:border-white/30 hover:bg-white/[0.08] hover:text-white";

  return (
    <Magnetic>
      <a href={href} className={cn(base, styles, className)} {...rest}>
        {variant === "primary" && (
          <span
            aria-hidden
            className="bg-grad absolute inset-0 -z-10 translate-y-full transition-transform duration-500 ease-smooth group-hover:translate-y-0"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    </Magnetic>
  );
}

/* ---------------- Ambient blob ---------------- */
export function Blob({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={cn("blob animate-float-slow", className)}
      style={style}
    />
  );
}

/* ---------------- Divider ---------------- */
export function Divider() {
  return (
    <div aria-hidden className="mx-auto hairline w-full max-w-shell" />
  );
}
