import { ButtonLink } from "@/components/ui/ButtonLink";

export interface FilterLink {
  label: string;
  href: string;
  /** How many items the filter shows, if worth saying. */
  count?: number;
  isActive: boolean;
}

export interface FilterLinksProps {
  /** The group's accessible name, e.g. "Filter projects". */
  label: string;
  links: readonly FilterLink[];
}

/**
 * A row of filters as plain links, each pointing at the same page with its filter
 * in the URL. A filtered view therefore survives a reload, can be bookmarked or
 * shared, and works without JavaScript (§12.2). The active one is marked for
 * assistive technology as the current page.
 */
export function FilterLinks({ label, links }: FilterLinksProps) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2">
      {links.map((link) => (
        <ButtonLink
          key={link.href}
          href={link.href}
          variant={link.isActive ? "outline" : "ghost"}
          size="sm"
          aria-current={link.isActive ? "page" : undefined}
        >
          {link.label}
          {link.count === undefined ? null : (
            <span className="text-text-muted tabular-nums">{link.count}</span>
          )}
        </ButtonLink>
      ))}
    </nav>
  );
}
