import { z } from "zod";

/**
 * Admin sessions: a signed token in an httpOnly cookie. No session store and no
 * dependency: the token carries its own expiry and an HMAC-SHA256 signature
 * (Web Crypto), so the middleware and the server can both check it.
 *
 * Server-only. It reads `ADMIN_EMAIL`, `ADMIN_PASSWORD` and
 * `ADMIN_SESSION_SECRET`, none of which may ever reach the browser (§17).
 */

export const SESSION_COOKIE = "flayerx_admin_session";

/** How long a sign-in lasts before the admin has to sign in again. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/** A shorter secret makes the signature guessable. */
const MIN_SECRET_LENGTH = 32;

const sessionPayloadSchema = z.object({
  sub: z.email(),
  exp: z.number(),
});

export type AdminSession = z.infer<typeof sessionPayloadSchema>;

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `ADMIN_SESSION_SECRET must be set and at least ${MIN_SECRET_LENGTH} characters`,
    );
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return toBase64Url(new Uint8Array(signature));
}

/**
 * Compares two strings in time that doesn't depend on where they first differ, so
 * a wrong guess can't be refined by timing the response.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

/**
 * Whether the submitted credentials are the admin's. Both sides are signed first,
 * so the comparison is between equal-length digests and leaks nothing about the
 * real password's length.
 */
export async function credentialsMatch(
  email: string,
  password: string,
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  const [givenEmail, realEmail, givenPassword, realPassword] =
    await Promise.all([
      sign(email.trim().toLowerCase()),
      sign(adminEmail.trim().toLowerCase()),
      sign(password),
      sign(adminPassword),
    ]);

  // Both checks always run, so a wrong email takes as long as a wrong password.
  const emailMatches = constantTimeEqual(givenEmail, realEmail);
  const passwordMatches = constantTimeEqual(givenPassword, realPassword);
  return emailMatches && passwordMatches;
}

/** A new session token for the given admin, valid for `SESSION_MAX_AGE_SECONDS`. */
export async function createSessionToken(email: string): Promise<string> {
  const payload: AdminSession = {
    sub: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${body}.${await sign(body)}`;
}

/**
 * The session a token carries, or null if it's missing, tampered with, malformed
 * or expired. Never throws for a bad token: a bad token is just "signed out".
 */
export async function verifySessionToken(
  token: string | undefined,
): Promise<AdminSession | null> {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  if (!constantTimeEqual(signature, await sign(body))) return null;

  try {
    const payload = sessionPayloadSchema.parse(JSON.parse(fromBase64Url(body)));
    return payload.exp > Date.now() / 1000 ? payload : null;
  } catch {
    // A signed body that isn't a valid payload can only come from an older token
    // format; it's treated as signed out, which is the safe outcome.
    return null;
  }
}
