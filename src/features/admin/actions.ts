"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { requireAdmin } from "@/lib/admin-session";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  credentialsMatch,
} from "@/lib/auth";
import { setMessageStatus } from "@/lib/contact-messages";
import { adminLoginSchema, messageStatusSchema } from "@/lib/validations";

export interface LoginState {
  error: string | null;
  /**
   * The email that was submitted, handed back so the form can keep it. React
   * resets a form's fields after each action, which would otherwise clear the
   * email along with the wrong password.
   */
  email: string;
}

/** One message for every failure, so the form doesn't reveal which field was wrong. */
const INVALID_LOGIN = "That email and password don't match.";
const UNAVAILABLE =
  "Sign-in isn't available right now. Please try again later.";

/**
 * Signs the admin in. Used with `useActionState`, so it returns an error to show
 * rather than throwing; on success it sets the session cookie and redirects.
 */
export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const submittedEmail = formData.get("email");
  const email = typeof submittedEmail === "string" ? submittedEmail : "";
  const parsed = adminLoginSchema.safeParse({
    email,
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: INVALID_LOGIN, email };

  let token: string;
  try {
    const matches = await credentialsMatch(
      parsed.data.email,
      parsed.data.password,
    );
    if (!matches) return { error: INVALID_LOGIN, email };
    token = await createSessionToken(parsed.data.email);
  } catch (error) {
    // The admin env vars are missing or invalid. Logged with detail for us; the
    // visitor gets a generic message (§2.5).
    console.error("Admin sign-in is misconfigured:", error);
    return { error: UNAVAILABLE, email };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  // Outside the try: `redirect` works by throwing, which the catch would swallow.
  redirect(ROUTES.admin);
}

/** Signs the admin out and returns to the sign-in page. */
export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect(ROUTES.adminLogin);
}

const statusUpdateSchema = z.object({
  id: z.uuid(),
  status: messageStatusSchema,
});

/** Marks a message new, read or replied. Admin only, checked here, not just by the page. */
export async function updateMessageStatusAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const parsed = statusUpdateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    console.error("Rejected a malformed message status update.");
    return;
  }

  try {
    await setMessageStatus(parsed.data.id, parsed.data.status);
  } catch (error) {
    // The dashboard re-reads after this, so a failed update shows as unchanged.
    console.error("Could not update message status:", error);
  }

  // The whole panel: the message list, the dashboard's counts and the sidebar's
  // unread badge all read the statuses.
  revalidatePath(ROUTES.admin, "layout");
}
