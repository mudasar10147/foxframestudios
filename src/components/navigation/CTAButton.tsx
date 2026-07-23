import { Button } from "@/components/buttons/Button";

type CTAButtonProps = {
  label?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
};

export function CTAButton({
  label = "Let's Talk",
  href = "/contact",
  size = "sm",
  fullWidth,
  onClick,
  className,
}: CTAButtonProps) {
  return (
    <Button
      href={href}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      className={className}
    >
      {label}
    </Button>
  );
}
