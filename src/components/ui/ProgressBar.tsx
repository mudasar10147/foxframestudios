import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const revealStyles = {
  /** Always shows its value. */
  static: "",
  /**
   * Empty until the pointer is over the nearest ancestor marked
   * `hover-reveal-scope`, then fills to its value, and drains when the pointer
   * leaves. On touch screens it simply shows its value.
   */
  hover: "progress-reveal-hover",
} as const;

export type ProgressBarReveal = keyof typeof revealStyles;

export interface ProgressBarProps {
  /** Percentage, 0–100. Values outside that range are clamped to it. */
  value: number;
  /** Accessible name, e.g. "Scripting level". The bar has no visible text of its own. */
  label: string;
  /** When the fill shows its value. Defaults to `static`. */
  reveal?: ProgressBarReveal;
  /**
   * Sizing and spacing only, e.g. height and margins. Defaults to `h-2`. The colours
   * belong to the bar itself (§8.4).
   */
  className?: string;
}

/**
 * A horizontal level bar: a glowing accent fill on a quiet track.
 *
 * Exposed as a `meter`, not a `progressbar`: it shows a measured level, not a task
 * that is running towards completion.
 */
export function ProgressBar({
  value,
  label,
  reveal = "static",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(MAX_VALUE, Math.max(MIN_VALUE, value));

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={MIN_VALUE}
      aria-valuemax={MAX_VALUE}
      className={cn(
        "border-border-glass bg-surface-translucent relative h-2 w-full rounded-full border",
        revealStyles[reveal],
        className,
      )}
    >
      <div
        className="progress-fill bg-accent-primary absolute inset-y-0 left-0 rounded-full"
        // The one value a class cannot carry: it comes from data. Handed over as a
        // custom property, not a width, so the CSS can choose when to apply it.
        style={{ "--progress-value": `${clamped}%` } as CSSProperties}
      />
    </div>
  );
}
