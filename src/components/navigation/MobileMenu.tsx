"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { navItems } from "@/constants/site";
import { durations, easing } from "@/lib/motion";
import { NavLink } from "./NavLink";
import { CTAButton } from "./CTAButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          key="mobile-menu"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: durations.normal, ease: easing.luxury }}
          className="lg:hidden"
        >
          <Container size="wide" className="px-6 pb-4">
            <nav
              ref={panelRef}
              aria-label="Mobile"
              className="flex flex-col gap-4 rounded-lg border border-border-glass bg-surface p-6 backdrop-blur-[var(--blur-nav)]"
            >
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      onClick={onClose}
                      className="text-body"
                    />
                  </li>
                ))}
              </ul>
              <CTAButton fullWidth size="md" onClick={onClose} />
            </nav>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
