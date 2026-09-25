import type { ReactNode } from "react";

import { Container } from "./container";

type Tone = "sand" | "white" | "mist" | "brand-50" | "forest";

const tones: Record<Tone, string> = {
  sand: "bg-sand",
  white: "bg-white",
  mist: "bg-mist",
  "brand-50": "bg-brand-50",
  forest: "bg-forest text-brand-50",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  /** Vertical padding scale. */
  spacing?: "sm" | "md" | "lg";
  className?: string;
  contained?: boolean;
};

const spacing = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
} as const;

export function Section({
  children,
  id,
  tone = "sand",
  spacing: pad = "md",
  className = "",
  contained = true,
}: SectionProps) {
  const body = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={`${tones[tone]} ${spacing[pad]} ${className}`}
      // Headings inside a forest-tone section must flip to a light colour.
      data-tone={tone === "forest" ? "dark" : "light"}
    >
      {body}
    </section>
  );
}
