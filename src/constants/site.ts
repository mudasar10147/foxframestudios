/**
 * Single source of truth for site identity and primary navigation (AGENTS.md §14).
 * Nav labels/hrefs are changed here only — never hardcoded in a component.
 */
export const siteConfig = {
  name: "FoxFrame Studio",
  /** Rendered as two stacked lines in the logo lockup. */
  wordmark: { primary: "FLAYERX", secondary: "STUDIO" },
  availability: "Available",
  /** One line on what the studio does. Used by the footer. */
  tagline: "Interface design, scripting, and 3D production for game studios.",
  /**
   * Who the copyright notice names.
   *
   * TODO: replace "localhost" with the registered studio name once it is decided —
   * it is a placeholder standing in for a real rights holder, and it is the one
   * thing in the footer a visitor could take literally.
   */
  rightsHolder: "localhost",
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
  { label: "Work", href: "/work" },
  { label: "Scripting", href: "/scripting" },
  { label: "Modeling", href: "/modeling" },
  { label: "Studio", href: "/studio" },
  { label: "About", href: "/about" },
] as const;
