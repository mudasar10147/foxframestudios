import { SubmitButton } from "@/components/ui/SubmitButton";
import { Logo } from "@/components/ui/Logo";
import { ROUTES } from "@/constants/routes";
import { logoutAction } from "../actions";
import { AdminNavLink } from "./AdminNavLink";

export interface AdminSidebarProps {
  /** The signed-in admin's email. */
  email: string;
  /** Unread messages, shown on the Messages link. Undefined if it couldn't be read. */
  unread?: number;
}

/**
 * The admin panel's navigation, in place of the public header: the studio's logo,
 * the panel's pages, and who's signed in with a way to sign out.
 *
 * A full-height column beside the page from `lg`; above the page as a compact bar
 * below that.
 */
export function AdminSidebar({ email, unread }: AdminSidebarProps) {
  return (
    <aside className="admin-sidebar">
      <div className="flex items-center justify-between gap-4 lg:block">
        <Logo href={ROUTES.admin} />
        <p className="text-text-muted hidden text-xs font-semibold tracking-[0.2em] uppercase lg:mt-8 lg:block">
          Admin
        </p>
        {/* Phones: the sidebar's footer is hidden, so sign-out sits in the top bar. */}
        <form action={logoutAction} className="lg:hidden">
          <SubmitButton variant="outline" size="sm">
            Sign out
          </SubmitButton>
        </form>
      </div>

      <nav aria-label="Admin" className="admin-sidebar-nav">
        <AdminNavLink
          href={ROUTES.admin}
          icon="layout"
          label="Dashboard"
          exact
        />
        <AdminNavLink
          href={ROUTES.adminMessages}
          icon="mail"
          label="Messages"
          count={unread}
        />
      </nav>

      <div className="admin-sidebar-footer">
        <p className="text-text-muted truncate text-xs" title={email}>
          Signed in as
          <span className="text-text-secondary block truncate">{email}</span>
        </p>
        <form action={logoutAction}>
          <SubmitButton
            variant="outline"
            size="sm"
            className="w-full justify-center"
          >
            Sign out
          </SubmitButton>
        </form>
      </div>
    </aside>
  );
}
