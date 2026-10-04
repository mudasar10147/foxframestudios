import type { ComponentPropsWithRef } from "react";
import { controlStyles, type ControlSize } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  /** Defaults to `md`. */
  size?: ControlSize;
}

/**
 * A multi-line form control. Shares `Input`'s chrome so the two cannot drift apart.
 *
 * Resizing is off, so a field can't be dragged taller and push the layout around
 * it. The scroll rail is left showing instead, so the field still says it holds
 * more than it shows.
 */
export function Textarea({
  className,
  size = "md",
  "aria-invalid": ariaInvalid,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={ariaInvalid}
      className={controlStyles({
        size,
        className: cn("field-scroll resize-none", className),
      })}
      {...props}
    />
  );
}
