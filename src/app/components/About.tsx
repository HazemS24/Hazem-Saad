"use client";

import { HiOutlineAcademicCap, HiOutlineLocationMarker } from "react-icons/hi";
import { BiCodeAlt } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";
import { Blob, GlassCard, Reveal, Section, SectionHeading } from "./primitives";
import { ScrollPath } from "./ScrollPath";

const FACTS = [
  {
    Icon: HiOutlineAcademicCap,
    label: "Studying",
    value: "Computer Engineering, AI specialization",
    detail: "University of Waterloo · 3.9 GPA · 2027",
  },
  {
    Icon: MdWorkOutline,
    label: "Next up",
    value: "SWE Intern, Developer Tools",
    detail: "Shopify · September 2026",
  },
  {
    Icon: BiCodeAlt,
    label: "Focused on",
    value: "Systems, robotics perception, front-end",
    detail: "Ruby · PyTorch · ROS2 · React",
  },
  {
    Icon: HiOutlineLocationMarker,
    label: "Based in",
    value: "Ontario, Canada",
    detail: "Open to new work",
  },
];

export function About() {
  return (
    <Section id="about" className="relative">
      <Blob
        className="left-[-10%] top-[10%] h-[380px] w-[380px]"
        style={{ opacity: 0.1 }}
      />

      <ScrollPath className="mb-20 hidden lg:block" />

      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Engineering that spans{" "}
                <span className="text-grad">metal and pixels</span>.
              </>
            }
          />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-white/55 md:text-lg">
              Computer Engineering at Waterloo, specializing in AI. I&apos;ve
              built robotic perception systems, billing infrastructure at
              Shopify, and front ends people use every day — and I like that the
              two halves keep teaching each other.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3 self-start sm:grid-cols-2 lg:grid-cols-1">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={0.08 * i}>
              <GlassCard className="h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg text-white/70">
                    <f.Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/35">
                      {f.label}
                    </p>
                    <p className="mt-1.5 font-display text-[1.02rem] font-semibold leading-snug text-white">
                      {f.value}
                    </p>
                    <p className="mt-1 text-sm text-white/45">{f.detail}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
