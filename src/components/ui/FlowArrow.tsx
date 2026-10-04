import { SurgeRun, type SurgeTiming } from "@/components/ui/SurgeRun";
import { cn } from "@/lib/utils";

export interface FlowArrowProps {
  className?: string;
  /** Plays a charge crossing the arrow, from the stage behind it to the one ahead. */
  surge?: SurgeTiming;
}

/**
 * The run between two stages in a flow: a line with a head on it.
 *
 * Positioned rather than laid out in flow — it spans from its own stage's left edge
 * back across the gap to the one before, so it meets a box at each end instead of
 * floating between them. Its width reads `--node-gap` for that reason: a literal
 * width stops touching the moment the row's gutter changes.
 *
 * It states an order, and the head is the whole point of it.
 *
 * Hidden below `lg`, where the stages stack and their numbers carry the sequence.
 */
export function FlowArrow({ className, surge }: FlowArrowProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-border-section absolute top-1/2 right-full hidden w-[var(--node-gap)] -translate-y-1/2 items-center lg:flex",
        className,
      )}
    >
      <span className="bg-border-section h-px flex-1" />

      {/* Inline rather than a glyph: it is three points, and stroking it in
          `currentColor` is what keeps the head exactly the line's colour. */}
      <svg
        viewBox="0 0 6 10"
        width="6"
        height="10"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M1 1 5 5 1 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/*
       * `surge-ambient` because this charge answers nothing the reader did — it is
       * scenery, and scenery is switched off rather than frozen when motion is not
       * wanted.
       */}
      {surge ? (
        <SurgeRun
          {...surge}
          className="surge-ambient top-1/2 -translate-y-1/2"
        />
      ) : null}
    </span>
  );
}
