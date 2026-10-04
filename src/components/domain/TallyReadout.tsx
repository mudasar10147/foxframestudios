import { RingGauge } from "@/components/ui/RingGauge";
import { StackMeter } from "@/components/ui/StackMeter";
import type { Tone } from "@/lib/tones";

export interface TallyGroup {
  /** e.g. "Client". Also the list key, so labels must be unique within a readout. */
  label: string;
  /** How much of the ring this group takes, as a percentage of the full circle. */
  share: number;
  /** How full this group's meter is, 0–100. */
  level: number;
  /** The group's colour: its ring segment, and the base of its meter. */
  tone: Tone;
}

export interface TallyReadoutProps {
  /** What is being counted, e.g. "Scripts". Displayed uppercase. */
  title: string;
  /** The headline figure in the middle of the ring, e.g. "250+". */
  value: string;
  /**
   * The groups the count splits into. Each is a segment of the ring (clockwise from
   * 12 o'clock) and a meter beside it (left to right), in the same colour.
   */
  groups: readonly TallyGroup[];
}

/**
 * A headline count and how it splits: a ring of coloured segments with the figure in
 * the middle, and one stacked meter per group.
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box (see `.tally-readout` in the utilities
 * stylesheet). While the pointer is over it, the ring sweeps round and the meters
 * light from the bottom up.
 */
export function TallyReadout({ title, value, groups }: TallyReadoutProps) {
  return (
    <div className="tally-readout hover-reveal-scope size-full">
      <div className="tally-readout-body flex size-full">
        <RingGauge
          segments={groups.map((group) => ({
            share: group.share,
            tone: group.tone,
          }))}
          label={title}
          valueText={value}
          reveal="hover"
          continuous
          className="tally-readout-dial"
        >
          <span className="text-text-primary font-semibold">{value}</span>
        </RingGauge>

        <div className="tally-readout-aside">
          <p className="tally-readout-title text-text-primary font-medium uppercase">
            {title}
          </p>
          <div className="tally-readout-meters">
            {groups.map((group) => (
              <StackMeter
                key={group.label}
                value={group.level}
                label={`${group.label} ${title}`}
                from={group.tone}
                reveal="hover"
                className="tally-readout-meter"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
