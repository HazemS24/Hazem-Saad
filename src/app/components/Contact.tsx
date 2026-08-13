"use client";

import { HiArrowUpRight } from "react-icons/hi2";
import { Avatar } from "./Avatar";
import { SOCIALS } from "./Hero";
import { Blob, Button, Reveal, Section } from "./primitives";

/** The address published on Hazem's resume. Swap if you'd rather use another. */
export const CONTACT_EMAIL = "hmaesaad@uwaterloo.ca";

export function Contact() {
  return (
    <Section id="contact" className="pb-0">
      <Blob
        className="left-1/2 top-[10%] h-[520px] w-[520px] -translate-x-1/2"
        style={{ opacity: 0.14 }}
      />

      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] px-5 py-12 text-center backdrop-blur-md md:rounded-[36px] md:px-16 md:py-24 md:backdrop-blur-xl">
          <span
            aria-hidden
            className="bg-grad absolute inset-x-0 top-0 h-px opacity-60"
          />

          <div className="mx-auto mb-8 w-24 md:w-28">
            <Avatar intensity={0.7} aura={false} />
          </div>

          <h2 className="display-lg mx-auto max-w-[16ch] text-balance text-white">
            Let&apos;s build something{" "}
            <span className="text-grad-anim">together</span>.
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${CONTACT_EMAIL}`}>
              Email me <HiArrowUpRight className="text-[0.9em]" />
            </Button>
            <Button
              href="https://www.linkedin.com/in/hazem-saad"
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </Button>
          </div>

          <p className="mt-8 select-all font-mono text-sm text-white/35">
            {CONTACT_EMAIL}
          </p>
        </div>
      </Reveal>

      <Footer />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.07] py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-white/35">
          © {new Date().getFullYear()} Hazem Saad — built with Next.js and too
          many gradients.
        </p>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/45 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
