"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export interface RiseProps {
  /** Milliseconds this element trails the one before it. */
  delay?: number;
  /**
   * "mount" plays as soon as the page renders — right for content already on screen.
   * "in-view" holds until the element is scrolled to, which is what a section below
   * the fold needs: otherwise its entrance plays out of sight and it simply appears.
   */
  trigger?: "mount" | "in-view";
  className?: string;
  children: ReactNode;
}

/**
 * Staggers an entrance for a block of content. Pure CSS motion — no animation library —
 * and reduced-motion safe through the global rule, which lands the element on its final
 * state rather than leaving it faded out.
 */
export function Rise({
  delay = 0,
  trigger = "mount",
  className,
  children,
}: RiseProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const hasPlayed = trigger === "mount" || isInView;

  return (
    <div
      ref={ref}
      className={cn(hasPlayed ? "rise-in" : "rise-pending", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
