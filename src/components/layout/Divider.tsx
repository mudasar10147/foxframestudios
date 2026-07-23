import { cn } from "@/lib/utils";

type Orientation = "horizontal" | "vertical";

type DividerProps = {
  orientation?: Orientation;
  className?: string;
};

export function Divider({ orientation = "horizontal", className }: DividerProps) {
  return (
    <hr
      aria-orientation={orientation}
      className={cn(
        "border-0 bg-border-default",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
