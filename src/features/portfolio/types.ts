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
  /** Where "View project" goes. */
  href: string;
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
