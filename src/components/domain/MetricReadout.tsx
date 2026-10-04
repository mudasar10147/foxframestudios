import { RingGauge } from "@/components/ui/RingGauge";
import { cn } from "@/lib/utils";

export interface MetricReadoutProps<Tier extends string = string> {
  /** What is being measured, e.g. "Polygons". Displayed uppercase. */
  title: string;
  /** The reading shown in the middle of the gauge, e.g. "24K". */
  value: string;
  /** How full the gauge is, 0–100. */
  level: number;
  /** The rating scale, top to bottom, e.g. Low / Med / High. Also the list keys. */
  tiers: readonly Tier[];
  /** Which tier this reading falls in. Must be one of `tiers`. */
  activeTier: Tier;
}

const tierStyles = {
  active: {
    swatch: "metric-readout-swatch-active bg-accent-primary",
    label: "text-accent-primary",
  },
  idle: {
    swatch: "border-border-glass bg-surface-elevated border",
    label: "text-text-muted",
  },
} as const;

/**
 * A single measurement: a title, a ring gauge with the reading in its centre, and the
 * tier the reading falls in.
 *
 * Like `CapabilityReadout`, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.metric-readout` in the utilities
 * stylesheet). In a narrow box the tiers drop out so the gauge keeps its size. The
 * gauge starts empty, fills while the pointer is over the readout, and drains when it
 * leaves.
 */
export function MetricReadout<Tier extends string>({
  title,
  value,
  level,
  tiers,
  activeTier,
}: MetricReadoutProps<Tier>) {
  return (
    <div className="metric-readout hover-reveal-scope size-full">
      <div className="metric-readout-body flex size-full flex-col">
        <p className="metric-readout-title text-text-secondary font-medium uppercase">
          {title}
        </p>

        <div className="metric-readout-main">
          <RingGauge
            value={level}
            label={title}
            valueText={`${value}, ${activeTier}`}
            reveal="hover"
            className="metric-readout-dial"
          >
            <span className="text-text-primary font-medium">{value}</span>
          </RingGauge>

          <ul aria-label={`${title} tier`} className="metric-readout-tiers">
            {tiers.map((tier) => {
              const isActive = tier === activeTier;
              const styles = isActive ? tierStyles.active : tierStyles.idle;

              return (
                <li
                  key={tier}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-center"
                >
                  <span
                    aria-hidden
                    className={cn("metric-readout-swatch", styles.swatch)}
                  />
                  <span className={cn("uppercase", styles.label)}>{tier}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
