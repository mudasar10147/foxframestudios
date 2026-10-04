import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  /** A pill with an accent outline over a faint fill: a tag or label. */
  outline: "border-border-accent bg-surface/40 text-text-primary border",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

const sizeStyles = {
  /** Fixed small type. */
  sm: "px-3 py-1 text-xs",
  /**
   * Takes its type size from the surrounding text, with padding in `em` to match,
   * so a row of badges can be scaled as one by setting the parent's font size.
   */
  fit: "badge-fit",
} as const;

export type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps {
  variant?: BadgeVariant;
  /** Defaults to `sm`. */
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
}

/** A small rounded label for tags, categories and short attributes. */
export function Badge({
  variant = "outline",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
