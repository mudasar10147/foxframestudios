import { useEffect, useRef, useState } from "react";

export interface UseInViewOptions {
  /** Fraction of the element that must be showing before it counts as in view. */
  threshold?: number;
  /** Shrinks the viewport so the reveal fires just before the element's edge. */
  rootMargin?: string;
}

/**
 * Reports when an element first scrolls into view.
 *
 * Latches: it reports true once and disconnects, so content never re-hides when the
 * element scrolls back out. Falls back to true immediately where
 * `IntersectionObserver` is missing — the alternative is content that stays hidden
 * forever, which is a far worse failure than skipping an animation.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
