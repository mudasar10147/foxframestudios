import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "text-body w-full rounded-md border border-border-default bg-elevated-surface px-4 py-3 text-text-primary",
          "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          "placeholder:text-text-muted",
          "focus-visible:border-border-glow focus-visible:shadow-glow focus-visible:outline-none",
          "aria-[invalid=true]:border-status-error",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
