import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "transition-button inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-border-default bg-elevated-surface text-text-secondary",
        accent: "border-border-glow bg-glass-surface text-accent-primary",
        outline: "border-border-strong bg-transparent text-text-primary",
        success: "border-border-default bg-elevated-surface text-status-success",
        warning: "border-border-default bg-elevated-surface text-status-warning",
        error: "border-border-default bg-elevated-surface text-status-error",
        info: "border-border-default bg-elevated-surface text-status-info",
      },
      size: {
        sm: "text-caption px-2.5 py-0.5",
        md: "text-body-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: ReactNode;
    children: ReactNode;
  };

export function Badge({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon}
      {children}
    </span>
  );
}
