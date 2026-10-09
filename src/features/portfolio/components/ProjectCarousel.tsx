"use client";

import { useState, type KeyboardEvent } from "react";
import {
  ImageLightbox,
  type LightboxItem,
} from "@/components/shared/ImageLightbox";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "../types";
import { ProjectCard } from "./ProjectCard";

export interface ProjectCarouselProps {
  /** e.g. "Gameplay projects", the carousel's accessible name. */
  label: string;
  projects: readonly PortfolioProject[];
}

/**
 * How many slots slide `index` sits from the current one, wrapping round, so the
 * slide before the first is the last. Clamped to ±2: anything further waits just off
 * stage on the side it's nearer to. With two slides the other one is on the right.
 */
function offsetOf(index: number, current: number, count: number) {
  let offset = (index - current + count) % count;
  if (offset > count / 2) offset -= count;
  return Math.max(-2, Math.min(2, offset));
}

/** A project as the full-screen preview shows it. */
function toLightboxItem(project: PortfolioProject): LightboxItem {
  return {
    id: project.id,
    src: project.image.src,
    alt: project.image.alt,
    title: project.title,
    meta: project.tags.join(" • "),
    description: project.description,
    inset: project.image.fit === "contain",
    video: project.clip,
  };
}

/**
 * The portfolio's carousel: one large centre card with the neighbours on either
 * side, tilted and dimmed, arrows to step through, and dots to jump.
 *
 * Every card is always mounted; moving only changes which slot each one holds, and
 * the CSS animates the change. So a step slides the whole row: going next, the
 * centre card moves out to the left and the next one comes in from the right. It
 * wraps round in both directions. On a phone the neighbours peek in at the edges,
 * and the arrows sit under the card instead of over it.
 *
 * Keyboard: ←/→ step while focus is anywhere in the carousel. A polite live region
 * announces the new slide.
 */
export function ProjectCarousel({ label, projects }: ProjectCarouselProps) {
  // The previous slide is kept alongside the current one so each card can tell how
  // far it just moved, and skip the slide when it jumped across the row.
  const [view, setView] = useState({ current: 0, previous: 0 });
  const { current, previous } = view;
  const count = projects.length;
  const active = projects[current];
  // The project open in the full-screen preview, or null when it's closed.
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const go = (index: number) =>
    setView((state) => ({
      current: (index + count) % count,
      previous: state.current,
    }));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(current - 1);
    }
  };

  if (!active) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="project-carousel"
    >
      <div className="project-carousel-stage">
        {projects.map((project, index) => {
          const offset = offsetOf(index, current, count);
          const before = offsetOf(index, previous, count);

          return (
            <ProjectCard
              key={project.id}
              project={project}
              offset={offset}
              teleport={Math.abs(offset - before) > 1}
              positionLabel={`${index + 1} of ${count}`}
              onFocusRequest={() => go(index)}
              onOpen={() => setPreviewIndex(index)}
            />
          );
        })}
      </div>

      {count > 1 ? (
        <div className="project-carousel-nav">
          <button
            type="button"
            onClick={() => go(current - 1)}
            aria-label="Previous project"
            className="project-carousel-arrow project-carousel-arrow-prev"
          >
            <Icon name="chevronLeft" />
          </button>

          <div className="project-carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => go(index)}
                aria-label={`Show ${project.title}`}
                aria-current={index === current ? "true" : undefined}
                className={cn(
                  "project-carousel-dot",
                  index === current && "project-carousel-dot-active",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(current + 1)}
            aria-label="Next project"
            className="project-carousel-arrow project-carousel-arrow-next"
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      ) : null}

      <ImageLightbox
        items={projects.map(toLightboxItem)}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={() => {
          // Leave the carousel on whatever was being looked at in the preview.
          if (previewIndex !== null && previewIndex !== current)
            go(previewIndex);
          setPreviewIndex(null);
        }}
      />

      <p aria-live="polite" className="sr-only">
        {`${active.title}, ${current + 1} of ${count}`}
      </p>
    </div>
  );
}
