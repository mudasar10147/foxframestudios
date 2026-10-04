import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlSizeStyles = {
  /** Compact: 40px single-line height. */
  md: "px-3.5 py-2.5 text-sm",
  /** Roomy: 56px single-line height, for a form that is the page's focus. */
  lg: "px-5 py-3.5 text-base",
} as const;

export type ControlSize = keyof typeof controlSizeStyles;

/** Single-line height per size, for `Input` and `Select` (a textarea sets rows). */
export const controlHeightStyles: Record<ControlSize, string> = {
  md: "h-10",
  lg: "h-14",
};

export interface ControlStyleOptions {
  /** Defaults to `md`. */
  size?: ControlSize;
  className?: string;
}

/**
 * The single source of truth for form control appearance.
 *
 * Exported so `Textarea` can look identical without duplicating the recipe (§6.3) —
 * the same arrangement `buttonStyles` already has with `ButtonLink`.
 *
 * A control holding something invalid looks exactly like one that is not. This
 * system marks the problem with `aria-invalid` and names the fields in the form's
 * own message instead, which is what WCAG 3.3.1 actually asks for — identifying
 * the error — rather than a recoloured edge, which only ever said "something here"
 * and said it in colour alone.
 */
export function controlStyles({
  size = "md",
  className,
}: ControlStyleOptions = {}): string {
  return cn(
    "bg-background-secondary/70 text-text-primary placeholder:text-text-secondary border-border-control w-full rounded-lg border",
    controlSizeStyles[size],
    "transition-colors duration-150",
    "focus-visible:border-accent-primary focus-visible:ring-accent-glow focus-visible:ring-2 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );
}

export interface InputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size"
> {
  /** Defaults to `md`. */
  size?: ControlSize;
  /** Sits inside the control's right edge — a validation tick, a unit, a clear button. */
  trailing?: ReactNode;
}

/** A single-line form control. */
export function Input({
  className,
  size = "md",
  trailing,
  "aria-invalid": ariaInvalid,
  type = "text",
  ...props
}: InputProps) {
  const control = (
    <input
      type={type}
      aria-invalid={ariaInvalid}
      className={controlStyles({
        size,
        className: cn(
          controlHeightStyles[size],
          trailing ? "pr-10" : undefined,
          className,
        ),
      })}
      {...props}
    />
  );

  if (!trailing) return control;

  return (
    <span className="relative block">
      {control}
      {/*
       * Hidden from assistive technology: an adornment reports something the
       * control's own state already carries, so announcing it says it twice.
       */}
      <span
        aria-hidden
        className="absolute inset-y-0 right-3.5 flex items-center"
      >
        {trailing}
      </span>
    </span>
  );
}
