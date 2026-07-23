import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function NavLink({
  href,
  label,
  active = false,
  onClick,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-body-sm relative text-text-secondary transition-[color] duration-[var(--duration-fast)] ease-[var(--ease-hover)] hover:text-text-primary",
        active && "text-text-primary",
        className,
      )}
    >
      {label}
    </Link>
  );
}
