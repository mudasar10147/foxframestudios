"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { easing } from "@/lib/motion";

const NUMERIC = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

type AnimatedCounterProps = {
  /** Supports values like "40K+", "100%", "5+" — animates the numeric part. */
  value: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  duration = 1.4,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(NUMERIC);
  const [display, setDisplay] = useState(() =>
    match ? `${match[1]}0${match[3]}` : value,
  );

  useEffect(() => {
    const parsed = value.match(NUMERIC);
    if (!parsed) {
      setDisplay(value);
      return;
    }
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const [, prefix, num, suffix] = parsed;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const controls = animate(0, target, {
      duration,
      ease: easing.luxury,
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
