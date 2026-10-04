"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import type { PortfolioCategory } from "../types";
import { ProjectCarousel } from "./ProjectCarousel";

export interface PortfolioExplorerProps {
  categories: readonly PortfolioCategory[];
}

/**
 * The portfolio's category tabs and the carousel they switch.
 *
 * The carousel is keyed by category, so switching remounts it: it opens on that
 * category's first project and plays its entrance again.
 */
export function PortfolioExplorer({ categories }: PortfolioExplorerProps) {
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const category =
    categories.find((item) => item.id === selectedId) ?? categories[0];

  if (!category) return null;

  return (
    <Tabs
      label="Portfolio categories"
      variant="split"
      align="center"
      items={categories.map((item) => ({
        value: item.id,
        label: item.label,
        icon: item.icon,
      }))}
      value={category.id}
      onValueChange={setSelectedId}
    >
      <div key={category.id} className="project-carousel-enter mt-10 lg:mt-12">
        <ProjectCarousel
          label={`${category.label} projects`}
          projects={category.projects}
        />
      </div>
    </Tabs>
  );
}
