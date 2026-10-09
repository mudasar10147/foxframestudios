import { ROUTES } from "@/constants/routes";

/**
 * Single source of truth for site identity and primary navigation (AGENTS.md §14).
 * Nav labels/hrefs are changed here only — never hardcoded in a component.
 */
export const siteConfig = {
  name: "FlareX Studio",
  /** Rendered as two stacked lines in the logo lockup. */
  wordmark: { primary: "FlareX", secondary: "STUDIO" },
  availability: "Available",
  /** One line on what the studio does. Used by the footer. */
  tagline:
    "Full game development, UI/UX design and scripting for game studios.",
  /** Footer lines: the pitch under the logo, its motto, and the bottom bar's line. */
  footer: {
    pitch: "We build interactive game experiences.",
    motto: ["Play", "Create", "Together"],
    slogan: "Games for a brighter tomorrow",
  },
  /** The studio's community server. */
  social: {
    discord: "https://discord.gg/TkGBYFgT9",
  },
  /**
   * Shown in the contact section's details card.
   *
   * TODO: replace with the studio's real inbox. This is a placeholder from the
   * design, and visitors will copy it.
   */
  contactEmail: "hello@yourstudio.com",
  /** Primary call to action. Used by the header, the mobile menu and the hero. */
  cta: { label: "Start Project", href: "/contact" },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: readonly NavItem[] = [
  { label: "Portfolio", href: ROUTES.portfolio },
  { label: "Scripting", href: "/scripting" },
  { label: "Studio", href: "/studio" },
  { label: "About", href: "/about" },
] as const;
