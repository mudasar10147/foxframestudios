import { MobileNav } from "@/components/layout/MobileNav";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChamferBeam } from "@/components/ui/ChamferBeam";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "@/components/ui/NavLinks";
import { StatusPill } from "@/components/ui/StatusPill";
import { navItems, siteConfig } from "@/constants/site";

/**
 * Server Component: only the interactive leaves (`NavLinks`, `MobileNav`) opt into the
 * client, keeping the boundary as small as practical (§10.1).
 *
 * The bar is flush to the viewport top and spans `--header-width`, so its leaning side
 * edges read against the page background rather than running off-screen. It sets its own
 * width and gutter instead of using `Container`, because both are dictated by the
 * clip-path geometry rather than by the page grid.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      {/* The bloom sits OUTSIDE the clip so drop-shadow traces the trapezoid (§8.1). */}
      <div className="panel-bloom relative mx-auto w-[var(--header-width)]">
        {/* clip-path clips borders, so the 1px rule is drawn by this outer layer. */}
        <div className="chamfer-sides bg-border-strong p-px">
          <div className="chamfer-sides panel-surface panel-rim relative">
            <div className="chamfer-safe-x relative flex min-h-16 flex-wrap items-center gap-x-4">
              <Logo className="mr-auto lg:mr-0" />

              <nav aria-label="Main" className="mx-auto hidden lg:block">
                <NavLinks items={navItems} />
              </nav>

              <div className="hidden items-center gap-5 lg:flex">
                <StatusPill pulse>{siteConfig.availability}</StatusPill>
                <ButtonLink
                  href={siteConfig.cta.href}
                  variant="outline"
                  size="sm"
                >
                  {siteConfig.cta.label}
                </ButtonLink>
              </div>

              <MobileNav />
            </div>
          </div>
        </div>

        <ChamferBeam />
      </div>
    </header>
  );
}
