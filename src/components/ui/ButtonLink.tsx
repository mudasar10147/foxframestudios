import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { buttonStyles, type ButtonStyleOptions } from "@/components/ui/Button";

export interface ButtonLinkProps
  extends
    Omit<ComponentPropsWithoutRef<typeof Link>, "className">,
    ButtonStyleOptions {}

/**
 * A navigation target that looks like a button. Use this — never a `<button>` with an
 * onClick that routes — whenever the control takes the user somewhere (§15).
 */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
