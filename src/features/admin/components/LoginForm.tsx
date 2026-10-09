"use client";

import { useActionState, useId } from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginAction, type LoginState } from "../actions";

const INITIAL_STATE: LoginState = { error: null, email: "" };

/**
 * The admin sign-in form. Posts to `loginAction`, which checks the credentials on
 * the server; on success the server sets the session and redirects to the
 * dashboard, so this only ever has an error to show.
 */
export function LoginForm() {
  const id = useId();
  const [state, formAction, isPending] = useActionState(
    loginAction,
    INITIAL_STATE,
  );
  const errorId = `${id}-error`;

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField id={`${id}-email`} label="Email">
        {(wiring) => (
          <Input
            {...wiring}
            name="email"
            type="email"
            // Restored after each attempt, so a wrong password doesn't clear it.
            defaultValue={state.email}
            autoComplete="username"
            required
            size="lg"
            aria-describedby={state.error ? errorId : undefined}
          />
        )}
      </FormField>

      <FormField id={`${id}-password`} label="Password">
        {(wiring) => (
          <Input
            {...wiring}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            size="lg"
            aria-describedby={state.error ? errorId : undefined}
          />
        )}
      </FormField>

      {/* Always rendered, so the error is announced when it arrives (§15). */}
      <p
        id={errorId}
        role="alert"
        className="text-status-error min-h-5 text-sm"
      >
        {state.error}
      </p>

      <Button
        type="submit"
        variant="glow"
        size="lg"
        loading={isPending}
        className="w-full justify-center font-bold tracking-widest uppercase"
      >
        Sign in
      </Button>
    </form>
  );
}
