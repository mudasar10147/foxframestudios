"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SendGlyph } from "@/components/ui/SendGlyph";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import {
  contactResponseSchema,
  contactSchema,
  PROJECT_TYPES,
  type ContactFormValues,
  type ProjectType,
} from "@/lib/validations";

export type SubmitStatus =
  | { state: "idle" }
  /** Held back: the form is not filled in well enough to send yet. */
  | { state: "incomplete" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "failed"; message: string };

/**
 * What the fields hold while being edited. The same as the schema's values, except
 * that an unchosen project type is an empty string (what a `<select>` reports)
 * rather than missing.
 */
type FormState = Omit<ContactFormValues, "projectType"> & {
  projectType: ProjectType | "";
};

type FieldName = keyof FormState;

const EMPTY_VALUES: FormState = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

const PROJECT_OPTIONS = PROJECT_TYPES.map((type) => ({
  value: type,
  label: type,
}));

/** Shown under the button while there's no outcome to report. */
const REPLY_NOTE = "We'll reply within two working days.";

/** Shown when the failure came back with nothing we can repeat to the reader. */
const FALLBACK_ERROR = "Could not send your message. Please try again.";

interface FieldSpec {
  name: FieldName;
  /** The accessible label. On screen the placeholder says the same thing. */
  label: string;
  placeholder: string;
  kind: "input" | "select" | "textarea";
  autoComplete?: string;
  type?: "text" | "email";
  /** Spans both columns on wider screens instead of sharing a row. */
  wide?: boolean;
}

const FIELDS: readonly FieldSpec[] = [
  {
    name: "name",
    label: "Your Name",
    placeholder: "Your Name",
    kind: "input",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Your Email",
    placeholder: "Your Email",
    kind: "input",
    autoComplete: "email",
    type: "email",
  },
  {
    name: "projectType",
    label: "Project Type",
    placeholder: "Project Type",
    kind: "select",
    wide: true,
  },
  {
    name: "message",
    label: "Your Message",
    placeholder: "Your Message",
    kind: "textarea",
    wide: true,
  },
];

export interface ContactFormProps {
  className?: string;
}

/**
 * The contact form: a glass card titled "Send us a message", with name and email
 * side by side, a project type, a message, and one wide send button.
 *
 * Validation runs against `contactSchema`, the SAME schema the route handler
 * checks the request with, so the two sides can never disagree about what counts
 * as a valid message (§9.5). The client check is courtesy; the server's is the
 * boundary that matters.
 */
export function ContactForm({ className }: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<FormState>(EMPTY_VALUES);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  /** Nothing else may be started while this is true. */
  const busy = status.state === "sending";

  // Derived during render, never stored: errors held in state would go stale the
  // moment a keystroke changed the values they were computed from (§12.1). An
  // unchosen project type is left out rather than sent as "", which the schema
  // would reject.
  const parsed = contactSchema.safeParse({
    ...values,
    projectType: values.projectType || undefined,
  });

  const unmet = new Set<string>();

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") unmet.add(field);
    }
  }

  const fieldId = (name: FieldName) => `${formId}-${name}`;

  // Nothing is marked until a send has actually been refused. Tabbing through an
  // empty form is not a mistake.
  const blocked =
    status.state === "incomplete"
      ? FIELDS.filter((field) => unmet.has(field.name)).map(
          (field) => field.label,
        )
      : [];

  /** Back to idle as soon as an incomplete form is filled in. */
  const visibleStatus: SubmitStatus =
    status.state === "incomplete" && parsed.success
      ? { state: "idle" }
      : status;

  /** The tail of every successful send: confirm it, then clear the fields. */
  const markSent = () => {
    setStatus({ state: "sent" });
    setValues(EMPTY_VALUES);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Never fire the same send twice — the button is disabled while in flight, but
    // Enter in a text field would otherwise get past it (§13).
    if (busy) return;

    if (!parsed.success) {
      setStatus({ state: "incomplete" });

      // Move to the first problem rather than leaving the reader to hunt for it.
      const firstInvalid = FIELDS.find((field) => unmet.has(field.name));
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid.name))?.focus();
      }
      return;
    }

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      // The body crosses a trust boundary, so it is parsed rather than asserted —
      // a failed response with no JSON at all is a normal outcome here (§11.2).
      const body = contactResponseSchema.safeParse(
        await response.json().catch(() => null),
      );
      const reason = body.success ? body.data.error : undefined;

      if (!response.ok) {
        setStatus({ state: "failed", message: reason ?? FALLBACK_ERROR });
        return;
      }

      markSent();
    } catch (error) {
      // The request never landed, so there is no server message to pass on. Log
      // the cause and tell the reader the one thing they can act on (§13).
      console.error("Contact form request failed:", error);
      setStatus({ state: "failed", message: FALLBACK_ERROR });
    }
  };

  const outcome =
    visibleStatus.state === "sent"
      ? "Message sent. We'll come back within two working days."
      : visibleStatus.state === "failed"
        ? visibleStatus.message
        : blocked.length > 0
          ? `Not sent — still needed: ${blocked.join(", ")}.`
          : null;

  const update =
    (name: FieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [name]: event.target.value }));

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("glass-card hover-reveal-scope p-6 sm:p-10", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-text-primary text-lg font-bold tracking-wide uppercase">
          Send Us a Message
        </h3>
        <SendGlyph
          size={22}
          className="contact-card-plane text-accent-primary"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = fieldId(field.name);
          const shared = {
            name: field.name,
            value: values[field.name],
            onChange: update(field.name),
            disabled: busy,
          };

          return (
            <FormField
              key={field.name}
              id={id}
              label={field.label}
              hideLabel
              invalid={blocked.includes(field.label)}
              className={cn(field.wide && "sm:col-span-2")}
            >
              {(wiring) =>
                field.kind === "select" ? (
                  <Select
                    {...wiring}
                    name={field.name}
                    value={values.projectType}
                    onValueChange={(projectType) =>
                      setValues((current) => ({ ...current, projectType }))
                    }
                    disabled={busy}
                    size="lg"
                    placeholder={field.placeholder}
                    options={PROJECT_OPTIONS}
                  />
                ) : field.kind === "textarea" ? (
                  <Textarea
                    {...wiring}
                    {...shared}
                    size="lg"
                    rows={5}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    {...wiring}
                    {...shared}
                    size="lg"
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                  />
                )
              }
            </FormField>
          );
        })}
      </div>

      <Button
        type="submit"
        variant="glow"
        size="lg"
        disabled={busy}
        aria-busy={busy || undefined}
        className="contact-send mt-6 h-16 w-full justify-center gap-3 font-bold tracking-widest uppercase"
      >
        {busy ? "Sending…" : "Send Message"}
        <SendGlyph size={20} className="contact-send-glyph" />
      </Button>

      {/*
       * Rendered empty rather than conditionally: a live region has to be in the
       * document BEFORE its text arrives, or the arrival is never announced. The
       * reserved height also keeps the outcome from shifting the page (§16).
       */}
      <p
        aria-live="polite"
        className={cn(
          "mt-4 min-h-5 text-center text-sm",
          visibleStatus.state === "sent"
            ? "text-status-success"
            : outcome
              ? "text-accent-primary"
              : "text-text-secondary",
        )}
      >
        {outcome ?? REPLY_NOTE}
      </p>
    </form>
  );
}
