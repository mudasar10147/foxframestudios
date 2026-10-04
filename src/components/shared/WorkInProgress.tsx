import { Rise } from "@/components/shared/Rise";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HudTile } from "@/components/ui/HudTile";
import { Icon } from "@/components/ui/Icon";
import { StatusPill } from "@/components/ui/StatusPill";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export interface WorkInProgressProps {
  /** Defaults to "This page is under construction". */
  title?: string;
  /** Defaults to a line pointing visitors to the home page and the contact form. */
  description?: string;
  className?: string;
}

/**
 * The placeholder for a page that has no content yet: a glass card with a slowly
 * turning gear, a "Work in progress" status, a looping progress bar, and two ways
 * forward (home, or start a project).
 *
 * One component for every unfinished page, so they all say it the same way and
 * each can be swapped for real content without touching the others. Rendered under
 * the route's own `PageHeader`, which keeps the page's title and metadata intact.
 */
export function WorkInProgress({
  title = "This page is under construction",
  description = "We're building this part of the site right now. In the meantime, take a look around the home page or tell us about your project.",
  className,
}: WorkInProgressProps) {
  return (
    <Rise trigger="mount" delay={90} className={cn("mt-12", className)}>
      <section
        aria-labelledby="work-in-progress-title"
        className="glass-card hover-reveal-scope flex flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <div aria-hidden className="w-20">
          <HudTile tone="cool" selected>
            <span className="wip-gear">
              <Icon name="settings" />
            </span>
          </HudTile>
        </div>

        <StatusPill tone="warning" pulse className="mt-8">
          Work in progress
        </StatusPill>

        <h2
          id="work-in-progress-title"
          className="text-text-primary mt-4 text-2xl font-extrabold tracking-tight text-balance uppercase sm:text-3xl"
        >
          {title}
        </h2>

        <p className="text-text-secondary mt-4 max-w-lg text-pretty">
          {description}
        </p>

        {/* Indeterminate: there's no real percentage to show, only that work is
            moving, so a segment sweeps the track on a loop. */}
        <span aria-hidden className="wip-progress mt-8">
          <span className="wip-progress-bar bg-accent-primary" />
        </span>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={siteConfig.cta.href} variant="primary" size="lg">
            {siteConfig.cta.label}
          </ButtonLink>
        </div>
      </section>
    </Rise>
  );
}
