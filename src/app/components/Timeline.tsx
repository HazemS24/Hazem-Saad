"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { HiExternalLink } from "react-icons/hi";
import { experience, type Entry } from "../lib/data";
import { Blob, Reveal, Section, SectionHeading } from "./primitives";
import { EntryImage } from "./EntryImage";
import { cn } from "../lib/cn";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <Section id="experience">
      <Blob
        className="right-[-12%] top-[24%] h-[440px] w-[440px]"
        style={{ opacity: 0.1 }}
      />

      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <span className="text-grad">shipped</span>.
          </>
        }
      />

      <div ref={ref} className="relative mt-14 md:mt-20">
        {/* Rail — nodes sit on this same x at every breakpoint */}
        <div className="absolute bottom-0 left-[9px] top-3 w-px bg-white/[0.09]">
          <motion.span
            aria-hidden
            className="bg-grad absolute inset-x-0 top-0 h-full origin-top"
            style={{ scaleY: fill }}
          />
        </div>

        <ol className="space-y-4 md:space-y-6">
          {experience.map((item, i) => (
            <TimelineItem key={item.name} item={item} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TimelineItem({ item, index }: { item: Entry; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });

  return (
    <li ref={ref} className="relative pl-8 md:pl-12">
      {/* Node, centred on the rail */}
      <span
        aria-hidden
        className="absolute left-[9px] top-7 -translate-x-1/2 md:top-8"
      >
        <span
          className={cn(
            "block rounded-full transition-all duration-700 ease-smooth",
            inView
              ? "h-3.5 w-3.5 bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]"
              : "h-2.5 w-2.5 bg-white/25"
          )}
        />
      </span>

      <Reveal delay={Math.min(index, 3) * 0.05}>
        <article className="group relative overflow-hidden rounded-panel border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-700 ease-smooth hover:border-white/20 hover:bg-white/[0.055] md:p-8 md:backdrop-blur-xl">
          <span
            aria-hidden
            className="bg-grad pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70"
          />

          {/* Stacked on phones — there isn't room for the date beside the title */}
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-4">
            <div className="flex min-w-0 items-start gap-3.5 md:flex-1 md:gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-1.5 md:h-14 md:w-14 md:rounded-2xl md:p-2">
                <EntryImage
                  src={item.image}
                  name={item.org ?? item.role}
                  imgClassName="h-full w-full object-contain"
                />
              </span>
              <div className="min-w-0">
                <h3 className="display-sm text-balance text-white">
                  {item.role}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.org ?? item.name}`}
                      className="ml-2 inline-flex translate-y-[2px] text-white/35 transition-colors hover:text-accent-teal"
                    >
                      <HiExternalLink className="text-[1.05rem]" />
                    </a>
                  )}
                </h3>
                {item.org && (
                  <p className="mt-1 text-sm text-white/50">{item.org}</p>
                )}
              </div>
            </div>

            <span
              className={cn(
                "w-fit shrink-0 self-start rounded-full border px-3 py-1.5 text-[0.7rem] font-medium tracking-wide md:px-3.5 md:text-[0.72rem]",
                item.current
                  ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
                  : "border-white/10 bg-white/[0.04] text-white/45"
              )}
            >
              {item.end_date
                ? `${item.start_date} — ${item.end_date}`
                : item.start_date}
            </span>
          </div>

          <ul className="mt-4 space-y-1.5 text-[0.9rem] leading-relaxed text-white/50 md:mt-5">
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
            <ul className="mt-5 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
              {item.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[0.74rem] text-white/60 transition-colors duration-300 hover:border-white/20 hover:text-white md:px-3 md:py-1.5 md:text-[0.78rem]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          )}
        </article>
      </Reveal>
    </li>
  );
}
