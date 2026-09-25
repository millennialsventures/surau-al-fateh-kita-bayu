import type { Program } from "@/content/programs";

import { Card } from "./card";
import { Icon } from "./icon";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card as="article" accent className="flex h-full flex-col">
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-leaf">
        <Icon name={program.icon} size={22} />
      </span>

      <h3 className="mt-5 font-display text-lg font-semibold text-forest">
        {program.title}
      </h3>
      <p className="mt-1.5 text-sm font-medium text-gold">{program.summary}</p>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{program.description}</p>

      <dl className="mt-6 space-y-2 border-t border-hairline pt-4 text-sm">
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Jadual</dt>
          <dd className="flex items-center gap-2.5 text-ink-soft">
            <Icon name="calendar" size={16} className="shrink-0 text-leaf-400" />
            {program.schedule}
          </dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Peserta</dt>
          <dd className="flex items-center gap-2.5 text-ink-soft">
            <Icon name="users" size={16} className="shrink-0 text-leaf-400" />
            {program.audience}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
