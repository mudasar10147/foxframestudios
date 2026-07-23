"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durations, easing } from "@/lib/motion";

type SkillMeterProps = {
  name: string;
  level: number;
  className?: string;
};

export function SkillMeter({ name, level, className }: SkillMeterProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-text-secondary">{name}</span>
        <span className="text-caption text-text-muted">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated-surface">
        <motion.div
          className="h-full rounded-full bg-accent-primary"
          initial={prefersReducedMotion ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: durations.slow, ease: easing.luxury }}
        />
      </div>
    </div>
  );
}
