import type { ReactNode } from "react";
import { Rise } from "@/components/shared/Rise";
import { HudTile, hudTileStagger } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface ContactDetail {
  /** Stable key (§16). */
  id: string;
  icon: IconName;
  title: string;
  /** Plain text, or a link such as a `mailto:`. */
  body: ReactNode;
}

export interface ContactDetailsProps {
  /** Small accent label above the heading, e.g. "Work Together". */
  eyebrow: string;
  heading: string;
  details: readonly ContactDetail[];
  className?: string;
}

/** Gap between one detail rising in and the next. */
const DETAIL_STAGGER_MS = 90;
/** The first detail waits for the card itself to rise. */
const FIRST_DETAIL_DELAY_MS = 180;

/**
 * The contact section's details card: a short pitch, then a list of what to expect,
 * each with an icon tile.
 *
 * Shares the `glass-card` shell with the form, since they're the two halves of
 * one section. The details rise in one after another as the card scrolls into view,
 * and the icon tiles are `HudTile`s, so they light up in sequence while the card is
 * hovered.
 */
export function ContactDetails({
  eyebrow,
  heading,
  details,
  className,
}: ContactDetailsProps) {
  return (
    <div
      className={cn("glass-card hover-reveal-scope p-6 sm:p-10", className)}
    >
      <p className="text-accent-primary text-xs font-semibold tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <h3 className="text-text-primary mt-3 text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
        {heading}
      </h3>

      <ul className="mt-8 flex flex-col gap-6">
        {details.map((detail, position) => (
          <li key={detail.id}>
            <Rise
              trigger="in-view"
              delay={FIRST_DETAIL_DELAY_MS + position * DETAIL_STAGGER_MS}
              className="flex items-start gap-5"
            >
              <div aria-hidden className="w-16 shrink-0">
                <HudTile
                  tone="cool"
                  {...hudTileStagger(position, details.length)}
                >
                  <Icon name={detail.icon} />
                </HudTile>
              </div>
              <div className="min-w-0 pt-1">
                <p className="text-text-primary font-semibold">
                  {detail.title}
                </p>
                <div className="text-text-secondary mt-1 text-sm leading-relaxed">
                  {detail.body}
                </div>
              </div>
            </Rise>
          </li>
        ))}
      </ul>
    </div>
  );
}
