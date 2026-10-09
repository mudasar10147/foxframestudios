import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contact-messages";
import { getResendClient } from "@/lib/resend";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

/**
 * Emails the studio about a new message. Best effort: the message is already
 * saved, so a missing recipient or a Resend failure is logged, not reported to
 * the visitor, whose message did arrive.
 */
async function notifyByEmail({
  name,
  email,
  projectType,
  message,
}: ContactFormValues): Promise<void> {
  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.warn("CONTACT_EMAIL is not set; skipped the new-message email.");
    return;
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      // TODO: replace onboarding@resend.dev with an address on the studio's own
      // domain once it's verified in Resend; the shared sender is rate-limited.
      from: "FlayerX Studio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType ?? "Not specified"}\n\n${message}`,
    });
    if (error) console.error("Resend rejected the new-message email:", error);
  } catch (error) {
    console.error("New-message email failed:", error);
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Saving is what counts: once the message is stored, the studio will see it on
  // the admin dashboard whatever happens to the email below.
  try {
    await saveContactMessage(parsed.data);
  } catch (error) {
    console.error("Could not save contact message:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  await notifyByEmail(parsed.data);

  return NextResponse.json({ ok: true });
}
