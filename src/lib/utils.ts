export type ClassValue = string | false | null | undefined;

/**
 * Joins class names, dropping falsy values so conditional classes stay readable.
 *
 * Deliberately NOT a `tailwind-merge` equivalent: it does not resolve conflicting
 * Tailwind utilities. Components therefore place their `className` prop LAST so a
 * consumer's override wins on specificity-equal utilities. See AGENTS.md §7.2 —
 * `className` is an escape hatch, not the styling mechanism.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
