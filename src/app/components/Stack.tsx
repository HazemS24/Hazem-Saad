"use client";

import { ALL_TOOLS, STACK } from "../lib/data";
import { GlassCard, Reveal, Section, SectionHeading } from "./primitives";

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Stack"
        title={
          <>
            The tools I reach for <span className="text-grad">first</span>.
          </>
        }
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-3">
                <span className="bg-grad h-1.5 w-1.5 rounded-full" />
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                  {group.group}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[0.82rem] text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Everything, drifting past */}
      <Reveal delay={0.15}>
        <div className="marquee-mask relative mt-14 overflow-hidden py-2">
          <div className="animate-marquee flex w-max gap-3">
            {[...ALL_TOOLS, ...ALL_TOOLS].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-sm text-white/40"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
