import type { EventRecord } from "@/content/events";

import { Card } from "./card";
import { Icon } from "./icon";

const dateFormatter = new Intl.DateTimeFormat("ms-MY", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kuala_Lumpur",
});

const timeFormatter = new Intl.DateTimeFormat("ms-MY", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kuala_Lumpur",
});

function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

function formatTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

type EventCardProps = {
  event: EventRecord;
};

export function EventCard({ event }: EventCardProps) {
  const start = new Date(event.starts_at);

  return (
    <Card as="article" accent className="flex h-full flex-col sm:flex-row sm:gap-6">
      {/* Date block — shrinks to a single line on small screens. */}
      <div className="flex shrink-0 items-center gap-4 border-b border-hairline pb-4 sm:w-24 sm:flex-col sm:items-start sm:border-r sm:border-b-0 sm:pb-0 sm:pr-6">
        <span className="font-display text-3xl leading-none font-semibold text-forest tabular-nums">
          {start.getDate()}
        </span>
        <span className="text-sm font-medium text-gold uppercase">
          {start.toLocaleDateString("ms-MY", { month: "short", timeZone: "Asia/Kuala_Lumpur" })}
        </span>
        <span className="text-sm text-ink-soft sm:mt-1">
          {start.toLocaleDateString("ms-MY", {
            weekday: "long",
            timeZone: "Asia/Kuala_Lumpur",
          })}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4 sm:pt-0">
        <h3 className="font-display text-lg font-semibold text-balance text-forest">
          {event.title_ms}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{event.description_ms}</p>

        <dl className="mt-5 space-y-2 text-sm text-ink-soft">
          <div className="flex items-center gap-2.5">
            <dt className="sr-only">Masa</dt>
            <dd className="flex items-center gap-2.5">
              <Icon name="clock" size={16} className="shrink-0 text-leaf-400" />
              <time dateTime={event.starts_at}>
                {formatTime(event.starts_at)}
                {" – "}
                {formatTime(event.ends_at)}
              </time>
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <dt className="sr-only">Lokasi</dt>
            <dd className="flex items-center gap-2.5">
              <Icon name="map-pin" size={16} className="shrink-0 text-leaf-400" />
              {event.location}
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-xs text-ink-soft/80">
          <time dateTime={event.starts_at}>{formatDate(event.starts_at)}</time>
        </p>
      </div>
    </Card>
  );
}
