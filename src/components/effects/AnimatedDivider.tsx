"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durations, easing } from "@/lib/motion";

type AnimatedDividerProps = {
  className?: string;
};

export function AnimatedDivider({ className }: AnimatedDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full overflow-hidden bg-border-default", className)}
    >
      <motion.span
        className="block h-full w-full origin-left bg-accent-primary"
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: durations.slow, ease: easing.luxury }}
      />
    </div>
  );
}
