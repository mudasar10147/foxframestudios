import type { Variants } from "motion/react";
import { durations, easing } from "@/lib/motion";

/** Orchestrates the Hero load sequence after the background fades in. */
export const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easing.luxury },
  },
};

/** Line-by-line heading reveal (used inside an overflow-hidden mask). */
export const heroLine: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: durations.slow, ease: easing.luxury },
  },
};
