"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** How long "Copied" shows before the button reads "Copy" again. */
const CONFIRM_MS = 2000;

export interface CopyButtonProps {
  /** The text to put on the clipboard. */
  value: string;
  /** The accessible name, e.g. "Copy email address". */
  label: string;
}

/**
 * Copies a value to the clipboard and confirms it in place. If the browser refuses
 * (no permission, or an insecure page), it says so instead of failing silently.
 */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [result, setResult] = useState<"idle" | "copied" | "failed">("idle");

  // Drops the confirmation after a moment; cleared if the button goes away first.
  useEffect(() => {
    if (result === "idle") return;
    const timer = setTimeout(() => setResult("idle"), CONFIRM_MS);
    return () => clearTimeout(timer);
  }, [result]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setResult("copied");
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
      setResult("failed");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} aria-label={label}>
      <Icon name={result === "copied" ? "check" : "copy"} />
      {/* Announced as it changes, so a screen reader hears the outcome. */}
      <span aria-live="polite">
        {result === "copied"
          ? "Copied"
          : result === "failed"
            ? "Copy failed"
            : "Copy"}
      </span>
    </Button>
  );
}
