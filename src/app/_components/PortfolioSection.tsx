import { Container } from "@/components/layout/Container";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Rise } from "@/components/shared/Rise";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { PORTFOLIO_CATEGORIES, PortfolioExplorer } from "@/features/portfolio";

export function PortfolioSection() {
  return (
    // `overflow-x-clip`: the carousel's side cards run past the container's edges
    // by design, and this keeps them from widening the page. `clip`, not `hidden`,
    // so the section doesn't become a scroll container.
    <section id="portfolio" className="relative overflow-x-clip py-20 lg:py-28">
      <Container>
        <Rise trigger="in-view">
          <SectionHeader title="Portfolio" align="center" />
        </Rise>

        {/* Only the tabs and the carousel are a client component — the heading
            and the banner stay on the server (§10.1). */}
        <Rise trigger="in-view" delay={90} className="mt-10 lg:mt-12">
          {/* UI/UX is the studio's lead service, so it's the tab that opens. */}
          <PortfolioExplorer
            categories={PORTFOLIO_CATEGORIES}
            defaultId="ui-ux"
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href={ROUTES.portfolio} variant="outline" size="lg">
              View full portfolio
              <Icon name="chevronRight" />
            </ButtonLink>
          </div>
        </Rise>

        <Rise trigger="in-view" delay={180} className="mt-16 lg:mt-20">
          <CtaBanner
            icon="gamepad"
            title="Have a project in mind?"
            description="Let's build something amazing together."
            action={{ href: siteConfig.cta.href, label: "Get in Touch" }}
          />
        </Rise>
      </Container>
    </section>
  );
}
