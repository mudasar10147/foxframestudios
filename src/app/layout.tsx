import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/constants/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b10",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      {/*
        Browser extensions (Grammarly, password managers, translators) inject
        attributes onto <body> before React hydrates, which the server never rendered.
        `suppressHydrationWarning` only applies to THIS element's own attributes — it
        does not reach its children — so a genuine mismatch anywhere in the app still
        reports. That is what makes it safe here and wrong almost everywhere else (§10.5).
      */}
      <body
        suppressHydrationWarning
        className="bg-background-primary text-text-primary font-sans antialiased"
      >
        <a
          href="#main-content"
          className="focus:bg-surface-elevated focus:text-text-primary focus:ring-accent-primary sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-60 focus:rounded-lg focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
        >
          Skip to content
        </a>

        <div className="relative flex min-h-dvh flex-col">
          <div
            aria-hidden
            className="texture-dots pointer-events-none absolute inset-0 opacity-40"
          />
          <Navbar />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
