import Image from "next/image";

import type { Leader } from "@/content/leadership";

import { Card } from "./card";

type LeaderCardProps = {
  leader: Leader;
  variant?: "default" | "featured" | "compact";
  className?: string;
  align?: "left" | "center";
};

export function LeaderCard({
  leader,
  variant = "default",
  className = "",
  align = "left",
}: LeaderCardProps) {
  const isFeatured = variant === "featured" || leader.highlight;
  const isCompact = variant === "compact";

  if (isFeatured) {
    return (
      <Card
        as="article"
        accent
        className={`relative overflow-hidden border-forest/15 bg-gradient-to-b from-brand-50/50 via-white to-white p-5 sm:p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-md ${className}`}
      >
        <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} gap-3`}>
          <div className="flex items-center gap-3">
            {leader.photo ? (
              <Image
                src={leader.photo}
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-gold-300/60"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full bg-forest text-sm sm:text-base font-bold text-white shadow-sm ring-2 ring-gold-300/60"
              >
                {leader.initials}
              </span>
            )}
            <div className={align === "center" ? "text-center" : "text-left"}>
              <span className="inline-block rounded-full bg-gold-100/90 px-3 py-0.5 text-xs font-semibold tracking-wide text-gold border border-gold-300/40 uppercase">
                {leader.role}
              </span>
              <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-forest">
                {leader.name}
              </h3>
            </div>
          </div>
          {leader.remit ? (
            <p className="text-xs sm:text-sm text-ink-soft">{leader.remit}</p>
          ) : null}
        </div>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card
        as="article"
        className={`group p-3.5 sm:p-4 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50/30 ${className}`}
      >
        <div className="flex items-center gap-3">
          {leader.photo ? (
            <Image
              src={leader.photo}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-leaf group-hover:bg-brand-100 group-hover:text-forest transition-colors"
            >
              {leader.initials}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-leaf uppercase tracking-wider">
              {leader.role}
            </span>
            <h3 className="mt-1 truncate font-display text-sm font-semibold text-forest">
              {leader.name}
            </h3>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card as="article" className={`flex h-full items-start gap-4 p-5 ${className}`}>
      {leader.photo ? (
        <Image
          src={leader.photo}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-leaf"
        >
          {leader.initials}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-leaf uppercase tracking-wider">
          {leader.role}
        </span>
        <h3 className="mt-1 font-display text-base font-semibold text-balance text-forest">
          {leader.name}
        </h3>
        {leader.remit ? (
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{leader.remit}</p>
        ) : null}
      </div>
    </Card>
  );
}

