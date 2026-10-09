import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * The public site's chrome: the header, the page, the footer. A route group, so
 * `(site)` isn't part of any URL; the admin panel sits outside it and so gets none
 * of this.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
