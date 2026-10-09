"use client";

import { usePathname } from "next/navigation";

/**
 * Whether `href` is the page being viewed. By default a link also counts as active
 * on the pages nested under it (`/work` on `/work/ui-kits`); `exact` turns that off,
 * for a link like `/admin` whose sub-pages have links of their own.
 */
export function useIsActive(href: string, exact = false): boolean {
  const pathname = usePathname();
  return exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}
