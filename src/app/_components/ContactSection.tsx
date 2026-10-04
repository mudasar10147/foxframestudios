import {
  ContactDetails,
  type ContactDetail,
} from "@/components/domain/ContactDetails";
import { ContactForm } from "@/components/domain/ContactForm";
import { Container } from "@/components/layout/Container";
import { Rise } from "@/components/shared/Rise";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/constants/site";

const DETAILS: readonly ContactDetail[] = [
  {
    id: "response",
    icon: "bolt",
    title: "Fast Response",
    body: "We usually get back to you within two working days.",
  },
  {
    id: "email",
    icon: "mail",
    title: "Contact Email",
    body: (
      <a
        href={`mailto:${siteConfig.contactEmail}`}
        className="hover:text-accent-primary focus-visible:ring-accent-primary rounded transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {siteConfig.contactEmail}
      </a>
    ),
  },
  {
    id: "discussion",
    icon: "gamepad",
    title: "Project Discussion",
    body: "Games, partnerships, publishing and more. Let's talk!",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <Container>
        <Rise trigger="in-view">
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Talk"
            description="Have a project in mind? We'd love to hear about it and explore how we can build something great together."
            align="center"
          />
        </Rise>

        {/* Only the form itself is a client component — the heading, the details
            and the layout around them stay on the server (§10.1). */}
        <div className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-12">
          <Rise trigger="in-view" delay={90} className="h-full">
            <ContactDetails
              eyebrow="Work Together"
              heading="Good games start with a conversation."
              details={DETAILS}
              className="h-full"
            />
          </Rise>

          <Rise trigger="in-view" delay={180} className="h-full">
            <ContactForm className="h-full" />
          </Rise>
        </div>
      </Container>
    </section>
  );
}
