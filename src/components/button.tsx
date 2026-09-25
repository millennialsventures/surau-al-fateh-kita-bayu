import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "./icon";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkOutline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 ease-[var(--ease-calm)]";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-white hover:bg-forest-600",
  secondary: "border border-forest/25 bg-white text-forest hover:border-forest/50 hover:bg-brand-50",
  ghost: "text-forest underline decoration-gold-300 decoration-2 underline-offset-4 hover:decoration-gold",
  /* For placement on the dark green CTA band. */
  onDark: "bg-white text-forest hover:bg-gold-50",
  onDarkOutline:
    "border border-brand-100/45 bg-transparent text-white hover:border-white hover:bg-white/10",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
  withArrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  children,
  withArrow = false,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {withArrow ? <Icon name="arrow-right" size={18} /> : null}
    </Link>
  );
}

type ButtonAnchorProps = ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
};

export function ButtonAnchor({
  variant = "primary",
  children,
  external = false,
  className = "",
  ...rest
}: ButtonAnchorProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
