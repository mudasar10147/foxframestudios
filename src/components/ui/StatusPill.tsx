import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneStyles = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  error: "bg-status-error",
  neutral: "bg-text-muted",
} as const;

export type StatusTone = keyof typeof toneStyles;

export interface StatusPillProps {
  tone?: StatusTone;
  /** Adds a slow pulse to draw attention to a live status. */
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}

export function StatusPill({
  tone = "success",
  pulse = false,
  className,
  children,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "text-text-secondary inline-flex items-center gap-2 text-sm whitespace-nowrap",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        {pulse ? (
          <span
            aria-hidden
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              toneStyles[tone],
            )}
          />
        ) : null}
        <span
          aria-hidden
          className={cn(
            "relative inline-flex size-2 rounded-full",
            toneStyles[tone],
          )}
        />
      </span>
      {children}
    </span>
  );
}
