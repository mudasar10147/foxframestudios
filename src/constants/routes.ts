/**
 * Routes referenced from more than one module: the middleware, the pages and the
 * server actions all need the admin paths, and the menus, cards and game pages all
 * need the portfolio's (§14).
 */
export const ROUTES = {
  portfolio: "/portfolio",
  admin: "/admin",
  adminMessages: "/admin/messages",
  adminLogin: "/admin/login",
} as const;
