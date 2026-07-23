"use client";

import { motion, useReducedMotion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/shared/Stagger";
import { durations, easing } from "@/lib/motion";
import type { ProcessStep } from "@/types";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px overflow-hidden bg-border-default lg:block"
      >
        <motion.span
          className="block h-full w-full origin-left bg-accent-primary/60"
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: durations.verySlow, ease: easing.luxury }}
        />
      </div>

      <Stagger className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <StaggerItem
            key={step.step}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="font-display text-h4 flex size-14 items-center justify-center rounded-full border border-border-glow bg-surface text-accent-primary shadow-purple-glow">
              {step.step}
            </span>
            <h3 className="text-h4 text-text-primary">{step.title}</h3>
            <p className="text-body-sm text-text-secondary">{step.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
