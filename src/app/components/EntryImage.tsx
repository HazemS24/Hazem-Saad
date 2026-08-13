"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

/**
 * Logo/thumbnail with a monogram fallback, so an entry whose image hasn't been
 * added yet still renders as a deliberate tile instead of a broken icon.
 */
export function EntryImage({
  src,
  name,
  className,
  imgClassName,
}: {
  src: string;
  name: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can finish (and fail) before React attaches onError during
  // hydration, which would leave a broken icon on screen forever.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    const initials = name
      .replace(/^\d+x\s*/i, "")
      .split(/[\s-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");

    return (
      <span
        className={cn(
          "grid h-full w-full place-items-center rounded-xl bg-white/[0.05] font-display text-base font-semibold text-white/45",
          className
        )}
        aria-hidden
      >
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={imgClassName}
    />
  );
}
