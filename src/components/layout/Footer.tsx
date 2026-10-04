import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { FooterRail } from "@/components/layout/FooterRail";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navItems, siteConfig, type NavItem } from "@/constants/site";

/**
 * Every page the site has: the header's own `navItems` (so the two can't drift,
 * §14), with Home before them and Contact after.
 */
const QUICK_LINKS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  ...navItems,
  { label: "Contact", href: "/contact" },
];

interface ConnectLink {
  id: string;
  icon: IconName;
  label: string;
  href: string;
  /** Opens in a new tab, for links that leave the site. */
  external?: boolean;
}

const CONNECT_LINKS: readonly ConnectLink[] = [
  {
    id: "email",
    icon: "mail",
    label: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  {
    id: "discord",
    icon: "discord",
    label: "Join our Discord",
    href: siteConfig.social.discord,
    external: true,
  },
];

/** A column's label: its icon in the accent, then the title in spaced caps. */
function ColumnHeading({
  icon,
  children,
}: {
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <h2 className="text-text-primary flex items-center gap-3 text-sm font-bold tracking-[0.18em] uppercase md:whitespace-nowrap">
      <span aria-hidden className="text-accent-primary flex text-xl">
        <Icon name={icon} />
      </span>
      {children}
    </h2>
  );
}

/**
 * The band the page closes on: the studio's lockup and pitch, the site's pages, a
 * connect column with the call to action, and a bottom bar with the copyright and
 * the studio's slogan. It's framed above and below by angled rails (`FooterRail`).
 *
 * Every link and line of copy comes from `constants/site`, so changing a route or a
 * label is one edit there. A Server Component throughout (§10.1).
 */
export function Footer() {
  /*
   * Read on the server, so there's no client render to disagree with (§10.5). On a
   * static route it's fixed at build time, so the year updates with the next
   * deploy.
   */
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 lg:mt-32">
      <div
        aria-hidden
        className="texture-grid pointer-events-none absolute inset-0"
      />

      <FooterRail edge="top" />

      <Container className="relative pt-14 pb-12 lg:pt-16 lg:pb-14">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo size="lg" />
            <p className="text-text-secondary mt-7 text-base text-pretty">
              {siteConfig.footer.pitch}
            </p>
            <p className="text-text-muted mt-6 text-xs font-medium tracking-[0.3em] uppercase">
              {siteConfig.footer.motto.join(" • ")}
            </p>
          </div>

          <nav aria-label="Quick links" className="footer-column">
            <ColumnHeading icon="link">Quick Links</ColumnHeading>
            {/* Two short columns rather than one long one, so this column sits
                level with the others. */}
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column footer-connect">
            <ColumnHeading icon="mail">Let&apos;s Connect</ColumnHeading>
            <ul className="mt-6 flex flex-col gap-4">
              {CONNECT_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : null)}
                    className="footer-link group/connect inline-flex items-center gap-4"
                  >
                    <span
                      aria-hidden
                      className="text-accent-primary flex shrink-0 text-xl"
                    >
                      <Icon name={link.icon} />
                    </span>
                    {link.label}
                    {link.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={siteConfig.cta.href}
              variant="outline"
              size="lg"
              className="footer-cta mt-8 gap-3 uppercase"
            >
              Start a Project
              <span aria-hidden className="footer-cta-arrow flex">
                <Icon name="chevronRight" />
              </span>
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="relative">
        <FooterRail edge="bottom" />
        <Container className="footer-bottom">
          <p className="text-text-secondary text-sm">
            © {year} {siteConfig.name.toUpperCase()}. All rights reserved.
          </p>

          <p className="footer-slogan text-text-secondary text-xs uppercase">
            <span aria-hidden className="footer-slashes">
              <span />
              <span />
              <span />
            </span>
            {siteConfig.footer.slogan}
          </p>
        </Container>
      </div>
    </footer>
  );
}
