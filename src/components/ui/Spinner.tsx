import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "size-3.5 border-[1.5px]",
  md: "size-4 border-2",
  lg: "size-5 border-2",
} as const;

export type SpinnerSize = keyof typeof sizeStyles;

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  /** Announced to screen readers. Pass `null` when a parent already labels the wait. */
  label?: string | null;
}

export function Spinner({
  size = "md",
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-current border-r-transparent",
          sizeStyles[size],
        )}
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
