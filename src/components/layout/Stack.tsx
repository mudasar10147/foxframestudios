import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type Direction = "row" | "col";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

const gapMap: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

const directionMap: Record<Direction, string> = {
  row: "flex-row",
  col: "flex-col",
};

const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

type StackProps = {
  as?: ElementType;
  direction?: Direction;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  className?: string;
  children: ReactNode;
};

export function Stack({
  as: Tag = "div",
  direction = "col",
  gap = 4,
  align,
  justify,
  className,
  children,
}: StackProps) {
  return (
    <Tag
      className={cn(
        "flex",
        directionMap[direction],
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
