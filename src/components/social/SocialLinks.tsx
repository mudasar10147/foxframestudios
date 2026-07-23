import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";
import { SocialIcon } from "./SocialIcon";

type SocialLinksProps = {
  links: SocialLink[];
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function SocialLinks({ links, size = "md", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link) => (
        <li key={link.platform}>
          <SocialIcon
            platform={link.platform}
            label={link.label}
            url={link.url}
            size={size}
          />
        </li>
      ))}
    </ul>
  );
}
