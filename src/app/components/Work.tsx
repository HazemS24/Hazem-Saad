"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { FILTERS, showcase, type Entry, type FilterId } from "../lib/data";
import { Blob, GlassCard, Section, SectionHeading } from "./primitives";
import { EntryImage } from "./EntryImage";
import { cn } from "../lib/cn";

const PAGE = 6;

export function Work() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [visible, setVisible] = useState(PAGE);

  const items = useMemo(
    () =>
      filter === "all"
        ? showcase
        : showcase.filter((e) => e.types.includes(filter)),
    [filter]
  );

  const shown = items.slice(0, visible);
  const more = items.length - shown.length;

  return (
    <Section id="work">
      <Blob
        className="left-[-14%] top-[30%] h-[460px] w-[460px]"
        style={{ opacity: 0.09 }}
      />

      <SectionHeading
        eyebrow="Work"
        title={
          <>
            Projects, awards, and things I{" "}
            <span className="text-grad">wanted to exist</span>.
          </>
        }
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
        {FILTERS.map((f) => {
          const count =
            f.id === "all"
              ? showcase.length
              : showcase.filter((e) => e.types.includes(f.id)).length;
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                setVisible(PAGE);
              }}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full border px-4 py-2 text-[0.82rem] transition-colors duration-300 md:px-5 md:py-2.5 md:text-sm",
                isActive
                  ? "border-white/25 text-ink-950"
                  : "border-white/10 bg-white/[0.03] text-white/55 backdrop-blur hover:border-white/25 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {f.label}
                <span
                  className={cn(
                    "ml-2 text-[0.72rem]",
                    isActive ? "text-ink-950/45" : "text-white/30"
                  )}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.ul
        layout
        className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((item, i) => (
            <motion.li
              key={item.name}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{
                duration: 0.5,
                delay: Math.min(i, 5) * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <WorkCard item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {more > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="group relative overflow-hidden rounded-full border border-white/12 bg-white/[0.03] px-8 py-3.5 text-sm text-white/75 backdrop-blur transition-all duration-500 ease-smooth hover:border-white/25 hover:text-white"
          >
            <span
              aria-hidden
              className="bg-grad absolute inset-0 -z-10 translate-y-full opacity-25 transition-transform duration-500 ease-smooth group-hover:translate-y-0"
            />
            Show {Math.min(more, PAGE)} more
          </button>
        </div>
      )}
    </Section>
  );
}

function WorkCard({ item }: { item: Entry }) {
  return (
    <GlassCard className="flex h-full flex-col p-5">
      {/* Image plate */}
      <div className="relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent">
        <div className="grid aspect-[16/10] place-items-center p-5">
          <EntryImage
            src={item.image}
            name={item.name}
            className="max-w-[6rem]"
            imgClassName="max-h-full max-w-full object-contain transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-white">
            {item.name}
          </h3>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.name}`}
              className="mt-0.5 shrink-0 text-white/35 transition-all duration-300 hover:-translate-y-0.5 hover:text-accent-teal"
            >
              <HiExternalLink className="text-lg" />
            </a>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="text-[0.75rem] text-white/35">
            {item.end_date
              ? `${item.start_date} — ${item.end_date}`
              : item.start_date}
          </span>
          {item.types.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider text-white/35"
            >
              {t.replace(" Experience", "")}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5 text-[0.86rem] leading-relaxed text-white/50">
          {item.description.split("\n").map((line, i) => (
            <li key={i} className="relative pl-4">
              <span
                aria-hidden
                className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-white/25"
              />
              {line}
            </li>
          ))}
        </ul>

        {item.tools.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
            {item.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[0.72rem] text-white/55"
              >
                {tool}
              </li>
            ))}
          </ul>
        )}
      </div>
    </GlassCard>
  );
}
