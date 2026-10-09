import { z } from "zod";
import { getSql } from "@/lib/db";
import {
  messageStatusSchema,
  type ContactFormValues,
  type MessageStatus,
} from "@/lib/validations";

/**
 * Contact messages: saved by the contact endpoint, read and updated by the admin
 * dashboard. Server-only; everything here goes through `getSql`.
 */

/** How many messages the dashboard lists at once, newest first. */
const LIST_LIMIT = 100;

/** What the stats show for a message sent without a project type. */
const UNSPECIFIED_TYPE = "Not specified";

/**
 * Creates the table the first time it's needed, once per server instance, so a
 * new database works with no manual setup step. Every statement is idempotent.
 */
let ready: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  ready ??= (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL,
        project_type text,
        message text NOT NULL,
        status text NOT NULL DEFAULT 'new'
          CHECK (status IN ('new', 'read', 'replied')),
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
        ON contact_messages (created_at DESC)
    `;
  })().catch((error: unknown) => {
    // Let the next request try again instead of caching the failure forever.
    ready = null;
    throw error;
  });

  return ready;
}

/**
 * A row as the dashboard uses it. Parsed rather than asserted: the database is
 * outside the type system, so its rows are checked at the boundary (§11.2).
 */
const messageRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  project_type: z.string().nullable(),
  message: z.string(),
  status: messageStatusSchema,
  created_at: z.coerce.date(),
});

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  message: string;
  status: MessageStatus;
  createdAt: Date;
}

function toMessage(row: unknown): ContactMessage {
  const parsed = messageRowSchema.parse(row);
  return {
    id: parsed.id,
    name: parsed.name,
    email: parsed.email,
    projectType: parsed.project_type,
    message: parsed.message,
    status: parsed.status,
    createdAt: parsed.created_at,
  };
}

/** Stores a validated contact submission as a new, unread message. */
export async function saveContactMessage(
  values: ContactFormValues,
): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO contact_messages (name, email, project_type, message)
    VALUES (${values.name}, ${values.email}, ${values.projectType ?? null}, ${values.message})
  `;
}

/** The newest messages, optionally only those with one status. */
export async function listContactMessages(
  status?: MessageStatus,
): Promise<ContactMessage[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = status
    ? await sql`
        SELECT * FROM contact_messages
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${LIST_LIMIT}
      `
    : await sql`
        SELECT * FROM contact_messages
        ORDER BY created_at DESC
        LIMIT ${LIST_LIMIT}
      `;
  return rows.map(toMessage);
}

export interface ContactStats {
  total: number;
  unread: number;
  lastSevenDays: number;
  byProjectType: { type: string; count: number }[];
}

const countsSchema = z.object({
  total: z.coerce.number(),
  unread: z.coerce.number(),
  last_seven_days: z.coerce.number(),
});

const typeCountSchema = z.object({
  type: z.string().nullable(),
  count: z.coerce.number(),
});

/** The dashboard's headline numbers. The two queries are independent, so they run together. */
export async function getContactStats(): Promise<ContactStats> {
  await ensureSchema();
  const sql = getSql();
  const [countRows, typeRows] = await Promise.all([
    sql`
      SELECT
        count(*) AS total,
        count(*) FILTER (WHERE status = 'new') AS unread,
        count(*) FILTER (WHERE created_at > now() - interval '7 days') AS last_seven_days
      FROM contact_messages
    `,
    sql`
      SELECT project_type AS type, count(*) AS count
      FROM contact_messages
      GROUP BY project_type
      ORDER BY count(*) DESC
    `,
  ]);

  const counts = countsSchema.parse(countRows[0]);

  return {
    total: counts.total,
    unread: counts.unread,
    lastSevenDays: counts.last_seven_days,
    byProjectType: typeRows.map((row) => {
      const parsed = typeCountSchema.parse(row);
      return { type: parsed.type ?? UNSPECIFIED_TYPE, count: parsed.count };
    }),
  };
}

/** Moves one message to a new status. Returns false if no such message exists. */
export async function setMessageStatus(
  id: string,
  status: MessageStatus,
): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    UPDATE contact_messages SET status = ${status}
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
