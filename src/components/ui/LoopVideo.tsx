"use client";

import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface LoopVideoProps {
  src: string;
  /** Shown until the video plays, and in its place when it can't. */
  poster: string;
  /**
   * What the clip shows, for assistive technology. Leave it out where the clip is
   * decoration beside a visible title, and it's hidden from them instead.
   */
  label?: string;
  /** Sizing and fit only, e.g. `object-cover`. */
  className?: string;
}

/**
 * A short silent clip that plays on a loop, in place, like an animated image: the
 * web-friendly stand-in for a GIF, at a fraction of the size.
 *
 * Muted and `playsInline`, which is what lets browsers autoplay it, phones included.
 * For viewers who have asked for reduced motion it doesn't start by itself: it
 * shows its poster, with the native controls to play it if they choose.
 *
 * The video itself only loads once it nears the viewport; until then it's just its
 * poster. A grid of these would otherwise download every clip on page load, most
 * of them for cards nobody has scrolled to yet.
 */
export function LoopVideo({ src, poster, label, className }: LoopVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // No threshold and a generous margin: start fetching a little before it shows.
  const { ref, isInView } = useInView<HTMLVideoElement>({
    threshold: 0,
    rootMargin: "200px 0px",
  });

  return (
    <video
      // Keyed by the motion preference: `autoPlay` only acts when the element
      // mounts, so switching it later needs a fresh element.
      key={prefersReducedMotion ? "still" : "playing"}
      ref={ref}
      src={isInView ? src : undefined}
      poster={poster}
      autoPlay={!prefersReducedMotion}
      controls={prefersReducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("absolute inset-0 size-full", className)}
    />
  );
}
