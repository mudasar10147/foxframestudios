import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className, ...props }, ref) {
    return (
      <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            "size-4 rounded-sm border border-border-default bg-elevated-surface accent-accent-primary",
            "transition-[border-color] duration-[var(--duration-fast)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        {label ? (
          <span className="text-body-sm text-text-secondary">{label}</span>
        ) : null}
      </label>
    );
  },
);
