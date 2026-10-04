import { Badge } from "@/components/ui/Badge";
import { HudTile } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  /** Position label in the top-left corner, e.g. "01". */
  index: string;
  title: string;
  /** The service's mark, shown in a glowing tile under the title. */
  icon: IconName;
  /** One or two short lines on what the service delivers. */
  description: string;
  /** Short chips along the bottom, e.g. HUDs / Menus / Kits. Also the list keys. */
  tags: readonly string[];
  className?: string;
}

/**
 * A single service: a cyan-edged glass card with its number, title, icon tile,
 * description and tags.
 *
 * It's deliberately its own shell, not a `HudPanel` variant: a design change to the
 * hero's readouts shouldn't drag the services grid along with it (§6.0). The two
 * share a visual language through the same tokens and the same `HudTile`.
 *
 * Hovering anywhere on the card (its `hover-reveal-scope`) lifts the card, brightens
 * its edge, lights the icon tile, and extends the line beside the number.
 */
export function ServiceCard({
  index,
  title,
  icon,
  description,
  tags,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "service-card hover-reveal-scope flex h-full flex-col items-center px-8 pt-7 pb-9",
        className,
      )}
    >
      <span className="text-accent-primary flex items-center gap-3 self-start text-xs font-medium tracking-wider">
        {index}
        <span aria-hidden className="service-card-index-rule" />
      </span>

      <h3 className="text-text-primary mt-6 text-center text-xl font-extrabold tracking-tight text-balance uppercase sm:text-2xl">
        {title}
      </h3>

      <div aria-hidden className="mt-7 w-2/5">
        <HudTile tone="cool" selected>
          <Icon name={icon} />
        </HudTile>
      </div>

      <p className="text-text-secondary mt-8 text-center text-sm leading-relaxed text-balance">
        {description}
      </p>

      <ul className="service-card-tags mt-auto pt-8">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge size="fit">{tag}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
