import type { Ref } from "react";
import { cn } from "@/lib/utils";

/**
 * The plane, as one self-crossing outline.
 *
 * `fill-rule="evenodd"` is load-bearing, not decoration: the path doubles back over
 * itself where the near wing folds, and under the default non-zero rule those
 * crossings fill in solid and the fold disappears. It is inherited from a wrapping
 * `<g>` in the source; it is set on the path directly here.
 *
 */

/**
 * Where the glyph's box sits over the artwork.
 *
 * The supplied viewBox frames the plane by its BOUNDING BOX, and this plane's ink
 * is not centred in its bounding box: the swept wing carries the mass to the right
 * while only a thin tail reaches left. Boxed that way it sits visibly right of
 * centre — about 4px of it at the size the dial renders.
 *
 * So the box is cut around the filled area's centroid instead. It also has to be
 * WIDER than the source's 17: a box centred on the centroid has to reach as far
 * left as the tail does, which is further than it needs to reach right.
 *
 * Dials — `CENTRE_X` / `CENTRE_Y` are the point the box centres on; move `CENTRE_X`
 * toward 9 to go back to bounding-box framing. `EXTENT` is the box's size, and
 * making it smaller will start clipping the tail.
 */
const CENTRE_X = 10.199;
const CENTRE_Y = 8.091;
const EXTENT = 18.4;

/**
 * Rounded and built once: `CENTRE_X - EXTENT / 2` lands on 0.9990000000000006 in
 * binary floating point, and that noise would otherwise be shipped in the markup.
 */
const VIEW_BOX = [
  (CENTRE_X - EXTENT / 2).toFixed(3),
  (CENTRE_Y - EXTENT / 2).toFixed(3),
  EXTENT,
  EXTENT,
].join(" ");
const PLANE =
  "M17,1.042 L11.436,14.954 L7.958,11.477 L8.653,13.563 L7.03,14.958 L7.03,11.563 L14.984,3.375 L6.047,9.969 L1,8.694 L17,1.042 Z";

/**
 * The nose: the path's first point, which is where the ink comes to a tip.
 *
 * Read off the path rather than eyeballed, because the direction the plane appears
 * to point is measured from the same centroid the box is cut around — not from the
 * middle of the bounding box, which sits somewhere else entirely.
 */
const NOSE_X = 17;
const NOSE_Y = 1.042;

/**
 * Which way the plane points when nothing has rotated it, in radians clockwise from
 * the +x axis — so this one is negative, meaning up and to the right.
 *
 * Exported because anything that FLIES this glyph has to rotate it by the
 * difference between where it is going and where the ink already points, and
 * because a plane docking back into a resting copy of itself has to arrive on this
 * bearing exactly or the hand-back snaps.
 */
export const SEND_GLYPH_BEARING = Math.atan2(
  NOSE_Y - CENTRE_Y,
  NOSE_X - CENTRE_X,
);

export interface SendGlyphProps {
  /** Rendered size in pixels. */
  size?: number;
  className?: string;
  /**
   * The `<svg>` itself.
   *
   * A flight has to measure the glyph it takes off from, and fade the copy it
   * flies, so both need the element rather than a wrapper around it.
   */
  ref?: Ref<SVGSVGElement>;
}

/**
 * A paper plane, for sending something.
 *
 * Decorative. It carries no meaning of its own, so it stays out of the
 * accessibility tree and whatever it sits inside does the labelling — which is why
 * the source's `<title>` is dropped rather than carried through.
 */
export function SendGlyph({ size = 24, className, ref }: SendGlyphProps) {
  return (
    <svg
      ref={ref}
      aria-hidden
      width={size}
      height={size}
      viewBox={VIEW_BOX}
      className={cn("shrink-0", className)}
    >
      <path d={PLANE} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
