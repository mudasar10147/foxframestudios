"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Sparkles } from "lucide-react";
import { easing } from "@/lib/motion";

export function AboutVisual() {
  const prefersReducedMotion = useReducedMotion();

  const float = (distance: number, duration: number) =>
    prefersReducedMotion
      ? undefined
      : {
          y: [0, -distance, 0],
          transition: {
            duration,
            ease: easing.standard,
            repeat: Infinity,
          },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[clamp(280px,38vw,440px)]">
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-3xl bg-accent-primary/10 blur-[100px]"
      />

      <div className="glass-card relative flex size-full items-center justify-center overflow-hidden rounded-3xl">
        <div
          aria-hidden="true"
          className="grid-background absolute inset-0 opacity-40"
        />
        <motion.div
          animate={float(10, 7)}
          className="relative flex size-40 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,_var(--accent-primary),_var(--accent-secondary)_60%,_transparent_80%)] shadow-purple-glow"
        >
          <span className="font-display text-display text-text-primary">AC</span>
        </motion.div>
      </div>

      <motion.div
        animate={float(12, 8)}
        className="glass-card absolute top-10 -left-4 flex items-center gap-2 p-3"
      >
        <Code2 size={16} className="text-accent-primary" aria-hidden="true" />
        <span className="text-body-sm text-text-primary">Pixel Perfect</span>
      </motion.div>

      <motion.div
        animate={float(14, 9)}
        className="glass-card absolute -right-4 bottom-10 flex items-center gap-2 p-3"
      >
        <Sparkles size={16} className="text-accent-primary" aria-hidden="true" />
        <span className="text-body-sm text-text-primary">Luau Powered</span>
      </motion.div>
    </div>
  );
}
