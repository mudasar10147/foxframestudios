import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3",
        "focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Image
        src="/brand/logo-mark.webp"
        // Decorative: the link's aria-label already names the studio.
        alt=""
        // The DISPLAY size (24×36, the mark's 2:3 ratio), not the source's 256×384,
        // so Next serves a 32px/64px file for 1x/2x screens rather than the full image.
        width={24}
        height={36}
        // In the header on every page, so it's always above the fold: load it
        // straight away rather than lazily. Not `priority`, which is reserved for
        // the page's LCP image (§9.1).
        loading="eager"
        className="h-9 w-6 shrink-0"
      />

      <span className="flex flex-col leading-[1.05]">
        <span className="text-text-primary text-[0.8rem] font-extrabold tracking-[0.14em]">
          {siteConfig.wordmark.primary}
        </span>
        <span className="text-text-secondary text-[0.8rem] font-extrabold tracking-[0.14em]">
          {siteConfig.wordmark.secondary}
        </span>
      </span>
    </Link>
  );
}
