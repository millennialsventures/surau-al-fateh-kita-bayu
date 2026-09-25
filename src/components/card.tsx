import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds the gold hairline across the top edge. */
  accent?: boolean;
  as?: "div" | "article" | "li";
};

export function Card({
  children,
  className = "",
  accent = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-card border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(20,32,26,0.04)] transition-shadow duration-300 ease-[var(--ease-calm)] hover:shadow-[0_8px_24px_rgba(20,32,26,0.07)] ${
        accent ? "hairline-top" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
