"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NavLink } from "@/components/ui/NavLink";
import { StatusPill } from "@/components/ui/StatusPill";
import { siteConfig, navItems } from "@/constants/site";

/**
 * Disclosure (not a modal): the panel expands in flow beneath the bar, so a focus trap
 * is not required — Tab continues naturally into the revealed links. Escape closes and
 * returns focus to the trigger.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="lg:hidden"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none">
          <path
            d={isOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </Button>

      {isOpen ? (
        <div
          id={panelId}
          className="border-border-default w-full basis-full border-t pt-5 pb-9 lg:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} onNavigate={() => setIsOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-border-default mt-5 flex flex-col gap-4 border-t pt-5">
            <StatusPill pulse>{siteConfig.availability}</StatusPill>
            <ButtonLink
              href={siteConfig.cta.href}
              variant="outline"
              size="sm"
              className="w-fit"
            >
              {siteConfig.cta.label}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
