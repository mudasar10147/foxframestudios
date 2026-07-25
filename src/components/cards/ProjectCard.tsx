import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryBySlug } from "@/constants/categories";
import type { Project } from "@/types";
import { Badge } from "@/components/badges/Badge";
import { TechBadge } from "@/components/badges/TechBadge";
import { Card } from "./Card";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const primaryHref =
    project.links?.caseStudy ?? project.links?.live ?? project.links?.repo;

  // `category` is a URL slug — show the finer-grained label when we have one,
  // otherwise fall back to the category's display name.
  const categoryLabel =
    project.subcategory ?? getCategoryBySlug(project.category)?.label;

  return (
    <Card
      as="article"
      variant="surface"
      hoverable
      glow
      className={cn("group flex flex-col gap-4", className)}
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border border-border-default bg-elevated-surface text-text-muted">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} project preview`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="text-body-sm">Project Thumbnail</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        {categoryLabel ? (
          <Badge variant="default" size="sm">
            {categoryLabel}
          </Badge>
        ) : null}
        {project.year ? (
          <span className="text-caption text-text-muted">{project.year}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-h4 text-text-primary">{project.title}</h3>
        <p className="text-body-sm text-accent-primary">{project.role}</p>
        <p className="text-body text-text-secondary">{project.summary}</p>
      </div>

      {project.metric ? (
        <p className="text-body-sm text-text-secondary">
          <span className="text-text-primary">{project.metric.value}</span>{" "}
          {project.metric.label}
        </p>
      ) : null}

      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <TechBadge label={tech} />
          </li>
        ))}
      </ul>

      {primaryHref ? (
        <a
          href={primaryHref}
          className="text-button transition-icon mt-auto inline-flex items-center gap-1 text-accent-primary"
        >
          View Project
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : null}
    </Card>
  );
}
