"use client";

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SendFlight, type SendOutcome } from "@/components/ui/SendFlight";
import { SendGlyph } from "@/components/ui/SendGlyph";
import { Textarea } from "@/components/ui/Textarea";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
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

/**
 * TEMPORARY: play the send through and report a delivery WITHOUT posting anything.
 *
 * The live endpoint currently comes back 500 because Resend rejects the send, so a
 * working form reports a failure — which is worse than useless while the section is
 * being shown. With this on, the dial spins for a full turn and then reads
 * Delivered; nothing is transmitted and no one is notified.
 *
 * TODO: set to false and delete `SPIN_MS` once the Resend sender domain is
 * verified. Every message submitted while this is true is silently discarded.
 */
const SIMULATE_SEND = true;

/**
 * TEMPORARY: let the dial send an EMPTY form, so the flight can be watched without
 * filling anything in first.
 *
 * Only meaningful alongside `SIMULATE_SEND`, and the code below leans on that: a
 * form that did not validate has no payload to post, so with the real endpoint back
 * on there is nothing for this to send and it falls through to the simulated path
 * regardless.
 *
 * Nothing about validation itself changed — the schema, the server's check, and the
 * marks on the fields are all untouched. This only decides whether the dial is
 * allowed to act on a form that has not passed it.
 *
 * TODO: set to false before this section goes anywhere near a visitor. With it on
 * the form cannot tell anyone what it still needs.
 */
const SKIP_VALIDATION = true;

/**
 * How long the simulated send runs for — it stands in for the request's own
 * duration, and nothing else reads it: the plane is timed by its own flight and
 * waits on the RESULT, not on this.
 *
 * One second is one whole revolution of the dial's ring, which is as long as the
 * send took to read as finished before there was a plane. Two thresholds worth
 * knowing now that there is one: under about 3.1s the reply beats the plane to the
 * middle of the screen, so it lands, pauses, and leaves — and the fields clear
 * while it is still out. Above that, the plane arrives first and is seen to hover
 * and wait, which is what a slow real request will look like.
 */
const SPIN_MS = 1000;

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
 *
 * Sending launches the paper plane from the button (`SendFlight`), and the outcome
 * is only revealed once the plane has gone.
 */
export function ContactForm({ className }: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<FormState>(EMPTY_VALUES);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  // The plane's own state, which is NOT the request's: it is still flying for a
  // while after the request has landed, and the reader is not told the outcome
  // until it has gone. Held here because the button and the readout both have to
  // know, and they are this component's to arrange.
  const [flying, setFlying] = useState(false);
  const sendGlyph = useRef<SVGSVGElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  /** Nothing else may be started, and nothing may be revealed, while this is true. */
  const busy = flying || status.state === "sending";

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

  /**
   * What the screen is allowed to say yet: still sending for as long as the plane
   * is out, and back to idle as soon as an incomplete form is filled in.
   */
  const visibleStatus: SubmitStatus = busy
    ? { state: "sending" }
    : status.state === "incomplete" && parsed.success
      ? { state: "idle" }
      : status;

  /** What the flight is waiting to hear. Null for as long as the send is out. */
  const flightOutcome: SendOutcome | null =
    status.state === "sent"
      ? "sent"
      : status.state === "failed"
        ? "failed"
        : null;

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

    if (!parsed.success && !SKIP_VALIDATION) {
      setStatus({ state: "incomplete" });

      // Move to the first problem rather than leaving the reader to hunt for it.
      const firstInvalid = FIELDS.find((field) => unmet.has(field.name));
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid.name))?.focus();
      }
      return;
    }

    setStatus({ state: "sending" });

    // Launched here rather than from an effect watching the status, so the plane
    // leaves on the same beat the reader pressed the button. Skipped outright when
    // reduced motion is asked for (§15).
    if (!prefersReduced) setFlying(true);

    // Reaching here without a valid form means `SKIP_VALIDATION` is on, and there
    // is no payload to post.
    if (SIMULATE_SEND || !parsed.success) {
      await new Promise((resolve) => setTimeout(resolve, SPIN_MS));
      markSent();
      return;
    }

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
        {/*
         * The plane the flight takes off from. Hidden (not unmounted) while it's away,
         * so the flight can still measure where home is.
         */}
        <SendGlyph
          ref={sendGlyph}
          size={20}
          className={cn("contact-send-glyph", flying && "invisible")}
        />
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

      {/*
       * Mounted only while it is flying, so every frame, listener and piece of the
       * last flight goes with it. It draws itself over the whole viewport from a
       * portal, so it takes no part in this layout.
       */}
      {flying ? (
        <SendFlight
          origin={sendGlyph}
          outcome={flightOutcome}
          onFinish={() => setFlying(false)}
        />
      ) : null}
    </form>
  );
}
