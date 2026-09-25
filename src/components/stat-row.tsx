type Stat = {
  value: string;
  label: string;
  note?: string;
};

type StatRowProps = {
  stats: readonly Stat[];
  className?: string;
};

export function StatRow({ stats, className = "" }: StatRowProps) {
  return (
    <dl className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <dt className="text-sm font-medium text-ink-soft">{stat.label}</dt>
          <dd className="mt-1.5 font-display text-3xl font-semibold text-forest sm:text-4xl">
            {stat.value}
          </dd>
          {stat.note ? <p className="mt-1.5 text-xs text-ink-soft">{stat.note}</p> : null}
        </div>
      ))}
    </dl>
  );
}
