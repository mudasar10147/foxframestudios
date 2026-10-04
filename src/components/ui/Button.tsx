import type { ComponentPropsWithRef } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-accent-strong text-background-primary hover:bg-accent-primary active:bg-accent-strong",
  secondary:
    "border-border-strong bg-surface-elevated text-text-primary hover:bg-surface border",
  outline:
    "border-border-accent text-accent-primary hover:bg-accent-soft hover:border-accent-primary border bg-transparent",
  ghost:
    "text-text-secondary hover:bg-surface-translucent hover:text-text-primary",
  /** The page's one main action: bright accent fill with a halo that swells on hover. */
  glow: "button-glow bg-accent-primary text-background-primary hover:bg-accent-strong",
} as const;

const sizeStyles = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-base",
  icon: "size-10 justify-center",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * The single source of truth for button appearance.
 *
 * Exported so elements that must NOT be a `<button>` for semantic reasons — a CTA that
 * navigates, for example — can look identical without duplicating the recipe (§6.3).
 * Consume it through `ButtonLink` rather than hand-applying it where possible.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "inline-flex cursor-pointer items-center rounded-lg font-medium tracking-tight",
    "transition-colors duration-150",
    "focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export interface ButtonProps
  extends ComponentPropsWithRef<"button">, ButtonStyleOptions {
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? <Spinner size="sm" label={null} /> : null}
      {children}
    </button>
  );
}
