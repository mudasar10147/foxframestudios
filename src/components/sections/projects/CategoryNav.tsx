import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { ArrowRight, Box, Code2, LayoutDashboard, Map } from "lucide-react";
import { workCategories } from "@/constants/categories";
import { projects } from "@/constants/content";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  layout: LayoutDashboard,
  code: Code2,
  map: Map,
  cube: Box,
};

type CategoryNavProps = {
  /** Slug of the category currently being viewed, if any. */
  active?: CategorySlug;
  className?: string;
};

export function CategoryNav({ active, className }: CategoryNavProps) {
  return (
    <nav
      aria-label="Portfolio categories"
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {workCategories.map((category) => {
        const isActive = active === category.slug;
        const Icon = iconMap[category.icon] ?? LayoutDashboard;
        const count = projects.filter(
          (project) => project.category === category.slug,
        ).length;

        return (
          <Link
            key={category.slug}
            href={`/work/${category.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group transition-button flex flex-col gap-3 rounded-lg border p-5 hover:-translate-y-0.5",
              isActive
                ? "border-border-glow bg-accent-primary/10 shadow-purple-glow"
                : "border-border-default bg-surface hover:border-border-strong hover:shadow-floating",
            )}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-md border",
                isActive
                  ? "border-border-glow bg-accent-primary text-text-primary"
                  : "border-border-default bg-elevated-surface text-accent-primary",
              )}
            >
              <Icon size={20} aria-hidden="true" />
            </span>

            <span className="flex flex-col gap-1">
              <span className="text-h4 text-text-primary">{category.label}</span>
              <span className="text-body-sm text-text-muted">
                {category.blurb}
              </span>
            </span>

            <span className="mt-auto flex items-center justify-between gap-2 pt-2">
              <span className="text-caption text-text-muted">
                {count} {count === 1 ? "project" : "projects"}
              </span>
              <span
                className={cn(
                  "text-button transition-icon inline-flex items-center gap-1",
                  isActive ? "text-text-primary" : "text-accent-primary",
                )}
              >
                View
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
