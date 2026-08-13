"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { HiArrowDown } from "react-icons/hi";
import { Avatar } from "./Avatar";
import { Blob, Button, Pill } from "./primitives";
import { STATS } from "../lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export const SOCIALS = [
  {
    href: "https://github.com/HazemS24",
    label: "GitHub",
    Icon: AiOutlineGithub,
  },
  {
    href: "https://www.linkedin.com/in/hazem-saad",
    label: "LinkedIn",
    Icon: AiFillLinkedin,
  },
  {
    href: "https://www.instagram.com/_hsaad04/",
    label: "Instagram",
    Icon: AiOutlineInstagram,
  },
  {
    href: "https://www.youtube.com/channel/UCW2xU773uz7wGhp5ToAIX2A/",
    label: "YouTube",
    Icon: AiFillYoutube,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      id="top"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden px-5 pb-16 pt-28 md:px-12 md:pb-32 md:pt-44 xl:px-20"
    >
      <div aria-hidden className="grid-bg absolute inset-0 z-0" />
      <Blob className="right-[-8%] top-[-14%] h-[520px] w-[520px]" />
      <Blob
        className="bottom-[-30%] left-[-14%] h-[420px] w-[420px]"
        style={{ opacity: 0.12, animationDelay: "-6s" }}
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-shell items-center gap-10 md:gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Pill>Waterloo · Computer Engineering</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
            className="display-xl mt-7 max-w-[13ch] text-balance text-white"
          >
            I build things that{" "}
            <span className="text-grad-anim">think</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.22, ease: EASE }}
            className="mt-7 max-w-[34ch] text-base leading-relaxed text-white/55 md:text-lg"
          >
            Robotics perception, systems, and front-end. Incoming on
            Shopify&apos;s Developer Tools team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href="#work">See the work</Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-10 flex items-center gap-2"
          >
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-white/55 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.62 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.08] pt-7 md:mt-12 md:gap-x-12 md:pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold tracking-tight text-white">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-white/45">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Avatar in a glass ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]"
        >
          <div className="relative aspect-square rounded-[42%] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <div
              aria-hidden
              className="absolute inset-6 rounded-[40%] border border-white/[0.06]"
            />
            {/* Anchored to the ring's centre so it can't drift, then lifted
                a little so the figure sits high in the frame. */}
            <Avatar className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-[53%]" />
          </div>

          <div className="glass-strong absolute -bottom-2 left-0 hidden rounded-panel px-5 py-4 shadow-soft lg:block">
            <p className="text-xs text-white/45">Say hi to</p>
            <p className="font-display text-base font-semibold text-white">
              Hazem
            </p>
            <p className="mt-1 text-xs text-white/45">
              He&apos;s watching your cursor
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        style={{ opacity: fade }}
        className="relative z-10 mx-auto mt-12 flex w-fit flex-col items-center gap-3 text-white/35 transition-colors hover:text-white/70 md:mt-20"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.22em]">
          Scroll
        </span>
        <HiArrowDown className="animate-scroll-hint text-lg" />
      </motion.a>
    </div>
  );
}
