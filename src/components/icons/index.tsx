import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GitHubIcon, LinkedInIcon, XIcon } from "./brand-icons";

export { GitHubIcon, LinkedInIcon, XIcon } from "./brand-icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconRegistry: Record<string, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  twitter: XIcon,
  discord: MessageCircle,
  email: Mail,
  mail: Mail,
};

export function getSocialIcon(platform: string): IconComponent {
  return iconRegistry[platform.toLowerCase()] ?? ExternalLink;
}
