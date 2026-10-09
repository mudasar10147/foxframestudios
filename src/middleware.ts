import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "@/constants/routes";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Keeps signed-out visitors off the admin pages: anything under `/admin` except
 * the sign-in page sends them to sign in, and a signed-in admin visiting the
 * sign-in page goes straight to the dashboard.
 *
 * This is the first gate, not the only one: every admin page and Server Action
 * checks the session again itself (`requireAdmin`).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  ).catch((error: unknown) => {
    // A missing secret is a deployment mistake: log it, and treat everyone as
    // signed out rather than letting anyone in.
    console.error("Admin session check failed:", error);
    return null;
  });

  const isLoginPage = pathname === ROUTES.adminLogin;

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.adminLogin, request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.admin, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
