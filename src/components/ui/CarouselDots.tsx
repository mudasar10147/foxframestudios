import { cn } from "@/lib/utils";

export interface CarouselDotsProps {
  /** How many slides the indicator represents. */
  count: number;
  /** Zero-based index of the slide currently shown. */
  activeIndex?: number;
  className?: string;
}

/**
 * Slide indicator: the active slide reads as a wider pill, the rest as small dots,
 * with the width and colour animating as the active index moves.
 *
 * Presentational for now and hidden from assistive tech, because there is no carousel
 * behind it yet — announcing "slide 1 of 4" would describe something that does not
 * exist. When the carousel lands these become real controls: drop `aria-hidden`, render
 * each as a `<button>` with an accessible name, and add a focus-visible ring.
 */
export function CarouselDots({
  count,
  activeIndex = 0,
  className,
}: CarouselDotsProps) {
  return (
    <ul aria-hidden className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className={cn(
            "h-1 rounded-full transition-[width,background-color] duration-300 ease-out",
            index === activeIndex
              ? "bg-accent-primary w-5"
              : "bg-text-muted w-1",
          )}
        />
      ))}
    </ul>
  );
}
