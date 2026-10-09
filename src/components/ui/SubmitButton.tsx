"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/Button";

export type SubmitButtonProps = Omit<ButtonProps, "type" | "loading">;

/**
 * A form's submit button that shows the spinner and blocks repeat presses while the
 * form's Server Action is running, so the same action can't be fired twice (§13).
 * It reads that state from the enclosing `<form>`, so it must be rendered inside one.
 */
export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return <Button {...props} type="submit" loading={pending} />;
}
