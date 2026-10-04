import type { CSSProperties, ReactNode } from "react";
import { toneColor, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const revealStyles = {
  /** Always shows its value. */
  static: "",
  /**
   * Empty until the pointer is over the nearest ancestor marked
   * `hover-reveal-scope`, then fills to its value, and drains when the pointer
   * leaves. On touch screens it simply shows its value. Same behaviour as
   * `ProgressBar`'s `hover`.
   */
  hover: "ring-gauge-reveal-hover",
} as const;

export type RingGaugeReveal = keyof typeof revealStyles;

export interface RingGaugeSegment {
  /** How much of the ring this segment takes, as a percentage of the full circle. */
  share: number;
  tone: Tone;
}

/**
 * A gauge lights EITHER one arc of the accent (`value`) OR a run of coloured
 * segments laid end to end (`segments`), whose shares add up to how much is lit.
 * Never both, so the lit extent has one source.
 */
type RingGaugeFill =
  | {
      /** How much of the ring is lit, as a percentage (0–100). Clamped to that range. */
      value: number;
      segments?: never;
    }
  | { segments: readonly RingGaugeSegment[]; value?: never };

interface RingGaugeBaseProps {
  /** Accessible name, e.g. "Polygons". */
  label: string;
  /**
   * What a screen reader announces as the reading, e.g. "24K". Defaults to the
   * percentage. Set it whenever the centre shows something other than `value`.
   */
  valueText?: string;
  /** When the fill shows its value. Defaults to `static`. */
  reveal?: RingGaugeReveal;
  /** One unbroken band instead of four segments. Defaults to `false`. */
  continuous?: boolean;
  /**
   * Sizing and placement only. The gauge fills this box, as the largest circle that
   * fits it.
   */
  className?: string;
  /** Shown in the middle of the ring, sized relative to the ring. */
  children?: ReactNode;
}

export type RingGaugeProps = RingGaugeBaseProps & RingGaugeFill;

/**
 * The paint for a segmented fill: each segment's colour, hard-stopped, from 12
 * o'clock round. Built here because the stops come from data; the mask decides
 * how much of it shows.
 */
function segmentPaint(segments: readonly RingGaugeSegment[]): string {
  let start = 0;
  const stops = segments.map((segment) => {
    const end = start + segment.share;
    const stop = `${toneColor(segment.tone)} ${start}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(${stops.join(", ")}, transparent 0)`;
}

/**
 * A circular gauge with a glowing lit arc, in one colour or in coloured segments, and
 * optional content in the middle.
 *
 * Exposed as a `meter`. The centre content is hidden from assistive technology,
 * because a meter's children aren't read out anyway; the reading is carried by
 * `valueText` instead.
 */
export function RingGauge({
  value,
  segments,
  label,
  valueText,
  reveal = "static",
  continuous = false,
  className,
  children,
}: RingGaugeProps) {
  const lit = segments
    ? segments.reduce((sum, segment) => sum + segment.share, 0)
    : value;
  const clamped = Math.min(MAX_VALUE, Math.max(MIN_VALUE, lit));

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={MIN_VALUE}
      aria-valuemax={MAX_VALUE}
      aria-valuetext={valueText}
      className={cn(
        "ring-gauge size-full",
        revealStyles[reveal],
        continuous && "ring-gauge-continuous",
        className,
      )}
      // Values a class cannot carry: they come from data.
      style={
        {
          "--gauge-value": `${clamped}%`,
          ...(segments ? { "--gauge-paint": segmentPaint(segments) } : null),
        } as CSSProperties
      }
    >
      <div className="ring-gauge-dial">
        <div className="ring-gauge-shape ring-gauge-track" />
        <div className="ring-gauge-glow">
          <div className="ring-gauge-shape ring-gauge-fill" />
        </div>
        {children ? (
          <div aria-hidden className="ring-gauge-center">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
