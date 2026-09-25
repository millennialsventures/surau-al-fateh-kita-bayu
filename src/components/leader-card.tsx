import Image from "next/image";

import type { Leader } from "@/content/leadership";

import { Card } from "./card";

type LeaderCardProps = {
  leader: Leader;
};

export function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <Card as="article" className="flex h-full items-start gap-4">
      {leader.photo ? (
        <Image
          src={leader.photo}
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-leaf"
        >
          {leader.initials}
        </span>
      )}

      <div className="min-w-0">
        <h3 className="font-display text-base font-semibold text-balance text-forest">
          {leader.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-gold">{leader.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{leader.remit}</p>
      </div>
    </Card>
  );
}
