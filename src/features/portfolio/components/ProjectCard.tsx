import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "../types";

/** Where a card sits relative to the carousel's current slide. */
export type CardPosition = "center" | "prev" | "next" | "hidden";

function positionFor(offset: number): CardPosition {
  if (offset === 0) return "center";
  if (offset === -1) return "prev";
  if (offset === 1) return "next";
  return "hidden";
}

export interface ProjectCardProps {
  project: PortfolioProject;
  /**
   * Slots from the centre: 0 is the centre, ±1 the sides, ±2 waiting just off
   * stage on the side it'll enter from.
   */
  offset: number;
  /**
   * True when the card is jumping more than one slot (wrapping round, or a dot
   * jump), so it appears at its new place instead of streaking across the stage.
   */
  teleport?: boolean;
  /** "2 of 4", for the slide's accessible name. */
  positionLabel: string;
  /** Called when a side card is clicked, to bring it to the centre. */
  onFocusRequest: () => void;
  /** Called by "View full screen" (projects without a page), to open the preview. */
  onOpen: () => void;
}

/**
 * One slide of the portfolio carousel: the project's art with its title over it.
 *
 * The same card plays every role. In the centre it shows the Featured badge, the
 * tagline and a button: "View project" to the project's own page when it has one,
 * otherwise "View full screen", which opens it in the lightbox. At the sides it's tilted and dimmed, shows the tags
 * instead, and is itself a button that brings it to the centre. Everything that
 * changes between those roles is CSS on `data-position` and `--card-offset`, so a
 * card moving between them slides instead of re-rendering.
 */
export function ProjectCard({
  project,
  offset,
  teleport = false,
  positionLabel,
  onFocusRequest,
  onOpen,
}: ProjectCardProps) {
  const position = positionFor(offset);
  const isCenter = position === "center";
  const isSide = position === "prev" || position === "next";
  const { image } = project;

  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${project.title}, ${positionLabel}`}
      data-position={position}
      data-teleport={teleport || undefined}
      style={{ "--card-offset": offset } as CSSProperties}
      // Off-screen slides can't be reached or read (§15).
      inert={!isCenter && !isSide}
      className="project-card"
    >
      <div className="project-card-art">
        {project.clip ? (
          <LoopVideo
            src={project.clip}
            poster={image.src}
            className={cn(
              "project-card-image",
              image.fit === "contain" ? "object-contain" : "object-cover",
            )}
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            // The centre card is half the container at `lg` (at most ~640px once the
            // container hits its 80rem cap) and 84% of the width below it.
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 84vw"
            className={cn(
              "project-card-image",
              image.fit === "contain"
                ? "project-card-image-contain object-contain"
                : "object-cover",
            )}
          />
        )}
      </div>

      {/* Darkens the lower part of the art so the text over it stays readable. */}
      <span aria-hidden className="project-card-shade" />

      {project.featured ? (
        <span className="project-card-badge">
          <Icon name="star" />
          Featured
        </span>
      ) : null}

      <div className="project-card-body">
        <div className="min-w-0">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-tagline">{project.tagline.join(" • ")}</p>
          <p className="project-card-tags">{project.tags.join(" • ")}</p>
        </div>

        {project.href ? (
          <Link
            href={project.href}
            tabIndex={isCenter ? undefined : -1}
            className="project-card-link"
          >
            View project
            <Icon name="chevronRight" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            tabIndex={isCenter ? undefined : -1}
            className="project-card-link"
          >
            View full screen
            <Icon name="chevronRight" />
          </button>
        )}
      </div>

      {/* At the sides, the whole card is a button that brings it to the centre. */}
      {isSide ? (
        <button
          type="button"
          onClick={onFocusRequest}
          aria-label={`Show ${project.title}`}
          className="project-card-select"
        />
      ) : null}
    </article>
  );
}
