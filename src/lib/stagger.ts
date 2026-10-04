/**
 * Delays for one item in a sequence that plays forwards on the way in and backwards
 * on the way out, so it unwinds rather than cutting off: the first item in is the
 * last out.
 */
export interface StaggerDelays {
  enterDelay: number;
  exitDelay: number;
}

export function staggerDelays(
  step: number,
  steps: number,
  stepMs: number,
): StaggerDelays {
  return {
    enterDelay: step * stepMs,
    exitDelay: (steps - 1 - step) * stepMs,
  };
}
