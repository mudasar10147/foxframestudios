import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/navigation/Logo";
import { SocialLinks } from "@/components/social/SocialLinks";
import { siteConfig } from "@/constants/site";
import { footerColumns, socialLinks } from "@/constants/content";
import { BackToTop } from "./footer/BackToTop";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-default">
      <Container size="wide" className="flex flex-col gap-16 px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-body-sm text-text-muted max-w-[var(--reading-width)]">
              {siteConfig.description}
            </p>
            <SocialLinks links={socialLinks} />
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-3"
            >
              <h3 className="text-label text-text-secondary">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-body-sm transition-icon text-text-muted hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border-default pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-sm text-text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
