import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Where a charge sits in time. Shared by every piece a charge can travel — a run,
 * an outline, a connector — so the pieces of one choreography are all described the
 * same way and cannot drift apart (§14).
 */
export interface SurgeTiming {
  /** Milliseconds before the charge reaches this piece. */
  delay: number;
  /** Milliseconds the charge takes to cross it. */
  duration: number;
  /**
   * Repeats forever on this period instead of running once. The charge still takes
   * `duration` to cross; for the rest of the cycle it waits off the piece, which is
   * what lets several pieces relay a single charge round and round between them.
   */
  cycle?: number;
  /** Sends the charge right to left. */
  reverse?: boolean;
}

export interface SurgeRunProps extends SurgeTiming {
  /**
   * Where the run sits on its parent. The component owns its length and its motion,
   * never its vertical placement — the same charge rides a link's midline and an
   * entry's top and bottom edges.
   */
  className?: string;
}

/**
 * How far the band travels to clear the run, and how far before the run it starts —
 * both as percentages of the BAND's own width, and both fixed by
 * `.surge-run::before`. The default end in that rule is their difference, so the
 * arithmetic below reduces to it exactly when a cycle is one crossing long.
 */
const SURGE_START = 100;
const SURGE_SWEEP = 322;

/**
 * A charge travelling the length of a horizontal run.
 *
 * One component for both the links and the entry edges, because it is the same
 * thing in both places: a bright head crossing a straight line (§6.0). Only where it
 * sits differs, and that is the caller's to decide.
 */
export function SurgeRun({
  delay,
  duration,
  cycle,
  reverse = false,
  className,
}: SurgeRunProps) {
  return (
    <span
      aria-hidden
      className={cn("surge-run", className)}
      style={
        {
          "--surge-delay": `${delay}ms`,
          // A looping run animates across the WHOLE cycle rather than its own
          // crossing, and the stretched travel below is what keeps the band parked
          // out of sight for the part of it that belongs to other pieces.
          "--surge-duration": `${cycle ?? duration}ms`,
          "--surge-direction": reverse ? "reverse" : "normal",
          ...(cycle === undefined
            ? {}
            : {
                "--surge-iterations": "infinite",
                "--surge-run-end": `${Math.round((SURGE_SWEEP * cycle) / duration) - SURGE_START}%`,
              }),
        } as CSSProperties
      }
    />
  );
}
