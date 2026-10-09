import type { Metadata } from "next";
import { StatCard } from "@/components/domain/StatCard";
import { Container } from "@/components/layout/Container";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { FilterLinks } from "@/components/shared/FilterLinks";
import { PageHeader } from "@/components/shared/PageHeader";
import { Rise } from "@/components/shared/Rise";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import {
  GAMES,
  GameHero,
  PORTFOLIO_CATEGORIES,
  PortfolioGrid,
  getPortfolioEntries,
  getTotalPlayerVisits,
} from "@/features/portfolio";
import { formatCompactNumber } from "@/lib/format";

const DESCRIPTION =
  "Full Roblox games, game UI and gameplay scripting — real projects, shipped and played.";

export const metadata: Metadata = {
  title: "Portfolio",
  description: DESCRIPTION,
};

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { category: rawCategory } = await searchParams;
  // Anything that isn't a known category, including a repeated param, shows all.
  const active = PORTFOLIO_CATEGORIES.find(
    (category) => category.id === rawCategory,
  );

  const entries = getPortfolioEntries();
  const shown = active
    ? entries.filter((entry) => entry.categoryId === active.id)
    : entries;
  const countIn = (id: string) =>
    entries.filter((entry) => entry.categoryId === id).length;
  const [spotlight] = GAMES;

  return (
    <Container className="py-14 lg:py-20">
      <Rise trigger="mount">
        <PageHeader title="Portfolio" description={DESCRIPTION} />
      </Rise>

      <Rise trigger="mount" delay={90}>
        <section aria-labelledby="stats-heading" className="mt-10">
          <h2 id="stats-heading" className="sr-only">
            At a glance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon="layers" label="Projects" value={entries.length} />
            <StatCard icon="gamepad" label="Live games" value={GAMES.length} />
            <StatCard
              icon="bolt"
              label="Player visits"
              value={`${formatCompactNumber(getTotalPlayerVisits())}+`}
            />
            <StatCard
              icon="settings"
              label="Disciplines"
              value={PORTFOLIO_CATEGORIES.length}
              hint={PORTFOLIO_CATEGORIES.map((c) => c.label).join(" · ")}
            />
          </div>
        </section>
      </Rise>

      {spotlight ? (
        <section className="mt-16 lg:mt-20">
          <Rise trigger="in-view">
            <SectionHeader eyebrow="Spotlight" title="Featured game" />
          </Rise>
          <GameHero
            game={spotlight}
            as="h3"
            secondaryAction={{
              label: "View project",
              href: `${ROUTES.portfolio}/${spotlight.slug}`,
            }}
            className="mt-8"
          />
        </section>
      ) : null}

      <section id="projects" className="mt-16 scroll-mt-24 lg:mt-20">
        <Rise trigger="in-view">
          <SectionHeader title="All projects" />
        </Rise>

        <div className="mt-8">
          <FilterLinks
            label="Filter projects"
            links={[
              {
                label: "All",
                href: `${ROUTES.portfolio}#projects`,
                count: entries.length,
                isActive: !active,
              },
              ...PORTFOLIO_CATEGORIES.map((category) => ({
                label: category.label,
                href: `${ROUTES.portfolio}?category=${category.id}#projects`,
                count: countIn(category.id),
                isActive: category.id === active?.id,
              })),
            ]}
          />
        </div>

        <div className="mt-8">
          {shown.length > 0 ? (
            <PortfolioGrid entries={shown} />
          ) : (
            <EmptyState
              icon={active?.icon ?? "layers"}
              title="Case studies coming soon"
              description={`We're writing up our ${active?.label ?? ""} work. In the meantime, tell us what you're building.`}
              action={
                <ButtonLink href={siteConfig.cta.href} variant="outline">
                  Discuss a {active?.label ?? ""} project
                </ButtonLink>
              }
            />
          )}
        </div>
      </section>

      <CtaBanner
        icon="gamepad"
        title="Have a project in mind?"
        description="Let's build something amazing together."
        action={{ href: siteConfig.cta.href, label: "Start a Project" }}
        className="mt-16 lg:mt-20"
      />
    </Container>
  );
}
