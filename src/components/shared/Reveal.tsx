"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { durations, easing, revealVariants, type RevealVariant } from "@/lib/motion";

type RevealProps = {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  variant = "up",
  delay = 0,
  duration = durations.slow,
  once = true,
  amount = 0.2,
  className,
  children,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easing.luxury }}
    >
      {children}
    </motion.div>
  );
}
