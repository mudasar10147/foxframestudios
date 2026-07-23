import type { Transition, Variants } from "motion/react";

/** Durations in seconds — mirrors --duration-* tokens. */
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

/** Cubic-bezier easings — mirrors --ease-* tokens. */
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  luxury: [0.16, 1, 0.3, 1],
  hover: [0.25, 0.1, 0.25, 1],
} as const;

export const transitions = {
  smooth: { duration: durations.normal, ease: easing.luxury },
  fast: { duration: durations.fast, ease: easing.hover },
  slow: { duration: durations.slow, ease: easing.luxury },
} satisfies Record<string, Transition>;

export const revealVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof revealVariants;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
