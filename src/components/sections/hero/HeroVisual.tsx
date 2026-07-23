"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { Gamepad2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { durations, easing } from "@/lib/motion";

function ring(
  reduced: boolean,
  duration: number,
  direction: 1 | -1 = 1,
) {
  if (reduced) return undefined;
  return {
    rotate: direction * 360,
    transition: { duration, ease: "linear" as const, repeat: Infinity },
  };
}

function floatY(reduced: boolean, distance: number, duration: number) {
  if (reduced) return undefined;
  return {
    y: [0, -distance, 0],
    transition: { duration, ease: easing.standard, repeat: Infinity },
  };
}

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 120, damping: 18 });
  const py = useSpring(y, { stiffness: 120, damping: 18 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(nx * 14);
    y.set(ny * 14);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: durations.slow, delay: 0.5, ease: easing.luxury }}
      className="relative mx-auto aspect-square w-full max-w-[clamp(280px,40vw,480px)]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative size-full"
      >
        <motion.div style={{ x: px, y: py }} className="relative size-full">
          {/* Concentric rings */}
          <motion.div
            animate={ring(!!prefersReducedMotion, 60, 1)}
            className="absolute inset-0 rounded-full border border-border-default"
          />
          <motion.div
            animate={ring(!!prefersReducedMotion, 45, -1)}
            className="absolute inset-[10%] rounded-full border border-border-strong"
          />
          <motion.div
            animate={ring(!!prefersReducedMotion, 30, 1)}
            className="absolute inset-[22%] rounded-full border border-dashed border-border-glass"
          >
            {/* Orbiting node sits on the dashed ring */}
            <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary shadow-glow" />
          </motion.div>

          {/* Core orb */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.05, 1],
                    opacity: [0.85, 1, 0.85],
                    transition: {
                      duration: 6,
                      ease: easing.standard,
                      repeat: Infinity,
                    },
                  }
            }
            className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_30%_30%,_var(--accent-primary),_var(--accent-secondary)_55%,_transparent_78%)] shadow-purple-glow"
          />
          <span className="absolute inset-[44%] flex items-center justify-center rounded-full text-text-primary">
            <Gamepad2 size={28} aria-hidden="true" />
          </span>

          {/* Floating HUD cards */}
          <motion.div
            animate={floatY(!!prefersReducedMotion, 12, 7)}
            className={cn(
              "glass-card absolute -top-2 -right-2 flex w-36 flex-col gap-2 p-3",
            )}
          >
            <span className="text-label inline-flex items-center gap-1.5 text-accent-primary">
              <Sparkles size={12} aria-hidden="true" />
              Stacked Developer
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="h-1.5 w-full rounded-full bg-elevated-surface" />
              <span className="h-1.5 w-2/3 rounded-full bg-accent-primary/70" />
            </div>
          </motion.div>

          <motion.div
            animate={floatY(!!prefersReducedMotion, 16, 9)}
            className="glass-card absolute -bottom-2 -left-2 flex w-32 flex-col gap-2 p-3"
          >
            <span className="text-label text-text-secondary">Responsive</span>
            <span className="text-h4 text-text-primary">100%</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
