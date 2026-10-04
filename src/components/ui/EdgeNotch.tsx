import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * How far the notch steps in from the panel's edge, the height of each S-curve, and
 * the width of the line itself. `BULGE` and `CURVE` are the two dials: a taller
 * curve makes the step more gradual, a bigger bulge pushes it further in.
 */
const NOTCH_BULGE = 10;
const NOTCH_CURVE = 16;
const NOTCH_LINE = 2;

/** Total width: the step in, plus the border the notch has to land back on. */
const NOTCH_WIDTH = NOTCH_BULGE + NOTCH_LINE;

/** Where the panel's border box sits relative to its padding box, as a CSS length. */
const EDGE = "calc(var(--notch-inset) + var(--panel-border))";

/**
 * The panel's border width, for the surface holding the notches.
 *
 * It MUST equal `NOTCH_LINE`: the notch is pulled out by this much to seat its line
 * on the border, so any disagreement slides the two apart. Published from here
 * rather than written in CSS because the SVG geometry needs the number too.
 */
export function notchPanelStyle(): CSSProperties {
  return { "--panel-border": `${NOTCH_LINE}px` } as CSSProperties;
}

export interface EdgeNotchProps {
  side: "left" | "right";
  /**
   * Line colour as a CSS value — pass a token reference, never a literal (§8.2).
   * Defaults to the section panel's border, since the notch IS that border.
   */
  color?: string;
  className?: string;
}

/**
 * The silhouette a pair of notches cuts out of a panel, as inline `mask` properties.
 *
 * The panel's fill, frosting and texture all run out to its rectangular edge, so
 * stepping the border inward alone leaves them spilling past the curve. This removes
 * them, which is the only way that strip reads as genuinely outside the panel —
 * painting it in the page colour leaves a flat band that does not match.
 *
 * Seven layers: a cutout per side built from wedge, strip, wedge, plus the panel
 * itself. `exclude` is XOR, and because the cutouts sit inside the panel and never
 * overlap each other, XOR-ing each one in turn subtracts it.
 *
 * Positions use the four-value form (`left 0 top <len>`) deliberately: a percentage
 * in `mask-position` resolves against the element MINUS the layer size, not the
 * element, so `calc(100% - x)` would drift with the layer's height.
 *
 * Built here rather than in CSS so it shares `NOTCH_BULGE` and `NOTCH_CURVE` with
 * the component below. Restating those in a stylesheet would let the cutout and the
 * line drift apart the first time either was tuned.
 */
export function notchMaskStyle(): CSSProperties {
  const w = NOTCH_BULGE;
  const c = NOTCH_CURVE;

  const wedge = (d: string) =>
    `url("data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${c}" viewBox="0 0 ${w} ${c}"><path d="${d}" fill="#000"/></svg>`,
    )}")`;

  // Measured from the panel edge inward: nothing to remove where the border still
  // runs straight, the full step once the curve has finished moving in.
  const leftTop = wedge(`M0 0 C0 ${c / 2} ${w} ${c / 2} ${w} ${c} L0 ${c} Z`);
  const leftBottom = wedge(`M0 ${c} C0 ${c / 2} ${w} ${c / 2} ${w} 0 L0 0 Z`);
  const rightTop = wedge(
    `M${w} 0 C${w} ${c / 2} 0 ${c / 2} 0 ${c} L${w} ${c} Z`,
  );
  const rightBottom = wedge(
    `M${w} ${c} C${w} ${c / 2} 0 ${c / 2} 0 0 L${w} 0 Z`,
  );

  const solid = "linear-gradient(#000, #000)";
  const stripTop = `calc(${EDGE} + ${c}px)`;
  const stripSize = `${w}px calc(100% - 2 * ${EDGE} - ${2 * c}px)`;
  const capSize = `${w}px ${c}px`;

  return {
    maskImage: [
      leftTop,
      solid,
      leftBottom,
      rightTop,
      solid,
      rightBottom,
      solid,
    ].join(", "),
    maskPosition: [
      `left 0 top ${EDGE}`,
      `left 0 top ${stripTop}`,
      `left 0 bottom ${EDGE}`,
      `right 0 top ${EDGE}`,
      `right 0 top ${stripTop}`,
      `right 0 bottom ${EDGE}`,
      "left 0 top 0",
    ].join(", "),
    maskSize: [
      capSize,
      stripSize,
      capSize,
      capSize,
      stripSize,
      capSize,
      "100% 100%",
    ].join(", "),
    maskRepeat: "no-repeat",
    maskComposite: "exclude, exclude, exclude, exclude, exclude, exclude, add",
  };
}

/**
 * The inward step in a panel's side border: straight, curve in, straight, curve
 * back, straight.
 *
 * This is the border itself, not a line beside it. Two things make that true: the
 * panel masks its own outline away over this span (`.hud-panel-section::before`),
 * and `notchMaskStyle` above cuts the panel's fill back to the same curve. All three
 * read `--notch-inset`, which is what keeps their ends together.
 *
 * Built as three pieces — curve, line, curve — rather than one stretched path,
 * because a single path scaled to the panel's height would smear its curves into
 * long diagonals. The straight run flexes; the curves never change shape.
 *
 * Coordinates are offset by half a line width because an SVG stroke straddles its
 * path: on whole numbers a 1px stroke would land across two device pixels and blur.
 * That half pixel is also what seats the line exactly against the mask's edge.
 */
export function EdgeNotch({ side, color, className }: EdgeNotchProps) {
  const half = NOTCH_LINE / 2;

  // Leaves the border travelling straight down and arrives at the bulge travelling
  // straight down, so it reads as the border easing over rather than a cut corner.
  // Drawn stepping LEFT; `.edge-notch-left` mirrors it for the other side.
  const curve =
    `M${NOTCH_WIDTH - half} 0 ` +
    `C${NOTCH_WIDTH - half} ${NOTCH_CURVE / 2} ${half} ${NOTCH_CURVE / 2} ${half} ${NOTCH_CURVE}`;

  const cap = (flipped: boolean) => (
    <svg
      width={NOTCH_WIDTH}
      height={NOTCH_CURVE}
      viewBox={`0 0 ${NOTCH_WIDTH} ${NOTCH_CURVE}`}
      fill="none"
      className={cn("shrink-0", flipped && "-scale-y-100")}
    >
      <path
        d={curve}
        stroke="var(--notch-color)"
        strokeWidth={NOTCH_LINE}
        strokeLinecap="square"
      />
    </svg>
  );

  return (
    <span
      aria-hidden
      className={cn(
        "edge-notch pointer-events-none flex flex-col items-start",
        side === "left" ? "edge-notch-left" : "edge-notch-right",
        className,
      )}
      style={
        {
          width: NOTCH_WIDTH,
          "--notch-line": `${NOTCH_LINE}px`,
          "--notch-color": color ?? "var(--border-section)",
        } as CSSProperties
      }
    >
      {cap(false)}
      <span className="edge-notch-line flex-1" />
      {cap(true)}
    </span>
  );
}
