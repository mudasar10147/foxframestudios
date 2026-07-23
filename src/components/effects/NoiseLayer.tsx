import { cn } from "@/lib/utils";

type NoiseLayerProps = {
  className?: string;
};

export function NoiseLayer({ className }: NoiseLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "noise-background z-background pointer-events-none absolute inset-0",
        className,
      )}
    />
  );
}
