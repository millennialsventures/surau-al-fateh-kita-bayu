import Link from "next/link";

import { Icon } from "./icon";

type DonateCardProps = {
  title: string;
  description: string;
  /** Where the money goes. Omit when the surrounding page already states it. */
  purpose?: string;
  actionLabel?: string;
  actionHref?: string;
};

/**
 * Display-only donation block. There is no payment processing on this site —
 * contributors are directed to the surau's own channels.
 */
export function DonateCard({
  title,
  description,
  purpose,
  actionLabel = "Hubungi Surau",
  actionHref = "/contact",
}: DonateCardProps) {
  return (
    <div className="rounded-card border border-hairline bg-white p-6">
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold-50 text-gold">
        <Icon name="wallet" size={22} />
      </span>

      <h3 className="mt-5 font-display text-lg font-semibold text-forest">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>

      {purpose ? (
        <div className="mt-5 rounded-xl bg-brand-50 p-4">
          <p className="flex items-start gap-2.5 text-sm text-forest">
            <span className="mt-0.5 shrink-0 text-leaf">
              <Icon name="heart" size={16} />
            </span>
            <span>
              <span className="font-semibold">Kegunaan: </span>
              {purpose}
            </span>
          </p>
        </div>
      ) : null}

      {actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-gold-300 decoration-2 underline-offset-4 transition-colors hover:decoration-gold"
        >
          {actionLabel}
          <Icon name="arrow-right" size={16} />
        </Link>
      ) : null}
    </div>
  );
}
