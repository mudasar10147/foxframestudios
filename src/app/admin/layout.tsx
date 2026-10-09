import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/constants/site";

/** Admin pages are private: kept out of search results, with their own title. */
export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: `%s | Admin | ${siteConfig.name}`,
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
