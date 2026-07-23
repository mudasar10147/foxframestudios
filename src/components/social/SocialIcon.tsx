import { IconButton } from "@/components/buttons/IconButton";
import { getSocialIcon } from "@/components/icons";

type SocialIconProps = {
  platform: string;
  label: string;
  url: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function SocialIcon({
  platform,
  label,
  url,
  size = "md",
  className,
}: SocialIconProps) {
  const Icon = getSocialIcon(platform);
  const isExternal = url.startsWith("http");

  return (
    <IconButton
      href={url}
      aria-label={label}
      variant="ghost"
      size={size}
      className={className}
      icon={<Icon size={18} aria-hidden="true" />}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    />
  );
}
