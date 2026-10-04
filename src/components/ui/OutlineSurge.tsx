"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SurgeTiming } from "@/components/ui/SurgeRun";
import { cn } from "@/lib/utils";

/** Corner radius traced. Must match the radius of the element this is laid over. */
const RADIUS = 8;
/** Half the stroke, so the charge rides the centre of a 1px border. */
const INSET = 0.5;

export interface OutlineSurgeProps extends SurgeTiming {
  className?: string;
}

/**
 * The dash length in `.outline-surge path`, and the distance that dash covers
 * getting from just before a path to just past it — the path is normalised to 100
 * units, so crossing it is always those 100 plus the dash's own length. Both are
 * fixed by that rule; changing either there means changing it here.
 */
const DASH = 14;
const DASH_SWEEP = DASH + 100;

/**
 * The box assumed until the real one has been measured.
 *
 * The paths have to exist from the very first frame, even at the wrong size. A CSS
 * animation's clock starts when its element does, so an outline that waited for a
 * measurement would start its clock late and fall out of step with the pieces
 * relaying a charge to it. The numbers themselves do not matter: `pathLength` keeps
 * the charge at the same fraction along the outline when the real `d` replaces
 * this one, so the correction is invisible.
 */
const ASSUMED_BOX = { width: 200, height: 48 } as const;

/**
 * Half of an element's outline, from the left edge's midpoint to the right edge's.
 *
 * The top half climbs the left edge, rounds the corner, crosses the top and comes
 * back down to the midpoint; the bottom half is its mirror. Run together they read
 * as one charge splitting and rejoining.
 */
function halfOutline(width: number, height: number, half: "top" | "bottom") {
  const r = RADIUS - INSET;
  const left = INSET;
  const right = width - INSET;
  const middle = height / 2;

  if (half === "top") {
    const edge = INSET;
    return [
      `M${left} ${middle}`,
      `L${left} ${edge + r}`,
      `A${r} ${r} 0 0 1 ${left + r} ${edge}`,
      `L${right - r} ${edge}`,
      `A${r} ${r} 0 0 1 ${right} ${edge + r}`,
      `L${right} ${middle}`,
    ].join(" ");
  }

  const edge = height - INSET;
  return [
    `M${left} ${middle}`,
    `L${left} ${edge - r}`,
    `A${r} ${r} 0 0 0 ${left + r} ${edge}`,
    `L${right - r} ${edge}`,
    `A${r} ${r} 0 0 0 ${right} ${edge - r}`,
    `L${right} ${middle}`,
  ].join(" ");
}

/**
 * A charge that splits at one edge of an element, runs both halves of its outline,
 * and rejoins at the opposite edge.
 *
 * The outline is measured rather than expressed in percentages because SVG path data
 * takes no relative units, and stretching a fixed viewBox to fit would turn the
 * corner arcs into ellipses. Height is fixed here but width follows the grid, so the
 * box is observed rather than read once.
 *
 * `pathLength="100"` renormalises each half to 100 units, so one dash pattern fits
 * any button width — and because both halves are normalised, they take exactly the
 * same time whatever their real lengths.
 *
 * The dash pattern is deliberately LONGER than the path (14 + 200 against 100), so
 * only ever one charge is on the outline: the next repeat of the pattern has nowhere
 * to land. Offsets run from just before the start to just past the end, which is
 * what keeps it invisible either side without animating opacity.
 *
 * Given a `cycle`, the gap is widened in proportion and the offset sweeps the whole
 * dash period instead. The charge still crosses in the same 114 units, so it reads
 * at exactly the same speed — it simply waits in the gap until its turn comes round
 * again, which is how several outlines relay one charge between them forever.
 */
export function OutlineSurge({
  delay,
  duration,
  cycle,
  reverse = false,
  className,
}: OutlineSurgeProps) {
  const host = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const measure = () => {
      const { width, height } = element.getBoundingClientRect();
      setBox({ width, height });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const gap = Math.round((DASH_SWEEP * (cycle ?? duration)) / duration) - DASH;
  const { width, height } = box ?? ASSUMED_BOX;

  return (
    <span
      ref={host}
      aria-hidden
      className={cn("outline-surge", className)}
      style={
        {
          "--surge-delay": `${delay}ms`,
          // A looping outline animates across the WHOLE cycle rather than its own
          // crossing. Widening the gap between dashes by the same ratio is what
          // parks the charge off the path for the part of it that belongs to other
          // pieces, and sweeping the full period is what brings it back round.
          "--surge-duration": `${cycle ?? duration}ms`,
          "--surge-direction": reverse ? "reverse" : "normal",
          ...(cycle === undefined
            ? {}
            : {
                "--surge-iterations": "infinite",
                "--surge-gap": `${gap}`,
                "--surge-trace-end": `${-gap}`,
              }),
        } as CSSProperties
      }
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        {(["top", "bottom"] as const).map((half) => (
          <path
            key={half}
            d={halfOutline(width, height, half)}
            pathLength={100}
          />
        ))}
      </svg>
    </span>
  );
}
