"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useIsActive } from "@/hooks/useIsActive";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  /** Match nested routes too (e.g. `/work` stays active on `/work/ui-kits`). */
  exact?: boolean;
  /**
   * "none" when a parent owns a shared sliding indicator for the whole list —
   * otherwise the two underlines would double up. See `NavLinks`.
   */
  indicator?: "underline" | "none";
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}

/**
 * Client component because active state is derived from the live pathname.
 * Kept as a leaf so the surrounding Navbar can stay a Server Component (§10.1).
 *
 * The anchor is deliberately taller than its text: a text-sized hit area makes the
 * pointer fall out of the nav on the slightest vertical drift, which reads as the
 * underline glitching back to the active item. The label is wrapped so the underline
 * — and the sliding indicator in `NavLinks` — can sit against the text rather than
 * against the bottom of the padded box.
 *
 * Carries NO horizontal padding of its own: `NavLinks` adds it so the anchors tile
 * edge to edge with no gap the pointer can fall into. Setting it here would indent
 * the stacked links in the mobile panel.
 */
export function NavLink({
  href,
  exact = false,
  indicator = "underline",
  className,
  onNavigate,
  children,
}: NavLinkProps) {
  const isActive = useIsActive(href, exact);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-12 items-center text-sm transition-colors duration-200",
        "focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isActive
          ? "text-accent-primary"
          : "text-text-secondary hover:text-accent-primary",
        className,
      )}
    >
      <span data-nav-label className="relative">
        {children}

        {indicator === "underline" ? (
          <span
            aria-hidden
            className={cn(
              "nav-underline absolute -bottom-1.5 left-0 w-full origin-left transition-transform duration-200",
              isActive ? "scale-x-100" : "scale-x-0",
            )}
          />
        ) : null}
      </span>
    </Link>
  );
}
