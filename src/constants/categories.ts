import type { WorkCategory } from "@/types";

/**
 * Top-level portfolio categories. Each renders its own page at
 * /work/[slug] and drives the filter buttons in the Work section.
 */
export const workCategories: WorkCategory[] = [
  {
    slug: "ui-designs",
    label: "UI Designs",
    title: "UI Design Portfolio",
    description:
      "Roblox game interfaces — HUDs, shops, inventories, and full menu systems designed to feel premium and scale across every device.",
    blurb: "HUDs, shops, menus & full UI kits",
    icon: "layout",
    ungroupedLabel: "UI Designs",
  },
  {
    slug: "scripting",
    label: "Scripting",
    title: "Scripting Portfolio",
    description:
      "Luau and full stack systems — game mechanics, data stores, and the backend logic that keeps everything running smoothly.",
    blurb: "Luau systems & full stack logic",
    icon: "code",
    ungroupedLabel: "Scripts",
  },
  {
    slug: "map-building",
    label: "Map Building",
    title: "Map Building Portfolio",
    description:
      "Playable environments built in Roblox Studio — layout, lighting, and optimisation tuned for performance at scale.",
    blurb: "Playable worlds built in Studio",
    icon: "map",
    ungroupedLabel: "Maps",
  },
  {
    slug: "3d-modelling",
    label: "3D Modelling",
    title: "3D Modelling Portfolio",
    description:
      "Custom props, characters, and assets modelled and textured for Roblox, from concept through in-game import.",
    blurb: "Props, characters & game assets",
    icon: "cube",
    ungroupedLabel: "3D Models",
  },
];

export function getCategoryBySlug(slug: string): WorkCategory | undefined {
  return workCategories.find((category) => category.slug === slug);
}
