import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Everything a control needs to be tied to its label and its message. */
export interface FieldControl {
  id: string;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
}

export interface FormFieldProps {
  /** Unique on the page — the label's target and the message's id derive from it. */
  id: string;
  label: string;
  /**
   * Keeps the label for assistive technology but hides it visually, for a form
   * whose fields are identified by their placeholders on screen. The label still
   * exists, because a placeholder alone isn't a label (§9.5).
   */
  hideLabel?: boolean;
  /**
   * Marks the control as holding something invalid without saying anything under
   * it — for a form that reports its problems somewhere other than per field.
   */
  invalid?: boolean;
  /** A message shown under the control and announced with it. Implies `invalid`. */
  error?: string;
  className?: string;
  children: (control: FieldControl) => ReactNode;
}

/**
 * A label, a control and a validation message, wired to each other.
 *
 * The children are a function rather than plain nodes because those three ids are
 * the entire point of the component: handing them to the caller to repeat by hand
 * is exactly how a form ends up with a label pointing at nothing (§9.5).
 */
export function FormField({
  id,
  label,
  hideLabel = false,
  invalid = false,
  error,
  className,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const isInvalid = invalid || error !== undefined;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* `pr-8` clears the corner glyph the panel draws behind this. */}
      <label
        htmlFor={id}
        className={
          hideLabel
            ? "sr-only"
            : "text-text-primary pr-10 text-base font-bold tracking-wide uppercase"
        }
      >
        {label}
      </label>

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        {children({
          id,
          "aria-invalid": isInvalid ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
        })}
      </div>

      {/*
       * Only present when there is something to say, so a field that reports
       * elsewhere costs no height at all. A form that does use this and cares about
       * the shift as it appears should reserve the line itself — it cannot be
       * reserved here without charging every caller for it.
       *
       * Lit in the accent rather than a red: the message says what is wrong in
       * words and `aria-invalid` says it programmatically, so the colour is only
       * drawing the eye (WCAG 1.4.1).
       */}
      {error === undefined ? null : (
        <p id={errorId} className="text-accent-primary min-h-4 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
