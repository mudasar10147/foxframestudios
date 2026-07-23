import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("text-h4 font-display text-text-primary", className)}
    >
      FoxDevs
    </Link>
  );
}
