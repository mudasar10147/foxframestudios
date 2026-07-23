import { cn } from "@/lib/utils";
import { GlowLayer } from "./GlowLayer";
import { GridBackground } from "./GridBackground";
import { NoiseLayer } from "./NoiseLayer";
import { GradientLayer } from "./GradientLayer";

type SectionBackgroundProps = {
  glow?: boolean;
  grid?: boolean;
  noise?: boolean;
  gradient?: boolean;
  className?: string;
};

/** Composes ambient background layers behind a positioned (relative) ancestor. */
export function SectionBackground({
  glow = true,
  grid = false,
  noise = false,
  gradient = false,
  className,
}: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "z-background pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {glow ? <GlowLayer /> : null}
      {grid ? <GridBackground /> : null}
      {noise ? <NoiseLayer /> : null}
      {gradient ? <GradientLayer /> : null}
    </div>
  );
}
