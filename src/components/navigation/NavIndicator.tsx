"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type NavIndicatorProps = {
  /** Shared layout id to animate between active items. */
  layoutId?: string;
  className?: string;
};

export function NavIndicator({
  layoutId = "nav-indicator",
  className,
}: NavIndicatorProps) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1 left-0 h-px w-full bg-accent-primary",
        className,
      )}
    />
  );
}
