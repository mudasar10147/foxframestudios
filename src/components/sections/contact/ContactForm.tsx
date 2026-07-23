"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { Button } from "@/components/buttons/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setSendError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setSendError(
          data?.error ?? "Could not send your message. Please try again.",
        );
        return;
      }
    } catch {
      setSendError("Network error — please check your connection and retry.");
      return;
    }

    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="glass-card flex flex-col items-center gap-4 p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-status-success" aria-hidden="true" />
        <h3 className="text-h4 text-text-primary">Message sent</h3>
        <p className="text-body text-text-secondary">
          Thanks for reaching out — I&apos;ll get back to you shortly.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card flex flex-col gap-5 p-6 sm:p-8"
    >
      <FormField htmlFor="name" label="Name" required error={errors.name?.message}>
        <Input
          id="name"
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </FormField>

      <FormField
        htmlFor="email"
        label="Email"
        required
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField
        htmlFor="message"
        label="Message"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </FormField>

      {sendError ? (
        <p role="alert" className="text-body-sm text-status-error">
          {sendError}
        </p>
      ) : null}

      <Button
        type="submit"
        loading={isSubmitting}
        rightIcon={<Send size={16} aria-hidden="true" />}
      >
        Send Message
      </Button>
    </form>
  );
}
