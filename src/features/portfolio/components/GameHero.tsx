import Image from "next/image";
import {
  PageHeader,
  type PageHeaderLevel,
} from "@/components/shared/PageHeader";
import { Rise } from "@/components/shared/Rise";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { GameDetail } from "../games";

export interface GameHeroProps {
  game: GameDetail;
  /** `h1` on the game's own page; lower where it's a featured block on another page. */
  as?: PageHeaderLevel;
  /** The second button beside "Play", e.g. "View gallery" or "View project". */
  secondaryAction: { label: string; href: string };
  /** Mark the screenshot as the page's LCP image. Only where it's above the fold. */
  priority?: boolean;
  className?: string;
}

/**
 * A game's banner: its art fills the band, blurred and darkened, with the title,
 * summary, a "Play" button, a second action and the tags over it, beside a sharp
 * screenshot. On phones and tablets the screenshot leads, above the title.
 *
 * Blurred rather than stretched sharp because the source art is 768px wide, which
 * would turn soft across the full width. Used for the game's own page header and
 * as the featured block on the portfolio page, so both look the same.
 */
export function GameHero({
  game,
  as = "h1",
  secondaryAction,
  priority = false,
  className,
}: GameHeroProps) {
  const [hero] = game.images;

  return (
    <section aria-label={game.title} className={cn("game-hero", className)}>
      {hero ? (
        <Image
          src={hero.src}
          alt=""
          fill
          // Blurred to nothing, so a small file does: no need to fetch it large.
          sizes="640px"
          className="game-hero-backdrop object-cover"
        />
      ) : null}
      <span aria-hidden className="game-hero-shade" />

      <div className="game-hero-grid">
        <Rise
          trigger={priority ? "mount" : "in-view"}
          className="game-hero-text"
        >
          <PageHeader
            as={as}
            eyebrow={`Full Game · ${game.platform}`}
            title={game.title}
            description={game.summary}
            actions={
              <div className="flex flex-wrap gap-3">
                {/* A plain anchor: it leaves the site (§10.4). */}
                <a
                  href={game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({
                    variant: "glow",
                    size: "lg",
                    className: "gap-3 font-bold tracking-widest uppercase",
                  })}
                >
                  Play on {game.platform}
                  <Icon name="chevronRight" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={secondaryAction.href}
                  className={buttonStyles({ variant: "outline", size: "lg" })}
                >
                  {secondaryAction.label}
                </a>
              </div>
            }
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        </Rise>

        {hero ? (
          // First on phones and tablets (above the title), beside it from `lg`.
          <Rise
            trigger={priority ? "mount" : "in-view"}
            delay={120}
            className="game-hero-media"
          >
            <div className="game-hero-shot">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority={priority}
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Rise>
        ) : null}
      </div>
    </section>
  );
}
