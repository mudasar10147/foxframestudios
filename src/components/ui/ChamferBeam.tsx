"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Geometry {
  width: number;
  height: number;
  chamfer: number;
}

/**
 * How many stacked dashes build the fade. At a given distance behind the head, only the
 * layers longer than that distance are drawn, so overlap — and therefore opacity — falls
 * off with distance. More layers means a smoother gradient.
 */
const FADE_LAYERS = 8;

/**
 * Peak opacity of the layer nearest the head. Each successive (longer) layer is fainter,
 * so the accumulated alpha decays to almost nothing at the tail. Holding every layer at
 * the same opacity instead leaves the tail ending abruptly at that value.
 */
const HEAD_OPACITY = 0.4;

/** Idle time between sweeps, as a fraction of the path length. */
const PAUSE_RATIO = 0.4;

export interface ChamferBeamProps {
  /** Seconds for one sweep, including the pause before it repeats. */
  duration?: number;
  /** Streak length as a fraction of the path. */
  streak?: number;
  className?: string;
}

/**
 * Sweeps a single light streak along the lower outline of a `.chamfer-sides` panel:
 * from the top-left corner, down the left diagonal, across the bottom, and up the right
 * diagonal to the top-right corner. The top edge is deliberately not traced.
 *
 * The path is measured rather than drawn in a scaled viewBox: `--chamfer` is a fixed
 * length while the panel width is fluid, so a stretched SVG would shear the diagonals
 * out of alignment with the clip-path at every viewport size.
 *
 * Renders nothing until measured, so there is no server/client markup to mismatch.
 */
export function ChamferBeam({
  duration = 5,
  streak = 0.22,
  className,
}: ChamferBeamProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const probe = probeRef.current;
    if (!host || !probe) return;

    // An arrow const, not a hoisted declaration: hoisting would discard the
    // narrowing from the guard above and reintroduce nullable refs.
    const measure = () => {
      const box = host.getBoundingClientRect();
      setGeometry({
        width: box.width,
        height: box.height,
        chamfer: probe.getBoundingClientRect().width,
      });
    };

    measure();

    // The panel resizes with the viewport, and `--chamfer` itself changes at `sm`.
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn(
        "beam-host pointer-events-none absolute inset-0",
        className,
      )}
    >
      <span ref={probeRef} className="chamfer-probe" />

      {geometry && geometry.width > 0 ? (
        <Sweep geometry={geometry} duration={duration} streak={streak} />
      ) : null}
    </div>
  );
}

function Sweep({
  geometry,
  duration,
  streak,
}: {
  geometry: Geometry;
  duration: number;
  streak: number;
}) {
  const { width, height, chamfer } = geometry;

  // Open path: top-left → down the left diagonal → across the bottom → up to top-right.
  const path = `M 0 0 L ${chamfer} ${height} L ${width - chamfer} ${height} L ${width} 0`;

  const pathLength = 2 * Math.hypot(chamfer, height) + (width - 2 * chamfer);
  const streakLength = Math.max(60, pathLength * streak);

  // The dash period exceeds the path so the streak clears the end before the next
  // one enters, leaving a deliberate beat between sweeps.
  const period = pathLength + streakLength + pathLength * PAUSE_RATIO;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="absolute inset-0 overflow-visible"
    >
      <g className="beam-glow">
        {Array.from({ length: FADE_LAYERS }, (_, index) => {
          const length = (streakLength * (index + 1)) / FADE_LAYERS;
          const opacity = (HEAD_OPACITY * (FADE_LAYERS - index)) / FADE_LAYERS;

          return (
            <path
              key={index}
              d={path}
              stroke="var(--accent-primary)"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={opacity}
              className="beam-trace"
              style={
                {
                  strokeDasharray: `${length} ${period - length}`,
                  animationDuration: `${duration}s`,
                  // Starting each layer at its own length aligns every head on the
                  // same point; the tails then trail by their differing lengths.
                  "--beam-start": `${length}px`,
                  "--beam-period": `${period}px`,
                } as CSSProperties
              }
            />
          );
        })}
      </g>
    </svg>
  );
}
