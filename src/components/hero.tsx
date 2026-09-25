import Link from "next/link";

import { announcements } from "@/content/announcements";
import { site } from "@/lib/site";

import { ButtonAnchor, ButtonLink } from "./button";
import { Container } from "./container";
import { Icon } from "./icon";

export function Hero() {
  const announcement = announcements[0];

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-brand-50">
      <div className="pattern-geo absolute inset-0" aria-hidden="true" />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {announcement ? (
              <Link
                href={announcement.href}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold-300 bg-gold-50 px-4 py-1.5 text-sm font-medium text-gold transition-colors hover:border-gold-300 hover:bg-gold-100"
              >
                <Icon name="sparkle" size={16} />
                <span className="line-clamp-1">{announcement.text}</span>
              </Link>
            ) : null}

            <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-forest sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {site.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/about" withArrow>
                Kenali Surau Kami
              </ButtonLink>
              <ButtonLink href="/events" variant="secondary">
                Lihat Aktiviti
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="pattern-geo-lg absolute -inset-4 rounded-[2rem] opacity-70"
                aria-hidden="true"
              />
              <div className="relative rounded-[1.75rem] border border-hairline bg-white p-8 shadow-[0_12px_40px_rgba(20,32,26,0.08)]">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  Waktu Solat
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-forest">
                  Waktu Solat Hari Ini
                </h2>

                <ul className="mt-6 divide-y divide-hairline">
                  {site.hours.map((slot) => (
                    <li key={slot.label} className="flex items-center justify-between py-3">
                      <span className="flex items-center gap-2.5 text-sm text-ink-soft">
                        <Icon name="clock" size={16} className="text-leaf-400" />
                        {slot.label}
                      </span>
                      <span className="font-display text-lg font-semibold text-forest tabular-nums">
                        {slot.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="text-xs text-ink-soft">
                    Waktu solat anggaran. Sila rujuk aplikasi waktu solat untuk waktu terkini.
                  </p>
                </div>

                <ButtonAnchor
                  href={site.maps.directions}
                  variant="secondary"
                  external
                  className="mt-5 w-full"
                >
                  <Icon name="direction" size={18} />
                  Dapatkan Arah
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
