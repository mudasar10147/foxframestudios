import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const radiusStyles = {
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

export type NodeBoxRadius = keyof typeof radiusStyles;

export interface NodeBoxProps {
  /**
   * Picked from a list rather than passed through `className`, because there is no
   * `tailwind-merge` here (§2.2): a caller adding `rounded-xl` next to a built-in
   * `rounded-lg` would ship both and leave the winner to stylesheet order.
   */
  radius?: NodeBoxRadius;
  className?: string;
  children?: ReactNode;
}

/**
 * A lit box on one of the site's wired rows: a cyan outline over a dark fill, a
 * bloom pushing out past the edge, and a gloss line inside the top.
 *
 * The chrome only — no size, no padding, no type, so shape stays the caller's
 * decision; baking one in is what would force the next row to fork it.
 *
 * A node in a diagram, not a content card: a change to how the site's cards
 * present should not reach the wiring (§6.0).
 */
export function NodeBox({ radius = "lg", className, children }: NodeBoxProps) {
  return (
    <div
      className={cn(
        "node-box border-border-section bg-surface relative border",
        radiusStyles[radius],
        className,
      )}
    >
      {children}
    </div>
  );
}
