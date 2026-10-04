import type { CSSProperties } from "react";
import { toneColor, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

const MIN_VALUE = 0;
const MAX_VALUE = 100;
const DEFAULT_BLOCKS = 5;
/** Gap between one block lighting up and the next, in either direction. */
const BLOCK_STAGGER_MS = 90;

const revealStyles = {
  /** Always shows its value. */
  static: "",
  /**
   * Unlit until the pointer is over the nearest ancestor marked
   * `hover-reveal-scope`, then lights block by block from the bottom, and goes out
   * from the top when the pointer leaves. On touch screens it simply shows its
   * value.
   */
  hover: "stack-meter-reveal-hover",
} as const;

export type StackMeterReveal = keyof typeof revealStyles;

export interface StackMeterProps {
  /** Percentage, 0–100, rounded to the nearest whole block. Clamped to that range. */
  value: number;
  /** Accessible name, e.g. "Client scripts level". */
  label: string;
  /** Number of blocks in the column. Defaults to 5. */
  blocks?: number;
  /** Colour of the bottom block; the column fades from this towards `to`. */
  from: Tone;
  /** Colour of the top block. Defaults to `dim`. */
  to?: Tone;
  /** When the blocks show the value. Defaults to `static`. */
  reveal?: StackMeterReveal;
  /** Sizing and placement only. The column fills this box. */
  className?: string;
}

/**
 * A vertical level meter made of stacked blocks, lit from the bottom up, with each
 * block's colour stepping from `from` to `to`.
 *
 * Exposed as a `meter`.
 */
export function StackMeter({
  value,
  label,
  blocks = DEFAULT_BLOCKS,
  from,
  to = "dim",
  reveal = "static",
  className,
}: StackMeterProps) {
  const clamped = Math.min(MAX_VALUE, Math.max(MIN_VALUE, value));
  const litCount = Math.round((clamped / MAX_VALUE) * blocks);
  // Index 0 is the BOTTOM block: the list is laid out bottom-up (see the CSS), so
  // DOM order is lighting order.
  const indices = Array.from({ length: blocks }, (_, index) => index);

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={MIN_VALUE}
      aria-valuemax={MAX_VALUE}
      className={cn("stack-meter", revealStyles[reveal], className)}
      // Built at runtime from data: the tone pair this column fades between.
      style={
        {
          "--meter-from": toneColor(from),
          "--meter-to": toneColor(to),
        } as CSSProperties
      }
    >
      {indices.map((index) => (
        <span
          // Blocks are fixed positions in a column that never reorders.
          key={index}
          className={cn(
            "stack-meter-block",
            index < litCount && "stack-meter-block-lit",
          )}
          style={
            {
              "--block-mix": `${blocks > 1 ? (index / (blocks - 1)) * 100 : 0}%`,
              "--block-enter-delay": `${index * BLOCK_STAGGER_MS}ms`,
              "--block-exit-delay": `${(litCount - 1 - index) * BLOCK_STAGGER_MS}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
