import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  verifySessionToken,
  type AdminSession,
} from "@/lib/auth";
import { ROUTES } from "@/constants/routes";

/** The signed-in admin, or null. For Server Components and Server Actions. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * The signed-in admin, or a redirect to the sign-in page.
 *
 * Every admin page and action calls this itself, even though the middleware also
 * guards `/admin`: a Server Action can be invoked directly, so the page being
 * hidden is not the same as the operation being protected (§17).
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect(ROUTES.adminLogin);
  return session;
}
