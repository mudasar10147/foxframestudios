export const siteConfig = {
  name: "FoxDevs Studio",
  title: "FoxDevs Studio | Roblox Game UI Design & Scripting",
  description:
    "Premium Roblox game UI — from pixel-perfect interface design to clean, responsive Luau scripting.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
