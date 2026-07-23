"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button, MagneticButton } from "@/components/buttons";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { heroContent, heroStats } from "@/constants/content";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroVisual } from "./hero/HeroVisual";
import { heroContainer, heroItem, heroLine } from "./hero/hero-variants";

function HeadingLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span variants={heroLine} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? "show" : "hidden";

  return (
    <Section
      id="hero"
      labelledBy="hero-title"
      className="flex min-h-dvh items-center overflow-hidden"
    >
      <HeroBackground />

      <Container size="content" className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Content */}
          <motion.div
            variants={heroContainer}
            initial={initial}
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={heroItem}>
              <StatusBadge label={heroContent.badge} tone="available" />
            </motion.div>

            <motion.p
              variants={heroItem}
              className="text-label text-accent-primary"
            >
              {heroContent.intro}
            </motion.p>

            <h1
              id="hero-title"
              className="text-hero-lg text-text-primary text-balance"
            >
              <HeadingLine>{heroContent.greeting}</HeadingLine>
              <HeadingLine>
                <span className="gradient-text-animated">{heroContent.name}</span>
              </HeadingLine>
            </h1>

            <motion.p
              variants={heroItem}
              className="text-body text-text-muted -mt-4"
            >
              {heroContent.role}
            </motion.p>

            <motion.p
              variants={heroItem}
              className="text-h3 text-text-secondary"
            >
              {heroContent.tagline}
            </motion.p>

            <motion.p
              variants={heroItem}
              className="text-body-lg text-text-muted max-w-[var(--reading-width)]"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <MagneticButton>
                <Button
                  href={heroContent.primaryCta.href}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} aria-hidden="true" />}
                >
                  {heroContent.primaryCta.label}
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  href={heroContent.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                >
                  {heroContent.secondaryCta.label}
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.dl
              variants={heroItem}
              className="mt-2 grid w-full grid-cols-3 gap-6 border-t border-border-default pt-6"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-h3 text-text-primary">{stat.value}</dd>
                  <span aria-hidden="true" className="text-body-sm text-text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right: Visual */}
          <HeroVisual />
        </div>
      </Container>

      {/* Scroll cue */}
      {!prefersReducedMotion ? (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-label">Scroll</span>
            <ArrowDown size={16} />
          </motion.span>
        </motion.div>
      ) : null}
    </Section>
  );
}
