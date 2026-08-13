"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";

/* ------------------------------------------------------------------ *
 * Curly hair is two arcs of overlapping circles laid over a solid cap.
 * Small radii read as tight curls rather than bubbles. Positions are
 * computed deterministically and rounded so server and client agree.
 * ------------------------------------------------------------------ */
function buildCurls() {
  const curls: { cx: number; cy: number; r: number }[] = [];
  // Math.cos/sin can differ in the last bit between the server's libm and
  // the browser's, which React reports as a hydration mismatch.
  const fix = (n: number) => Math.round(n * 100) / 100;

  const arc = (
    count: number,
    from: number,
    to: number,
    rx: number,
    ry: number,
    cy: number,
    r: number
  ) => {
    for (let i = 0; i <= count; i++) {
      const deg = from + (i * (to - from)) / count;
      const a = (deg * Math.PI) / 180;
      curls.push({
        cx: fix(120 + rx * Math.cos(a)),
        cy: fix(cy - ry * Math.sin(a)),
        r,
      });
    }
  };

  // Outer silhouette — the crimped edge you read from a distance.
  arc(22, -10, 190, 48, 45, 88, 9);
  // Inner mass — fills the crown so no scalp shows through.
  arc(15, 6, 174, 33, 30, 85, 9.5);

  return curls;
}

const CURLS = buildCurls();

type AvatarProps = {
  className?: string;
  /** Follow the pointer. Disable for a static decorative instance. */
  track?: boolean;
  /** Scales how far the head/eyes travel. 1 = hero, ~0.6 = small companion. */
  intensity?: number;
  /** Soft gradient glow behind the figure. */
  aura?: boolean;
  /** Idle up-and-down float. */
  breathe?: boolean;
};

/**
 * A stylized vector portrait that tracks the pointer: the head parallaxes,
 * the eyes follow, the brows lift, and he grins when you get close.
 */
