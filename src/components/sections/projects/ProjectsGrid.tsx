"use client";

import { motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { TiltCard } from "@/components/shared/TiltCard";

type ProjectsGridProps = {
  projects: Project[];
  /** Render the first card full-width as a hero tile. */
  featureFirst?: boolean;
};

export function ProjectsGrid({
  projects,
  featureFirst = false,
}: ProjectsGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.3, delay: Math.min(index, 3) * 0.05 }}
          className={cn(featureFirst && index === 0 && "lg:col-span-2")}
        >
          <TiltCard>
            <ProjectCard project={project} className="h-full" />
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
