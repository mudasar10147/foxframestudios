import { ButtonLink } from "@/components/ui/ButtonLink";
import { HudTile } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface CtaBannerProps {
  icon: IconName;
  title: string;
  description: string;
  action: { href: string; label: string };
  className?: string;
}

/**
 * A closing call to action: an icon tile, a short line or two, and one glowing
 * button, framed by circuit lines running out to either side.
 *
 * Hovering anywhere on it lights the icon tile, and the button's arrow nudges
 * forward.
 */
export function CtaBanner({
  icon,
  title,
  description,
  action,
  className,
}: CtaBannerProps) {
  return (
    <div className={cn("cta-banner hover-reveal-scope", className)}>
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div aria-hidden className="w-16 shrink-0">
          <HudTile tone="cool" selected>
            <Icon name={icon} />
          </HudTile>
        </div>

        <div>
          <p className="text-text-primary text-xl font-bold">{title}</p>
          <p className="text-text-secondary mt-1 text-sm">{description}</p>
        </div>

        <ButtonLink
          href={action.href}
          variant="glow"
          size="lg"
          className="cta-banner-action gap-3 font-bold tracking-widest uppercase sm:ml-6"
        >
          {action.label}
          <span aria-hidden className="cta-banner-arrow">
            <Icon name="chevronRight" />
          </span>
        </ButtonLink>
      </div>
    </div>
  );
}
