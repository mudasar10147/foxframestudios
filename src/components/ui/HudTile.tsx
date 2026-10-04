import type { CSSProperties, ReactNode } from "react";
import { staggerDelays, type StaggerDelays } from "@/lib/stagger";
import { cn } from "@/lib/utils";

const toneStyles = {
  neutral: "hud-tile-tone-neutral",
  cool: "hud-tile-tone-cool",
  warm: "hud-tile-tone-warm",
  dim: "hud-tile-tone-dim",
} as const;

export type HudTileTone = keyof typeof toneStyles;

const growStyles = {
  /** First in its row: grows rightwards, so it can't spill past the left edge. */
  start: "hud-tile-grow-start",
  center: "",
  /** Last in its row: grows leftwards. */
  end: "hud-tile-grow-end",
} as const;

export type HudTileGrowFrom = keyof typeof growStyles;

/** Gap between one tile lighting up and the next, in either direction. */
const HUD_TILE_STAGGER_MS = 120;

/** Light-up delays for the tile at `step` of `steps` (see `staggerDelays`). */
export function hudTileStagger(step: number, steps: number): StaggerDelays {
  return staggerDelays(step, steps, HUD_TILE_STAGGER_MS);
}

/**
 * Where a tile sits in its row decides which way it grows. Grown from the centre,
 * an end tile would spill past the card's edge.
 */
export function hudTileGrowFrom(
  column: number,
  columns: number,
): HudTileGrowFrom {
  if (column === 0) return "start";
  if (column === columns - 1) return "end";
  return "center";
}

export interface HudTileProps {
  /** The tile's tint, and the colour of its content. Defaults to `dim`. */
  tone?: HudTileTone;
  /** Marks the current item in a set: a brighter edge and a stronger tint. */
  selected?: boolean;
  /** Which edge the tile grows from on hover. Defaults to `center`. */
  growFrom?: HudTileGrowFrom;
  /** ms after the readout is hovered before this tile lights up. */
  enterDelay?: number;
  /** ms after the pointer leaves before this tile dims. */
  exitDelay?: number;
  /** `li` when the tile is an item in a list. Defaults to `div`. */
  as?: "div" | "li";
  /** An icon, swatch or similar, sized from the tile. */
  children?: ReactNode;
}

/**
 * A tinted square for HUD readouts: a sample, an icon slot, a swatch. Sized by its
 * parent's grid and always square.
 *
 * It lights up when the pointer is over its nearest `hover-reveal-scope`, after its
 * `enterDelay`, so a row of tiles can light up in sequence. It also grows when
 * hovered directly. All the styling is in `.hud-tile` in the utilities stylesheet.
 */
export function HudTile({
  tone = "dim",
  selected = false,
  growFrom = "center",
  enterDelay = 0,
  exitDelay = 0,
  as: Tag = "div",
  children,
}: HudTileProps) {
  return (
    <Tag
      className={cn(
        "hud-tile",
        toneStyles[tone],
        growStyles[growFrom],
        selected && "hud-tile-selected",
      )}
      style={
        {
          "--tile-enter-delay": `${enterDelay}ms`,
          "--tile-exit-delay": `${exitDelay}ms`,
        } as CSSProperties
      }
    >
      {children ? <span className="hud-tile-content">{children}</span> : null}
    </Tag>
  );
}
