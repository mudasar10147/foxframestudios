"use client";

import { ArrowUp } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";

export function BackToTop() {
  function handleClick() {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <IconButton
      aria-label="Back to top"
      variant="secondary"
      icon={<ArrowUp size={18} aria-hidden="true" />}
      onClick={handleClick}
    />
  );
}
