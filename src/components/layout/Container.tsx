import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof sizeStyles;

export interface ContainerProps {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}

/** Owns the page gutter so individual sections never re-specify horizontal padding. */
export function Container({
  as: Component = "div",
  size = "lg",
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
