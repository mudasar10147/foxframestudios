import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const cardVariants = cva("transition-card rounded-lg border", {
  variants: {
    variant: {
      surface: "border-border-default bg-surface",
      glass:
        "border-border-glass bg-glass-surface backdrop-blur-[var(--blur-card)]",
      elevated: "border-border-default bg-elevated-surface shadow-card",
    },
    padded: {
      true: "p-6",
    },
    hoverable: {
      true: "hover:-translate-y-1 hover:border-border-strong hover:shadow-floating",
    },
    glow: {
      true: "hover:border-border-glow hover:shadow-purple-glow",
    },
  },
  defaultVariants: {
    variant: "surface",
    padded: true,
  },
});

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    as?: ElementType;
    children: ReactNode;
  };

export function Card({
  as: Tag = "div",
  variant,
  padded,
  hoverable,
  glow,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        cardVariants({ variant, padded, hoverable, glow }),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
