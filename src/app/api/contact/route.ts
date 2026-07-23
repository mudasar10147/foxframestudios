import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/resend";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_EMAIL;

  if (!to) {
    console.error("CONTACT_EMAIL is not defined — cannot deliver contact form.");
    return NextResponse.json(
      { error: "Contact form is not configured. Please try Discord instead." },
      { status: 500 },
    );
  }

  const { name, email, message } = parsed.data;

  try {
    const resend = getResendClient();

    const { error } = await resend.emails.send({
      // Resend's shared sender; swap for an address on your own verified domain.
      from: "FoxDevs Studio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend rejected the contact email:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try Discord instead." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try Discord instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
