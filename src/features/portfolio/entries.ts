import type { IconName } from "@/components/ui/Icon";
import { PORTFOLIO_CATEGORIES } from "./content";
import { GAMES } from "./games";
import type { PortfolioProject } from "./types";

/** A project as the portfolio page lists it: the project plus its discipline. */
export interface PortfolioEntry extends PortfolioProject {
  categoryId: string;
  categoryLabel: string;
  categoryIcon: IconName;
}

/** Every real project, across all disciplines, in category order. Stand-ins are left out. */
export function getPortfolioEntries(): PortfolioEntry[] {
  return PORTFOLIO_CATEGORIES.flatMap((category) =>
    category.projects
      .filter((project) => !project.placeholder)
      .map((project) => ({
        ...project,
        categoryId: category.id,
        categoryLabel: category.label,
        categoryIcon: category.icon,
      })),
  );
}

/** Lifetime visits across every live game. */
export function getTotalPlayerVisits(): number {
  return GAMES.reduce((sum, game) => sum + game.playerVisits, 0);
}
