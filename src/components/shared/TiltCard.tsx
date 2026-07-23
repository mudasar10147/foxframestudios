"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  /** Maximum rotation in degrees. Keep low — this is polish, not a gimmick. */
  max?: number;
  className?: string;
};

export function TiltCard({ children, max = 3, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // Softer spring than the default: settles slowly rather than snapping back.
  const springX = useSpring(rotateX, { stiffness: 90, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 90, damping: 20 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (prefersReducedMotion) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1400,
      }}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}
