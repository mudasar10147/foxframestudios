import Image from "next/image";
import type { CSSProperties } from "react";
import { staggerDelays } from "@/lib/stagger";
import { cn } from "@/lib/utils";

/**
 * Each kind has a fixed place in the arrangement (see `.device-readout-*` in the
 * utilities stylesheet), so a kind appears at most once per readout.
 */
const kindStyles = {
  desktop: "device-readout-desktop",
  tablet: "device-readout-tablet",
  mobile: "device-readout-mobile",
} as const;

export type DeviceKind = keyof typeof kindStyles;

/** Gap between one device coming forward and the next, in either direction. */
const DEVICE_STAGGER_MS = 110;

export interface DeviceShot {
  kind: DeviceKind;
  /** A render of the device, cropped to the device, on transparency. */
  src: string;
  alt: string;
}

export interface DeviceReadoutProps {
  /** e.g. "Responsive Design". Displayed uppercase, top right. */
  title: string;
  /**
   * Drawn back to front. Desktop, then tablet, then mobile reads best: each one
   * overlaps the one behind it.
   */
  devices: readonly DeviceShot[];
}

/**
 * One design across screen sizes: device renders arranged in an overlapping group,
 * under a title.
 *
 * Like the other readouts, it brings no surface of its own; it fills the box it's
 * given and sizes itself from that box. The arrangement keeps a fixed 4:3 shape and
 * scales as one piece, so the devices never drift apart. While the pointer is over
 * the readout, the devices come forward one after another and the title lights up.
 * Hovering a single device lifts it and turns the title cyan.
 */
export function DeviceReadout({ title, devices }: DeviceReadoutProps) {
  const count = devices.length;

  return (
    <div className="device-readout hover-reveal-scope size-full">
      <div className="device-readout-body size-full">
        <div className="device-readout-stage-area">
          <div className="device-readout-stage">
            {devices.map((device, position) => {
              const { enterDelay, exitDelay } = staggerDelays(
                position,
                count,
                DEVICE_STAGGER_MS,
              );

              return (
                <div
                  key={device.kind}
                  className={cn(
                    "device-readout-device",
                    kindStyles[device.kind],
                  )}
                  style={
                    {
                      "--device-enter-delay": `${enterDelay}ms`,
                      "--device-exit-delay": `${exitDelay}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="device-readout-shot">
                    <Image
                      src={device.src}
                      alt={device.alt}
                      fill
                      // The desktop, the largest, takes about 70% of a card that is at
                      // most a fifth of the viewport wide on a desktop. Leaving `sizes`
                      // out would ship the full render to every card (§9.1).
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="device-readout-legend">
          <span aria-hidden className="device-readout-rule bg-accent-primary" />
          <p className="device-readout-title uppercase">{title}</p>
        </div>
      </div>
    </div>
  );
}