export function Avatar({
  className,
  track = true,
  intensity = 1,
  aura = true,
  breathe = true,
}: AvatarProps) {
  const rawId = useId();
  const u = rawId.replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [near, setNear] = useState(false);
  const [blink, setBlink] = useState(false);

  const spring = { stiffness: 70, damping: 16, mass: 0.55 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  // Body moves least, head more, eyes most — that offset is what sells depth.
  const bodyX = useTransform(sx, (v) => v * 4 * intensity);
  const bodyY = useTransform(sy, (v) => v * 2 * intensity);
  const headX = useTransform(sx, (v) => v * 8 * intensity);
  const headY = useTransform(sy, (v) => v * 5 * intensity);
  const headRotate = useTransform(sx, (v) => v * 3.5 * intensity);
  const pupilX = useTransform(sx, (v) => v * 3.6);
  const pupilY = useTransform(sy, (v) => v * 2.8);
  const browY = useTransform(sy, (v) => v * 2.4);

  useEffect(() => {
    if (!track) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const clamp = (n: number) => Math.max(-1, Math.min(1, n));
      mx.set(clamp((e.clientX - cx) / (window.innerWidth / 2)));
      my.set(clamp((e.clientY - cy) / (window.innerHeight / 2)));

      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      setNear(dist < Math.max(r.width, 260) * 0.9);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [track, mx, my]);

  // Blink on a loose, slightly irregular rhythm.
  useEffect(() => {
    let open: number;
    let next: number;
    const schedule = () => {
      next = window.setTimeout(() => {
        setBlink(true);
        open = window.setTimeout(() => setBlink(false), 105);
        schedule();
      }, 3000 + Math.random() * 4000);
    };
    schedule();
    return () => {
      window.clearTimeout(next);
      window.clearTimeout(open);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative isolate", className)}>
      {aura && <span aria-hidden className="aura" />}

      <motion.svg
        /* Cropped below the shoulders (the torso path runs to y=268). Ending
           the frame at 248 stops the figure reading as bottom-heavy and keeps
           it inside round containers. */
        viewBox="0 0 240 248"
        role="img"
        aria-label="Illustrated portrait of Hazem that follows your cursor"
        className={cn(
          "relative z-10 w-full select-none overflow-visible",
          breathe && "animate-breathe"
        )}
        style={{ x: bodyX, y: bodyY }}
      >
        <defs>
          <linearGradient
            id={`${u}-skin`}
            x1="66"
            y1="46"
            x2="184"
            y2="186"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F3C89C" />
            <stop offset="0.52" stopColor="#E3AC7B" />
            <stop offset="1" stopColor="#CB8D5F" />
          </linearGradient>

          <linearGradient
            id={`${u}-neck`}
            x1="105"
            y1="160"
            x2="135"
            y2="205"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B87F55" />
            <stop offset="1" stopColor="#D49C6E" />
          </linearGradient>

          <linearGradient
            id={`${u}-hair`}
            x1="72"
            y1="30"
            x2="172"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E2745" />
            <stop offset="0.45" stopColor="#1B1729" />
            <stop offset="1" stopColor="#100D18" />
          </linearGradient>

          <linearGradient
            id={`${u}-torso`}
            x1="60"
            y1="198"
            x2="180"
            y2="268"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1D2036" />
            <stop offset="1" stopColor="#0C0E18" />
          </linearGradient>

          <radialGradient id={`${u}-iris`}>
            <stop stopColor="#7A4C2A" />
            <stop offset="1" stopColor="#2B1809" />
          </radialGradient>

          <linearGradient
            id={`${u}-accent`}
            x1="114"
            y1="214"
            x2="126"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5eead4" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>

          {/* Keeps pupils and the eyelid inside the eye shape */}
          <clipPath id={`${u}-eyeL`}>
            <path d="M88 124C92.5 115.5 107.5 115.5 112 124C107.5 132 92.5 132 88 124Z" />
          </clipPath>
          <clipPath id={`${u}-eyeR`}>
            <path d="M128 124C132.5 115.5 147.5 115.5 152 124C147.5 132 132.5 132 128 124Z" />
          </clipPath>
        </defs>

        {/* ---------- Shoulders ---------- */}
        <path
          d="M56 268C58 220 84 198 120 198C156 198 182 220 184 268Z"
          fill={`url(#${u}-torso)`}
        />
        {/* Shirt V */}
        <path d="M120 198L104 210L120 236L136 210Z" fill="#E9ECF5" />
        {/* Collar */}
        <path d="M120 198L104 210L96 202L108 196Z" fill="#151828" />
        <path d="M120 198L136 210L144 202L132 196Z" fill="#151828" />
        {/* Accent placket — ties the figure to the site palette */}
        <path
          d="M120 214L126 222L120 240L114 222Z"
          fill={`url(#${u}-accent)`}
          opacity="0.85"
        />

        {/* ---------- Head (parallaxes further than the body) ---------- */}
        <motion.g style={{ x: headX, y: headY, rotate: headRotate }}>
          {/* Neck */}
          <path
            d="M104 150H136V186C136 194 104 194 104 186Z"
            fill={`url(#${u}-neck)`}
          />

          {/* Ears */}
          <ellipse cx="70" cy="126" rx="7.5" ry="12" fill={`url(#${u}-skin)`} />
          <ellipse
            cx="170"
            cy="126"
            rx="7.5"
            ry="12"
            fill={`url(#${u}-skin)`}
          />

          {/* Face — a long oval that tapers to the chin */}
          <path
            d="M120 50C147 50 168 63 170 89C171 107 171 123 168 139C165 157 146 177 120 177C94 177 75 157 72 139C69 123 69 107 70 89C72 63 93 50 120 50Z"
            fill={`url(#${u}-skin)`}
          />

          {/* Cheeks */}
          <ellipse cx="92" cy="145" rx="10" ry="6" fill="#D2734F" opacity="0.14" />
          <ellipse cx="148" cy="145" rx="10" ry="6" fill="#D2734F" opacity="0.14" />

          {/* Brows */}
          <motion.g style={{ y: browY }}>
            <path
              d="M85 113C92 105 104 103.5 111.5 108.5"
              stroke="#241C2E"
              strokeWidth="5.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M155 113C148 105 136 103.5 128.5 108.5"
              stroke="#241C2E"
              strokeWidth="5.4"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* Eyes */}
          <Eye u={u} side="L" blink={blink} pupilX={pupilX} pupilY={pupilY} />
          <Eye u={u} side="R" blink={blink} pupilX={pupilX} pupilY={pupilY} />

          {/* Nose */}
          <path
            d="M121 124L118.5 143"
            stroke="#B87F55"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
            fill="none"
          />
          <path
            d="M113 147C117 151 125 151 129 146"
            stroke="#AE7749"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.55"
            fill="none"
          />

          {/* Mouth — widens into a grin when the cursor comes close */}
          <motion.path
            initial={false}
            animate={{
              d: near
                ? "M102 160C110 172 130 172 138 160"
                : "M106 161C112 167 128 167 134 161",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            stroke="#9E5348"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Hair — solid cap first, then curls on top */}
          <path
            d="M71 100C65 66 89 40 120 40C151 40 175 66 169 100C165 88 161 80 154 76C146 72 137 80 127 80C116 80 105 76 96 78C86 80 77 88 71 100Z"
            fill={`url(#${u}-hair)`}
          />
          {CURLS.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={`url(#${u}-hair)`}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}

function Eye({
  u,
  side,
  blink,
  pupilX,
  pupilY,
}: {
  u: string;
  side: "L" | "R";
  blink: boolean;
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
}) {
  const cx = side === "L" ? 100 : 140;
  const shape =
    side === "L"
      ? "M88 124C92.5 115.5 107.5 115.5 112 124C107.5 132 92.5 132 88 124Z"
      : "M128 124C132.5 115.5 147.5 115.5 152 124C147.5 132 132.5 132 128 124Z";

  // The lid line drops and flattens as the skin sweeps down over the eye.
  const lidOpen =
    side === "L"
      ? "M88 124C92.5 115.5 107.5 115.5 112 124"
      : "M128 124C132.5 115.5 147.5 115.5 152 124";
  const lidClosed =
    side === "L"
      ? "M88 126C92.5 123 107.5 123 112 126"
      : "M128 126C132.5 123 147.5 123 152 126";

  const ease = { duration: 0.09, ease: "easeOut" as const };

  return (
    <g>
      <path d={shape} fill="#FBF7F2" />

      <g clipPath={`url(#${u}-eye${side})`}>
        <motion.g style={{ x: pupilX, y: pupilY }}>
          <circle cx={cx} cy={124} r="5.4" fill={`url(#${u}-iris)`} />
          <circle cx={cx} cy={124} r="2.5" fill="#140B04" />
          <circle
            cx={cx - 1.9}
            cy={121.8}
            r="1.7"
            fill="#FFFFFF"
            opacity="0.92"
          />
        </motion.g>

        {/* Eyelid: a skin panel parked just above the eye that sweeps down */}
        <motion.rect
          x={cx - 18}
          y={86}
          width={36}
          height={28}
          fill={`url(#${u}-skin)`}
          initial={false}
          animate={{ y: blink ? 21 : 0 }}
          transition={ease}
        />
      </g>

      {/* Lash line rides with the lid */}
      <motion.path
        initial={false}
        animate={{ d: blink ? lidClosed : lidOpen }}
        transition={ease}
        stroke="#2A2032"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}
