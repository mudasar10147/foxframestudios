import type { Metadata } from "next";
import { ContactForm } from "@/components/domain/ContactForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about the project and we will come back within two working days.",
};

export default function ContactPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Start a project"
        title="Contact"
        description="Tell us about the project and we will come back within two working days."
      />

      <ContactForm className="mt-12" />
    </Container>
  );
}
