import type { IconName } from "@/components/ui/Icon";

export interface ProjectImage {
  src: string;
  alt: string;
  /**
   * `cover` (default) fills the card, cropping as needed: right for screenshots
   * and key art. `contain` shows the whole image on the card's dark backdrop:
   * right for cut-out renders on transparency.
   */
  fit?: "cover" | "contain";
}

export interface PortfolioProject {
  /** Stable key (§16). */
  id: string;
  title: string;
  /** Three short words under the title on the featured card, e.g. Build / Defend / Survive. */
  tagline: readonly string[];
  /** Shown under the title on the side cards, e.g. Exploration / Quests / Systems. */
  tags: readonly string[];
  image: ProjectImage;
  /** A sentence or two about the work, shown under the screen in the full-screen preview. */
  description?: string;
  /**
   * The project's own page. When set, the card's button is "View project" and goes
   * there; without one, the button is "View full screen" and opens the preview.
   */
  href?: string;
  /**
   * A stand-in, not real work: shown on the home page's carousel so the tab isn't
   * empty, but left off the portfolio page, where clients look closely.
   */
  placeholder?: boolean;
  /** Adds the "Featured" badge. */
  featured?: boolean;
}

export interface PortfolioCategory {
  /** Stable key, also the tab's value. */
  id: string;
  label: string;
  icon: IconName;
  projects: readonly PortfolioProject[];
}
