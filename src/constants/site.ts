// Resolve the canonical site URL. Priority:
//   1. NEXT_PUBLIC_SITE_URL — explicit override (set this in Vercel for the real domain).
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain (server-side only).
//   3. localhost — local development fallback.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "FoxDevs Studio",
  title: "FoxDevs Studio | Roblox Game UI Design & Scripting",
  description:
    "Premium Roblox game UI — from pixel-perfect interface design to clean, responsive Luau scripting.",
  url: resolveSiteUrl(),
  ogImage: "/og-image.png",
  creator: "FoxDevs Studio",
  keywords: [
    "Roblox UI",
    "Roblox game UI",
    "Luau scripting",
    "Roblox UI designer",
    "game interface design",
    "Roblox developer",
  ],
} as const;

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
] as const;
