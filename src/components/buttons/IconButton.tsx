import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const iconButtonVariants = cva(
  "transition-button inline-flex cursor-pointer items-center justify-center rounded-md select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-border-glow bg-accent-primary text-text-primary shadow-purple-glow hover:brightness-110",
        secondary:
          "border border-border-glass bg-glass-surface text-text-primary hover:border-border-strong",
        ghost:
          "bg-transparent text-text-secondary hover:bg-glass-surface hover:text-text-primary",
        outline:
          "border border-border-strong bg-transparent text-text-primary hover:bg-glass-surface",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

type IconButtonBaseProps = VariantProps<typeof iconButtonVariants> & {
  /** Accessible name — required for icon-only controls. */
  "aria-label": string;
  icon: ReactNode;
  className?: string;
};

type IconButtonAsButton = IconButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof IconButtonBaseProps> & {
    href?: undefined;
  };

type IconButtonAsLink = IconButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof IconButtonBaseProps> & {
    href: string;
  };

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

export function IconButton(props: IconButtonProps) {
  const { variant, size, icon, className, ...rest } = props;
  const classes = cn(iconButtonVariants({ variant, size }), className);

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {icon}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {icon}
    </button>
  );
}
