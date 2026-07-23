import { cn } from "@/lib/utils";

type GradientLayerProps = {
  className?: string;
};

export function GradientLayer({ className }: GradientLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "z-background pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-background-primary",
        className,
      )}
    />
  );
}
