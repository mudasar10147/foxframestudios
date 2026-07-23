import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "wide" | "section" | "content" | "reading";

const sizeMap: Record<ContainerSize, string> = {
  wide: "container-wide",
  section: "section-container",
  content: "content-container",
  reading: "reading-container",
};

type ContainerProps = {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  size = "section",
  className,
  children,
}: ContainerProps) {
  return <Tag className={cn(sizeMap[size], className)}>{children}</Tag>;
}
