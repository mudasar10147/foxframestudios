/**
 * The distinguishable colours used for tiles, swatches and chart series. Each maps
 * to a Layer-2 theme colour (`--color-tone-*`), so it follows the tokens.
 */
const TONE_COLORS = {
  neutral: "var(--color-tone-neutral)",
  cool: "var(--color-tone-cool)",
  strong: "var(--color-tone-strong)",
  deep: "var(--color-tone-deep)",
  warm: "var(--color-tone-warm)",
  dim: "var(--color-tone-dim)",
} as const;

export type Tone = keyof typeof TONE_COLORS;

/**
 * A tone as a CSS colour value. Only for values built at runtime from data, such as
 * gradient stops; anything static should use the `bg-tone-*` utilities instead.
 */
export function toneColor(tone: Tone): string {
  return TONE_COLORS[tone];
}
