import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

export const buttonVariants = cva(
  "transition-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-border-glow bg-accent-primary text-text-primary shadow-purple-glow hover:-translate-y-0.5 hover:shadow-floating hover:brightness-110 active:translate-y-0",
        secondary:
          "border border-border-glass bg-glass-surface text-text-primary hover:-translate-y-0.5 hover:border-border-strong active:translate-y-0",
        ghost:
          "bg-transparent text-text-secondary hover:bg-glass-surface hover:text-text-primary",
        outline:
          "border border-border-strong bg-transparent text-text-primary hover:bg-glass-surface",
      },
      size: {
        sm: "text-button px-4 py-2",
        md: "text-button px-6 py-3",
        lg: "text-body px-8 py-4",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

  const content = (
    <>
      {loading ? <Spinner size="sm" /> : leftIcon}
      {children}
      {!loading ? rightIcon : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} aria-busy={loading} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={classes}
      aria-busy={loading}
      disabled={loading || disabled}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
