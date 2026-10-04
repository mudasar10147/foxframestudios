import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  HudTile,
  hudTileGrowFrom,
  hudTileStagger,
  type HudTileTone,
} from "@/components/ui/HudTile";
import { cn } from "@/lib/utils";

const swatchFromStyles: Record<HudTileTone, string> = {
  neutral: "ui-kit-swatch-from-neutral",
  cool: "ui-kit-swatch-from-cool",
  warm: "ui-kit-swatch-from-warm",
  dim: "ui-kit-swatch-from-dim",
};

const swatchToStyles: Record<HudTileTone, string> = {
  neutral: "ui-kit-swatch-to-neutral",
  cool: "ui-kit-swatch-to-cool",
  warm: "ui-kit-swatch-to-warm",
  dim: "ui-kit-swatch-to-dim",
};

/** One cell of the kit. `id` is the list key, so it must be unique per readout. */
export type UiKitElement =
  | {
      kind: "icon";
      id: string;
      icon: IconName;
      /** The tile's tint, and the icon's colour. */
      tone: HudTileTone;
      selected?: boolean;
    }
  | { kind: "swatch"; id: string; from: HudTileTone; to: HudTileTone }
  | { kind: "empty"; id: string };

export interface UiKitReadoutProps {
  /** e.g. "UI Elements". Displayed uppercase. */
  title: string;
  /** Laid out left to right, top to bottom. */
  elements: readonly UiKitElement[];
  /** Tiles per row. Defaults to 4, as in the reference design. */
  columns?: number;
}

const DEFAULT_COLUMNS = 4;

/**
 * A UI kit at a glance: a title over a grid of element tiles (icons, colour swatches
 * and empty slots).
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.ui-kit-readout` in the utilities
 * stylesheet). When the pointer is over the readout, the tiles light up in a
 * diagonal wave from the top-left; each tile also grows while the pointer is over it.
 */
export function UiKitReadout({
  title,
  elements,
  columns = DEFAULT_COLUMNS,
}: UiKitReadoutProps) {
  const rows = Math.ceil(elements.length / columns);
  // The wave runs along diagonals, so tiles on the same diagonal light together.
  const waveSteps = columns + rows - 1;

  return (
    <div className="ui-kit-readout hover-reveal-scope size-full">
      <div className="ui-kit-readout-body flex size-full flex-col">
        <p className="ui-kit-readout-title text-text-primary font-semibold uppercase">
          {title}
        </p>

        {/* Samples of a visual kit, with nothing to read or operate, so they're
            hidden from assistive technology. The title says what they are. */}
        <div
          aria-hidden
          className="ui-kit-readout-grid"
          style={
            { "--grid-cols": columns, "--grid-rows": rows } as CSSProperties
          }
        >
          <ul>
            {elements.map((element, position) => {
              const column = position % columns;
              const row = Math.floor(position / columns);
              const placement = {
                as: "li" as const,
                growFrom: hudTileGrowFrom(column, columns),
                ...hudTileStagger(column + row, waveSteps),
              };

              switch (element.kind) {
                case "icon":
                  return (
                    <HudTile
                      key={element.id}
                      tone={element.tone}
                      selected={element.selected}
                      {...placement}
                    >
                      <Icon name={element.icon} />
                    </HudTile>
                  );
                case "swatch":
                  return (
                    <HudTile
                      key={element.id}
                      tone={element.from}
                      {...placement}
                    >
                      <span
                        className={cn(
                          "ui-kit-swatch",
                          swatchFromStyles[element.from],
                          swatchToStyles[element.to],
                        )}
                      />
                    </HudTile>
                  );
                case "empty":
                  return <HudTile key={element.id} {...placement} />;
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
