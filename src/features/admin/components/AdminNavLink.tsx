"use client";

import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useIsActive } from "@/hooks/useIsActive";
import { cn } from "@/lib/utils";

export interface AdminNavLinkProps {
  href: string;
  icon: IconName;
  label: string;
  /** Match only this exact path, for a link whose sub-pages have links of their own. */
  exact?: boolean;
  /** A count shown at the end, e.g. unread messages. Hidden when zero. */
  count?: number;
}

/**
 * One item in the admin sidebar: an icon and a label, lit when it's the page being
 * viewed. A client leaf only because the active state comes from the live URL;
 * the sidebar around it stays a Server Component (§10.1).
 */
export function AdminNavLink({
  href,
  icon,
  label,
  exact = false,
  count,
}: AdminNavLinkProps) {
  const isActive = useIsActive(href, exact);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn("admin-nav-link", isActive && "admin-nav-link-active")}
    >
      <span aria-hidden className="flex text-lg">
        <Icon name={icon} />
      </span>
      <span className="flex-1">{label}</span>
      {count ? (
        <span className="admin-nav-count">
          {count}
          <span className="sr-only"> new</span>
        </span>
      ) : null}
    </Link>
  );
}
