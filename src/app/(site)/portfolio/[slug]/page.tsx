import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatCard } from "@/components/domain/StatCard";
import { Container } from "@/components/layout/Container";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ImageGallery } from "@/components/shared/ImageGallery";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { GAMES, GameHero, getGame } from "@/features/portfolio";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

/** Every game's page is built ahead of time; any other slug is a 404. */
export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const game = getGame((await params).slug);
  return game ? { title: game.title, description: game.summary } : {};
}

/** An icon per headline stat, by position: visits, favourites, players, genre. */
const STAT_ICONS: readonly IconName[] = ["bolt", "star", "gamepad", "layers"];

export default async function GamePage({ params }: GamePageProps) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  return (
    <Container className="py-14 lg:py-20">
      <Link
        href={ROUTES.portfolio}
        className="text-text-secondary hover:text-accent-primary focus-visible:ring-accent-primary inline-flex items-center gap-2 rounded text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <Icon name="chevronLeft" />
        Back to portfolio
      </Link>

      <GameHero
        game={game}
        secondaryAction={{ label: "View gallery", href: "#gallery" }}
        // The page's LCP image, above the fold on every screen.
        priority
        className="mt-6"
      />

      <section aria-labelledby="stats-heading" className="mt-16">
        <h2 id="stats-heading" className="sr-only">
          At a glance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {game.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={STAT_ICONS[index] ?? "layers"}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
        <p className="text-text-muted mt-3 text-xs">
          Stats as of {game.statsAsOf}.
        </p>
      </section>

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section
          aria-labelledby="about-heading"
          className="glass-card p-6 sm:p-8"
        >
          <h2
            id="about-heading"
            className="text-text-primary text-xl font-bold uppercase"
          >
            About the game
          </h2>
          <div className="text-text-secondary mt-4 flex flex-col gap-4 leading-relaxed">
            {game.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="text-text-primary mt-8 text-sm font-bold tracking-[0.15em] uppercase">
            How to play
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {game.howToPlay.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span aria-hidden className="text-accent-primary mt-0.5 flex">
                  <Icon name="check" />
                </span>
                <span className="text-text-secondary">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="details-heading"
          className="glass-card p-6 sm:p-8"
        >
          <h2
            id="details-heading"
            className="text-text-primary text-xl font-bold uppercase"
          >
            Details
          </h2>
          <dl className="divide-border-default mt-4 divide-y">
            {game.details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-text-muted text-sm">{detail.label}</dt>
                <dd className="text-text-primary text-right text-sm font-medium">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section id="gallery" aria-label="Gallery" className="mt-16 scroll-mt-24">
        <SectionHeader
          title="Gallery"
          description="Tap any image to view it full screen."
        />
        <div className="mt-8">
          <ImageGallery items={game.images} />
        </div>
      </section>

      <CtaBanner
        icon="gamepad"
        title="Want a game like this?"
        description="Let's build something amazing together."
        action={{ href: siteConfig.cta.href, label: "Start a Project" }}
        className="mt-16"
      />
    </Container>
  );
}
