import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ValidationMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: React.ReactNode;
};

export function ValidationMessage({
  className,
  children,
  ...props
}: ValidationMessageProps) {
  if (!children) {
    return null;
  }

  return (
    <p
      role="alert"
      className={cn("text-caption text-status-error", className)}
      {...props}
    >
      {children}
    </p>
  );
}
