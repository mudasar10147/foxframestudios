"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { easing, revealVariants, staggerContainer, type RevealVariant } from "@/lib/motion";

type StaggerProps = {
  className?: string;
  once?: boolean;
  amount?: number;
  children: ReactNode;
};

export function Stagger({
  className,
  once = true,
  amount = 0.2,
  children,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  variant?: RevealVariant;
  className?: string;
  children: ReactNode;
};

export function StaggerItem({
  variant = "up",
  className,
  children,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      transition={{ ease: easing.luxury }}
    >
      {children}
    </motion.div>
  );
}
