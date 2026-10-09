import { CopyButton } from "@/components/ui/CopyButton";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatusPill, type StatusTone } from "@/components/ui/StatusPill";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ContactMessage } from "@/lib/contact-messages";
import { formatDateTime } from "@/lib/format";
import { MESSAGE_STATUSES, type MessageStatus } from "@/lib/validations";
import { updateMessageStatusAction } from "../actions";

const statusStyles: Record<
  MessageStatus,
  { label: string; tone: StatusTone; pulse: boolean; action: string }
> = {
  new: { label: "New", tone: "warning", pulse: true, action: "Mark as new" },
  read: {
    label: "Read",
    tone: "neutral",
    pulse: false,
    action: "Mark as read",
  },
  replied: {
    label: "Replied",
    tone: "success",
    pulse: false,
    action: "Mark as replied",
  },
};

/** The subject line a reply opens with. */
const REPLY_SUBJECT = "Re: your enquiry to FlareX Studio";

export interface MessageCardProps {
  message: ContactMessage;
}

/**
 * One contact message on the admin dashboard: who sent it and when, their email
 * with ways to reply or copy it, the project type, the message itself, and buttons
 * to move it between New, Read and Replied.
 */
export function MessageCard({ message }: MessageCardProps) {
  const status = statusStyles[message.status];
  const replyHref = `mailto:${message.email}?subject=${encodeURIComponent(REPLY_SUBJECT)}`;
  const otherStatuses = MESSAGE_STATUSES.filter(
    (candidate) => candidate !== message.status,
  );

  return (
    <article className="glass-card p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-text-primary truncate text-lg font-bold">
            {message.name}
          </h3>
          <p className="text-text-muted mt-0.5 text-xs">
            <time dateTime={message.createdAt.toISOString()}>
              {formatDateTime(message.createdAt)}
            </time>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message.projectType ? <Badge>{message.projectType}</Badge> : null}
          <StatusPill tone={status.tone} pulse={status.pulse}>
            {status.label}
          </StatusPill>
        </div>
      </header>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${message.email}`}
          className="text-accent-primary hover:text-accent-strong focus-visible:ring-accent-primary rounded text-sm break-all focus-visible:ring-2 focus-visible:outline-none"
        >
          {message.email}
        </a>
        <CopyButton value={message.email} label={`Copy ${message.email}`} />
      </div>

      <p className="text-text-secondary mt-4 text-sm leading-relaxed whitespace-pre-wrap">
        {message.message}
      </p>

      <footer className="border-border-default mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
        {/* A plain anchor: `mailto:` opens the mail app, it isn't a route (§10.4). */}
        <a
          href={replyHref}
          className={buttonStyles({ variant: "primary", size: "sm" })}
        >
          <Icon name="mail" />
          Reply by email
        </a>

        {otherStatuses.map((next) => (
          <form key={next} action={updateMessageStatusAction}>
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="status" value={next} />
            <SubmitButton variant="outline" size="sm">
              {statusStyles[next].action}
            </SubmitButton>
          </form>
        ))}
      </footer>
    </article>
  );
}
