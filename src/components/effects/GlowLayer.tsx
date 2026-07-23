import { cn } from "@/lib/utils";

type GlowLayerProps = {
  className?: string;
};

export function GlowLayer({ className }: GlowLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glow-background z-background pointer-events-none absolute inset-0",
        className,
      )}
    />
  );
}
