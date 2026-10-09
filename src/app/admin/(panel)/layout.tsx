import type { ReactNode } from "react";
import { AdminSidebar } from "@/features/admin";
import { requireAdmin } from "@/lib/admin-session";
import { getContactStats } from "@/lib/contact-messages";

/**
 * The signed-in admin panel: the sidebar beside every page, in place of the
 * public header and footer. The pages still check the session themselves too
 * (`requireAdmin`), since a layout isn't re-run on every navigation.
 */
export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();

  // Only for the sidebar's unread badge. If the database is down, the badge is
  // simply left off; the page below reports the problem properly.
  const unread = await getContactStats()
    .then((stats) => stats.unread)
    .catch((error: unknown) => {
      console.error("Admin sidebar could not read the unread count:", error);
      return undefined;
    });

  return (
    <div className="admin-shell">
      <AdminSidebar email={session.sub} unread={unread} />
      <main id="main-content" className="admin-main">
        {children}
      </main>
    </div>
  );
}
