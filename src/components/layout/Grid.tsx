import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Cols = 1 | 2 | 3 | 4;
type Gap = 4 | 6 | 8 | 12;

const colsMap: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapMap: Record<Gap, string> = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  12: "gap-12",
};

type GridProps = {
  cols?: Cols;
  gap?: Gap;
  className?: string;
  children: ReactNode;
};

export function Grid({ cols = 3, gap = 6, className, children }: GridProps) {
  return (
    <div className={cn("grid", colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}
