import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
};

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid-background z-background pointer-events-none absolute inset-0",
        className,
      )}
    />
  );
}
