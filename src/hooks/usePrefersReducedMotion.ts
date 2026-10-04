import { useEffect, useState } from "react";

/**
 * Whether the viewer has asked for reduced motion.
 *
 * The global stylesheet already collapses animation and transition durations, which
 * is enough for decoration. This is for the cases where that is NOT enough: motion
 * the interface waits on, or that moves content rather than merely styling it — an
 * animation collapsed to nothing still leaves the timer it was paired with running.
 *
 * Starts false so the server and the first client render agree, then corrects in an
 * effect (§10.5).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return prefersReduced;
}
