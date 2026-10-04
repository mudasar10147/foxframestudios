import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * The two lockups. `md` is the header's compact one. `lg` is the footer's: a
 * bigger mark, a wordmark that leads with size, STUDIO spaced wide beneath it, and
 * the X picked out in the accent.
 */
const sizeStyles = {
  md: {
    gap: "gap-3",
    // The mark's DISPLAY size at its 2:3 ratio, so Next serves a file that size.
    mark: { width: 24, height: 36, className: "h-9 w-6" },
    primary: "text-[0.8rem] tracking-[0.14em]",
    secondary: "text-[0.8rem] tracking-[0.14em]",
    accentLastLetter: false,
  },
  lg: {
    gap: "gap-5",
    mark: { width: 56, height: 84, className: "h-21 w-14" },
    primary: "text-3xl tracking-[0.12em]",
    secondary: "mt-1 text-sm tracking-[0.55em]",
    accentLastLetter: true,
  },
} as const;

export type LogoSize = keyof typeof sizeStyles;

export interface LogoProps {
  href?: string;
  /** Defaults to `md`. */
  size?: LogoSize;
  className?: string;
}

export function Logo({ href = "/", size = "md", className }: LogoProps) {
  const styles = sizeStyles[size];
  const { primary, secondary } = siteConfig.wordmark;

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center",
        styles.gap,
        "focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Image
        src="/brand/logo-mark.webp"
        // Decorative: the link's aria-label already names the studio.
        alt=""
        // The DISPLAY size, not the source's 256×384, so Next serves a file
        // that size for 1x/2x screens rather than the full image.
        width={styles.mark.width}
        height={styles.mark.height}
        // The header's copy is above the fold on every page, so it loads straight
        // away. Not `priority`, which is reserved for the page's LCP image (§9.1).
        // The footer's is far below the fold and loads lazily.
        loading={size === "md" ? "eager" : "lazy"}
        className={cn(styles.mark.className, "shrink-0")}
      />

      <span className="flex flex-col leading-[1.05]">
        <span
          className={cn("text-text-primary font-extrabold", styles.primary)}
        >
          {styles.accentLastLetter ? (
            <>
              {primary.slice(0, -1)}
              <span className="text-accent-primary">{primary.slice(-1)}</span>
            </>
          ) : (
            primary
          )}
        </span>
        <span
          className={cn("text-text-secondary font-extrabold", styles.secondary)}
        >
          {secondary}
        </span>
      </span>
    </Link>
  );
}
