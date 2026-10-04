import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  /** Small label above the title, e.g. a section or category name. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Primary calls to action rendered beneath the copy. */
  actions?: ReactNode;
  className?: string;
}

/**
 * The single title block every route opens with. Pages MUST use this rather than
 * hand-rolling an h1 + paragraph, so type scale and rhythm stay identical site-wide.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow ? (
        <span className="text-accent-primary text-xs font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      ) : null}

      <h1 className="text-text-primary text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>

      {description ? (
        <p className="text-text-secondary max-w-2xl text-base text-pretty">
          {description}
        </p>
      ) : null}

      {actions ? (
        <div className="flex flex-wrap gap-3 pt-2">{actions}</div>
      ) : null}
    </div>
  );
}
