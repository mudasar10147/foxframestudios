import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/**
 * The Neon Postgres client. Server-only: it reads `DATABASE_URL`, which must never
 * reach the browser.
 *
 * A lazy factory, like `getResendClient`: it reads the environment at call time
 * and throws if the connection string is missing, rather than at import, which
 * would break builds that run without it (§2.5). The client is reused once made.
 */
export function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  client ??= neon(url);
  return client;
}
