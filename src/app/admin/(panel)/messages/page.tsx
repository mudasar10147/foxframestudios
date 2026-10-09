import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { ROUTES } from "@/constants/routes";
import { AdminLoadError, MessageCard, MessageFilters } from "@/features/admin";
import { requireAdmin } from "@/lib/admin-session";
import {
  listContactMessages,
  type ContactMessage,
} from "@/lib/contact-messages";
import { messageStatusSchema } from "@/lib/validations";

export const metadata: Metadata = {
  title: "Messages",
};

interface MessagesPageProps {
  searchParams: Promise<{ status?: string | string[] }>;
}

/** What the list says when it's empty, by filter. */
const EMPTY_COPY = {
  all: {
    title: "No messages yet",
    description:
      "When someone sends the contact form, their message appears here.",
  },
  filtered: {
    title: "Nothing here",
    description: "No messages have this status right now.",
  },
};

export default async function AdminMessagesPage({
  searchParams,
}: MessagesPageProps) {
  await requireAdmin();

  // The filter comes from the URL, so it's checked rather than trusted (§11.2).
  const { status: rawStatus } = await searchParams;
  const parsedStatus = messageStatusSchema.safeParse(rawStatus);
  const status = parsedStatus.success ? parsedStatus.data : undefined;

  let messages: ContactMessage[] | null = null;
  try {
    messages = await listContactMessages(status);
  } catch (error) {
    console.error("Admin messages page could not load messages:", error);
  }

  const empty = status ? EMPTY_COPY.filtered : EMPTY_COPY.all;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <PageHeader
          title="Messages"
          description="Everything sent through the contact form, newest first."
        />
        <MessageFilters active={status} />
      </div>

      <div className="mt-8">
        {messages === null ? (
          <AdminLoadError retryHref={ROUTES.adminMessages} />
        ) : messages.length === 0 ? (
          <EmptyState
            icon="mail"
            title={empty.title}
            description={empty.description}
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((message) => (
              <li key={message.id}>
                <MessageCard message={message} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
