import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { Reveal } from "@/components/shared/Reveal";
import { SocialLinks } from "@/components/social/SocialLinks";
import {
  contactContent,
  contactEmail,
  orderContent,
  socialLinks,
} from "@/constants/content";
import { ContactForm } from "./contact/ContactForm";

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-title" className="relative overflow-hidden">
      <SectionBackground glow />

      <Container size="content" className="relative z-10 flex flex-col gap-12">
        <SectionHeader
          id="contact-title"
          label={contactContent.label}
          title={contactContent.title}
          description={contactContent.description}
          align="center"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal variant="right" className="flex flex-col gap-6">
            <a
              href={orderContent.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card transition-button flex items-center gap-4 p-5 hover:-translate-y-0.5 hover:shadow-floating"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border-glow bg-accent-primary text-text-primary shadow-purple-glow">
                <MessageCircle size={26} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-h4 text-text-primary">
                  Join the Discord
                </span>
                <span className="text-body-sm text-text-muted">
                  Fastest way to reach me — and where all orders are placed.
                </span>
              </span>
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="ml-auto shrink-0 text-accent-primary transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <p className="text-body-lg text-text-secondary">
              Prefer email or socials? Reach out through whichever channel suits
              you best — I read everything.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-button transition-icon inline-flex w-fit items-center gap-2 text-accent-primary"
            >
              <Mail size={18} aria-hidden="true" />
              {contactEmail}
            </a>
            <SocialLinks links={socialLinks} size="lg" />
          </Reveal>

          <Reveal variant="left">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
