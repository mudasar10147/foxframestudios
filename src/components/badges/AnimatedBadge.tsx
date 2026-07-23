"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { durations, easing } from "@/lib/motion";
import { Badge, badgeVariants } from "./Badge";
import type { VariantProps } from "class-variance-authority";

type AnimatedBadgeProps = VariantProps<typeof badgeVariants> & {
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function AnimatedBadge({
  variant = "accent",
  size,
  icon,
  className,
  children,
}: AnimatedBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Badge variant={variant} size={size} icon={icon} className={className}>
        {children}
      </Badge>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      viewport={{ once: true }}
      transition={{ duration: durations.normal, ease: easing.luxury }}
      className="inline-flex"
    >
      <Badge variant={variant} size={size} icon={icon} className={className}>
        {children}
      </Badge>
    </motion.span>
  );
}
