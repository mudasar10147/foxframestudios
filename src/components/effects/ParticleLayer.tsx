import { cn } from "@/lib/utils";

type ParticleLayerProps = {
  className?: string;
};

/** Placeholder static particle field. A real particle system replaces this later. */
export function ParticleLayer({ className }: ParticleLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "particles-background z-background pointer-events-none absolute inset-0",
        className,
      )}
    />
  );
}
