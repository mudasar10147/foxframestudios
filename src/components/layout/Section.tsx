import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  as?: ElementType;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  as: Tag = "section",
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn("section", className)}>
      {children}
    </Tag>
  );
}
