import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  HudTile,
  hudTileGrowFrom,
  hudTileStagger,
  type HudTileTone,
} from "@/components/ui/HudTile";

export interface StyleSample {
  /** Stable identity for the list key. */
  id: string;
  /** The tile's tint: its border, glow and backdrop, and the icon's colour. */
  tone: HudTileTone;
  /** Optional mark in the tile, e.g. a tool's logo. Leave it out for a plain swatch. */
  icon?: IconName;
}

export interface StyleReadoutProps {
  /** e.g. "Styles". Displayed uppercase. */
  title: string;
  /** Shown as a row of square tiles; three in the reference design. */
  samples: readonly StyleSample[];
  /**
   * One line describing the style, under the tiles. Displayed uppercase. Keep it to
   * a short sentence: it may wrap onto a second line, but is cut off after that.
   */
  caption: string;
}

/**
 * A visual style at a glance: a row of tinted sample tiles and a one-line caption
 * describing the style.
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.style-readout` in the utilities
 * stylesheet). The tiles rest dim and light up in sequence while the pointer is over
 * the readout, and each one grows while the pointer is over that tile.
 */
export function StyleReadout({ title, samples, caption }: StyleReadoutProps) {
  const count = samples.length;

  return (
    <div className="style-readout hover-reveal-scope size-full">
      <div className="style-readout-body flex size-full flex-col">
        <p className="style-readout-title text-text-primary font-bold uppercase">
          {title}
        </p>

        {/* Decorative swatches with no content of their own, so they're hidden from
            assistive technology. The caption says what they stand for. */}
        <div
          aria-hidden
          className="style-readout-tiles"
          style={{ "--tile-count": count } as CSSProperties}
        >
          <ul>
            {samples.map((sample, position) => (
              <HudTile
                key={sample.id}
                as="li"
                tone={sample.tone}
                growFrom={hudTileGrowFrom(position, count)}
                {...hudTileStagger(position, count)}
              >
                {sample.icon ? <Icon name={sample.icon} /> : null}
              </HudTile>
            ))}
          </ul>
        </div>

        <p className="style-readout-caption text-text-secondary uppercase">
          {caption}
        </p>
      </div>
    </div>
  );
}
