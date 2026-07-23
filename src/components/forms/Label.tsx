import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn("text-label text-text-secondary", className)} {...props}>
      {children}
      {required ? (
        <span className="text-status-error" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}
