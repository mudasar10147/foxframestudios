"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  GlowLayer,
  GridBackground,
  NoiseLayer,
  ParticleLayer,
} from "@/components/effects";
import { durations, easing } from "@/lib/motion";

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  const float = (offset: number) =>
    prefersReducedMotion
      ? undefined
      : {
          y: [0, -24, 0],
          x: [0, 16, 0],
          transition: {
            duration: 14 + offset,
            ease: easing.standard,
            repeat: Infinity,
          },
        };

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: durations.verySlow, ease: easing.luxury }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <GlowLayer />
      <GridBackground className="opacity-50" />
      <NoiseLayer />
      <ParticleLayer className="opacity-40" />

      <motion.div
        animate={float(0)}
        className="absolute -top-24 -left-24 size-96 rounded-full bg-accent-primary/20 blur-[120px]"
      />
      <motion.div
        animate={float(6)}
        className="absolute -right-24 bottom-0 size-[28rem] rounded-full bg-glow-blue/30 blur-[140px]"
      />
    </motion.div>
  );
}
