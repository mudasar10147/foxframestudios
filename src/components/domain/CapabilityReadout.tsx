import { Icon, type IconName } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";

export interface CapabilityFeature {
  icon: IconName;
  /** Also the list key, so labels must be unique within one readout. */
  label: string;
}

export interface CapabilityReadoutProps {
  /** The discipline, e.g. "3D Modeling". Displayed uppercase. */
  title: string;
  /** How full the bar is, 0–100. */
  level: number;
  features: readonly CapabilityFeature[];
}

/**
 * One studio discipline at a glance: its name, a level bar, and the points that
 * define it.
 *
 * Brings no surface of its own; it fills whatever it's placed in, such as a HUD card,
 * a panel or a grid cell, and sizes itself from that box (see `.capability-readout`
 * in the utilities stylesheet). The only thing it needs from its parent is a definite
 * width AND height.
 *
 * The level bar starts empty, fills while the pointer is over the readout, and drains
 * when it leaves. On touch screens it shows its value straight away.
 */
export function CapabilityReadout({
  title,
  level,
  features,
}: CapabilityReadoutProps) {
  return (
    <div className="capability-readout hover-reveal-scope size-full">
      <div className="capability-readout-body flex size-full flex-col">
        <p className="capability-readout-title text-text-primary font-medium uppercase">
          {title}
        </p>

        <ProgressBar
          value={level}
          label={`${title} level`}
          reveal="hover"
          className="capability-readout-bar"
        />

        <ul className="capability-readout-list">
          {features.map((feature) => (
            <li key={feature.label} className="flex items-center">
              <span className="capability-readout-icon text-accent-primary">
                <Icon name={feature.icon} />
              </span>
              <span className="capability-readout-label text-text-secondary min-w-0">
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
