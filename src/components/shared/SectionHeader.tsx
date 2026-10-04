import { cn } from "@/lib/utils";

const alignStyles = {
  start: "items-start text-left",
  center: "items-center text-center",
} as const;

export type SectionHeaderAlign = keyof typeof alignStyles;

export interface SectionHeaderProps {
  /** Small label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** A short ornamental rule under the title: a lit centre bar between two thin lines. */
  divider?: boolean;
  align?: SectionHeaderAlign;
  className?: string;
}

/**
 * The title block a section opens with. Distinct from `PageHeader`, which owns the
 * single `<h1>` a route opens with — this renders an `<h2>`, so the two can sit on the
 * same page without breaking heading order (§15).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  divider = false,
  align = "start",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", alignStyles[align], className)}>
      {eyebrow ? (
        <span className="text-accent-primary text-xs font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="text-text-primary text-3xl font-extrabold tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {divider ? (
        <span aria-hidden className="section-header-divider">
          <span className="section-header-divider-line" />
          <span className="section-header-divider-bar bg-accent-primary" />
          <span className="section-header-divider-line" />
        </span>
      ) : null}

      {description ? (
        <p className="text-text-secondary max-w-2xl text-base text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
