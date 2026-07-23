"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durations, easing } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { navItems } from "@/constants/site";
import { useScrolled } from "@/hooks/useScrolled";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { NavIndicator } from "./NavIndicator";
import { MenuButton } from "./MenuButton";
import { CTAButton } from "./CTAButton";
import { MobileMenu } from "./MobileMenu";
import { ScrollProgress } from "./ScrollProgress";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(16);
  const prefersReducedMotion = useReducedMotion();

  const pathname = usePathname();

  return (
    <header className="z-navbar sticky top-0 w-full">
      <ScrollProgress />

      <Container
        size="wide"
        className={cn("transition-navbar px-6", scrolled ? "py-2" : "py-4")}
      >
        <motion.nav
          aria-label="Primary"
          initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: durations.slow,
            ease: easing.luxury,
            delay: 0.1,
          }}
          className={cn(
            "transition-navbar flex items-center justify-between rounded-lg border border-border-glass px-6 backdrop-blur-[var(--blur-nav)]",
            scrolled
              ? "bg-surface/80 py-2.5 shadow-floating"
              : "bg-glass-surface py-3.5",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href} className="relative py-1">
                  <NavLink href={item.href} label={item.label} active={isActive} />
                  {isActive ? <NavIndicator /> : null}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <CTAButton />
          </div>

          <MenuButton
            open={mobileOpen}
            onToggle={() => setMobileOpen((open) => !open)}
            controls="mobile-menu"
          />
        </motion.nav>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
