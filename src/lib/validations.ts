import { z } from "zod";

/**
 * What a contact enquiry can be about. One list, read by the form's dropdown and
 * checked by the server, so the two can't offer or accept different options (§14).
 */
export const PROJECT_TYPES = [
  "Game UI / UX",
  "Scripting",
  "3D Modeling",
  "Visual Effects",
  "Full Game",
  "Other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  /** Optional, so a request without it (the payload before this field) still passes. */
  projectType: z.enum(PROJECT_TYPES).optional(),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/**
 * What `POST /api/contact` answers with — `{ ok: true }` on success, `{ error }`
 * on every failure it handles. Kept beside the request schema so the two ends of
 * that endpoint cannot drift apart (§14).
 */
export const contactResponseSchema = z.object({
  ok: z.literal(true).optional(),
  error: z.string().optional(),
});
