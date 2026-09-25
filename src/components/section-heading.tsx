import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Applied to the h2 so a parent <section> can point aria-labelledby at it. */
  id?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  id,
  children,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-gold uppercase group-data-[tone=dark]:text-gold-200">
          <span aria-hidden="true" className="h-px w-6 bg-gold-300" />
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-balance text-forest sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
