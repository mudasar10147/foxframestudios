import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";
import { ValidationMessage } from "./ValidationMessage";

type FormFieldProps = {
  /** Must match the control's id for label association. */
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function FormField({
  htmlFor,
  label,
  required,
  error,
  description,
  className,
  children,
}: FormFieldProps) {
  const describedById = description ? `${htmlFor}-description` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {description ? (
        <p id={describedById} className="text-caption text-text-muted">
          {description}
        </p>
      ) : null}
      {children}
      <ValidationMessage id={`${htmlFor}-error`}>{error}</ValidationMessage>
    </div>
  );
}
