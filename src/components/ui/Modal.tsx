"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  /** Called when the reader asks to close: Escape, or a click outside the content. */
  onClose: () => void;
  /** The dialog's accessible name, e.g. "Void Abilities preview". */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * A modal dialog over the page, built on the native `<dialog>` element. Opened with
 * `showModal()`, the browser itself traps focus inside, makes the page behind it
 * inert, and returns focus to whatever opened it on close (§15). This adds closing
 * on Escape and on a click outside the content, both routed through `onClose` so
 * the parent stays in charge of `open`.
 */
export function Modal({
  open,
  onClose,
  label,
  className,
  children,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Keeps the native dialog in step with `open`: it's the browser's own state, so
  // syncing to it is what an effect is for (§12.3).
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label={label}
      // Escape: let the parent decide, rather than the browser closing it behind
      // React's back and leaving `open` out of step.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // A click on the dialog element itself (not its content) is on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn("modal", className)}
    >
      {children}
    </dialog>
  );
}
