import { cn } from "@/lib/utils";

/**
 * The footer's frame line: a straight run across the page whose ends kink at 45°
 * out to the screen's edges, with the kinks lit in the accent.
 *
 * The kinks are fixed-size SVGs at each end and the run between them is a plain
 * line, so the angles stay true at every width (a single stretched SVG would
 * flatten them). `edge="top"` kinks up and out, for the footer's top edge;
 * `edge="bottom"` is the same drawing flipped, for the line over the bottom bar.
 */
export function FooterRail({
  edge,
  className,
}: {
  edge: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "footer-rail",
        edge === "bottom" && "footer-rail-bottom",
        className,
      )}
    >
      <Kink />
      <span className="footer-rail-run" />
      <Kink mirrored />
    </div>
  );
}

function Kink({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 84 24"
      width="84"
      height="24"
      fill="none"
      className={cn("footer-rail-kink", mirrored && "-scale-x-100")}
    >
      <path className="footer-rail-edge" d="M0 0.5H58" />
      <path className="footer-rail-bend" d="M58 0.5L81 23.5H84" />
    </svg>
  );
}
