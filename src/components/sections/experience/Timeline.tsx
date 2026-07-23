"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { TimelineCard } from "@/components/cards/TimelineCard";
import { Reveal } from "@/components/shared/Reveal";
import type { ExperienceEntry } from "@/types";

type TimelineProps = {
  entries: ExperienceEntry[];
};

export function Timeline({ entries }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1.5 w-px -translate-x-1/2 bg-border-default"
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1.5 w-px -translate-x-1/2 origin-top bg-accent-primary"
        style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
      />

      <div className="flex flex-col gap-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="grid grid-cols-[12px_1fr] gap-x-4 sm:gap-x-6"
          >
            <div className="relative pt-1">
              <span className="block size-3 rounded-full bg-accent-primary shadow-glow ring-4 ring-background-primary" />
            </div>
            <Reveal variant="up">
              <TimelineCard
                role={entry.role}
                company={entry.company}
                period={entry.period}
                summary={entry.summary}
                tags={entry.tags}
              />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
