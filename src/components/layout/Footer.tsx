import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { NavLink } from "@/components/ui/NavLink";
import { StatusPill } from "@/components/ui/StatusPill";
import { navItems, siteConfig } from "@/constants/site";

/**
 * The label a footer column opens with. Named rather than repeated three times,
 * and small caps rather than a heading size — these are `<h2>`s for the structure
 * they give, not for the weight a section title carries (§15).
 */
const COLUMN_HEADING =
  "text-text-primary text-xs font-semibold tracking-[0.2em] uppercase";

/**
 * The band the page closes on.
 *
 * Built from the chrome the HEADER already wears — `panel-surface` for the fill and
 * `panel-rim` for the specular top edge and the accent bloom behind it — rather than
 * from a new treatment of its own. That is what makes the two read as a pair holding
 * the page between them, and it means retuning the bar retunes this with it (§6.0).
 *
 * What it does NOT borrow is the bar's chamfer. That silhouette leans by a fixed
 * `--chamfer` over whatever height it is given: unmistakable across a 64px bar, and
 * all but vertical across a footer five times as tall. Full bleed instead, so the
 * band reads as the floor the page stands on rather than a third floating panel.
 *
 * A Server Component, and everything interactive in it is a leaf that opts in on
 * its own (§10.1).
 */
export function Footer() {
  /*
   * Read on the server, which is what makes it safe: there is no client render of
   * this for it to disagree with (§10.5). On a static route it is fixed at build
   * time, so a deploy that outlives a new year shows the old one until the next one
   * — true of every static copyright line, and not worth a client component.
   */
  const year = new Date().getFullYear();

  return (
    <footer className="panel-surface panel-rim border-border-section relative mt-24 overflow-hidden border-t lg:mt-32">
      {/*
       * `overflow-hidden` above is load-bearing for this and for the rim's bloom:
       * both reach past the band, and in the header it is the clip-path that holds
       * them in.
       */}
      <div
        aria-hidden
        className="texture-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col items-start gap-5">
            <Logo />
            <p className="text-text-secondary max-w-sm text-sm text-pretty">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>Navigate</h2>

            {/*
             * The same `navItems` the header reads, so a route added to one appears
             * in both and the two can never drift (§14). `NavLink` comes with it:
             * a footer link and a header link answer the same question — where does
             * this go, and is it where we already are (§6.0).
             */}
            <nav aria-label="Footer" className="mt-1">
              <ul className="flex flex-col items-start">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h2 className={COLUMN_HEADING}>Start a project</h2>
            <StatusPill pulse>{siteConfig.availability}</StatusPill>
            <ButtonLink href={siteConfig.cta.href} variant="outline" size="sm">
              {siteConfig.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="border-border-default mt-12 flex flex-col-reverse items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-muted text-xs">
            © {year} {siteConfig.name}. All rights reserved by{" "}
            {siteConfig.rightsHolder}.
          </p>

          {/*
           * A plain anchor, not `next/link`: this goes nowhere, it moves down the
           * page we are already on. `html` carries `scroll-behavior: smooth`, and
           * the reduced-motion block turns that off, so the jump respects the
           * setting without this knowing anything about it.
           */}
          <a
            href="#main-content"
            className="text-text-secondary hover:text-accent-primary focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary rounded-md text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
