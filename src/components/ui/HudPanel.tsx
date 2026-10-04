import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  /**
   * The large backdrop the composition is arranged on. Keeps a quiet outline all
   * round and carries the bright accent only on its top-left corner.
   */
  stage:
    "hud-stage hud-corner-accent border-border-stage from-surface/60 to-surface/25 rounded-2xl",
  /**
   * Glass cards layered above the stage: mostly transparent so whatever sits behind
   * them shows through, heavily blurred so it reads as frosted rather than merely
   * see-through, and outlined in the bright accent so the edge still holds up.
   */
  float:
    "hud-float border-border-glass from-surface-elevated/30 to-surface/15 rounded-xl backdrop-blur-3xl",
} as const;

export type HudPanelVariant = keyof typeof variantStyles;

export interface HudPanelProps {
  variant?: HudPanelVariant;
  /**
   * Adds a hover lift and brighten. Only set this on panels the pointer can
   * actually reach and that mean something when highlighted.
   */
  interactive?: boolean;
  className?: string;
  /**
   * For values a class cannot carry — a generated `mask`, or a custom property the
   * surface computes. NOT the way to restyle a panel; that belongs in a variant.
   */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * A HUD surface: the shared shell behind every readout in the hero composition.
 *
 * Positioning is deliberately NOT part of this API — callers wrap it in a
 * positioned element — so the panel stays reusable anywhere a HUD surface is
 * wanted rather than being tied to one layout (§7.2).
 */
export function HudPanel({
  variant = "float",
  interactive = false,
  className,
  style,
  children,
}: HudPanelProps) {
  return (
    <div
      className={cn(
        // `relative` so the stage's corner-bracket pseudo-elements anchor to the panel.
        "relative border bg-gradient-to-b",
        variantStyles[variant],
        interactive && "hud-interactive",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
