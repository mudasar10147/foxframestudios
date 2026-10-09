"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import type { PortfolioCategory } from "../types";
import { ProjectCarousel } from "./ProjectCarousel";

export interface PortfolioExplorerProps {
  categories: readonly PortfolioCategory[];
  /** The tab selected when the page loads. Defaults to the first. */
  defaultId?: string;
}

/**
 * The portfolio's category tabs and the carousel they switch.
 *
 * The carousel is keyed by category, so switching remounts it: it opens on that
 * category's first project and plays its entrance again.
 */
export function PortfolioExplorer({
  categories,
  defaultId,
}: PortfolioExplorerProps) {
  const [selectedId, setSelectedId] = useState(
    defaultId ?? categories[0]?.id ?? "",
  );
  const category =
    categories.find((item) => item.id === selectedId) ?? categories[0];

  if (!category) return null;

  return (
    <Tabs
      label="Portfolio categories"
      variant="split"
      // Every card has its own buttons, so the panel needn't be a focus stop.
      panelFocusable={false}
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
