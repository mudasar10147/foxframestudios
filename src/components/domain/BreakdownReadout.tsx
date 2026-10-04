import { RingGauge } from "@/components/ui/RingGauge";
import type { Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

const swatchStyles: Record<Tone, string> = {
  neutral: "bg-tone-neutral",
  cool: "bg-tone-cool",
  strong: "bg-tone-strong",
  deep: "bg-tone-deep",
  warm: "bg-tone-warm",
  dim: "bg-tone-dim",
};

export interface BreakdownItem {
  /** Also the list key, so labels must be unique within one readout. */
  label: string;
  count: number;
  /** The item's colour, in the ring and in the legend. */
  tone: Tone;
}

export interface BreakdownReadoutProps {
  /** What is being broken down, e.g. "UI Elements". Displayed uppercase. */
  title: string;
  /** In ring order, clockwise from 12 o'clock. */
  items: readonly BreakdownItem[];
  /**
   * The count a full ring stands for. The items' total fills that share of the ring,
   * and the rest shows as track.
   */
  capacity: number;
}

/**
 * A total and what it's made of: a ring of coloured segments, one per item, with the
 * total in the middle and a legend beside it.
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.breakdown-readout` in the utilities
 * stylesheet). The ring starts empty and sweeps round through its segments while
 * the pointer is over the readout.
 */
export function BreakdownReadout({
  title,
  items,
  capacity,
}: BreakdownReadoutProps) {
  // Derived, never stored: the centre figure is always the sum of the items.
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const segments = items.map((item) => ({
    share: (item.count / capacity) * 100,
    tone: item.tone,
  }));

  return (
    <div className="breakdown-readout hover-reveal-scope size-full">
      <div className="breakdown-readout-body flex size-full items-center">
        <RingGauge
          segments={segments}
          label={title}
          valueText={`${total} in total`}
          reveal="hover"
          continuous
          className="breakdown-readout-dial"
        >
          <span className="text-text-primary font-medium">{total}</span>
        </RingGauge>

        <div className="breakdown-readout-legend">
          <p className="breakdown-readout-title text-text-primary font-semibold uppercase">
            {title}
          </p>
          <ul className="breakdown-readout-items">
            {items.map((item) => (
              <li key={item.label} className="flex items-center">
                <span
                  aria-hidden
                  className={cn(
                    "breakdown-readout-swatch",
                    swatchStyles[item.tone],
                  )}
                />
                <span className="text-text-secondary">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
