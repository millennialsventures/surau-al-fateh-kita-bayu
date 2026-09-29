"use client";

import { useState } from "react";
import type { DailyPrayerSchedule } from "@/lib/prayer-times";
import { Container } from "./container";
import { Icon } from "./icon";

interface PrayerTimesSectionProps {
  schedule: DailyPrayerSchedule;
}

export function PrayerTimesSection({ schedule }: PrayerTimesSectionProps) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  return (
    <section id="waktu-solat" className="relative overflow-hidden py-16 sm:py-20 bg-[#f4f6f3]">
      {/* Decorative mosque silhouette watermark in background */}
      <div
        className="pointer-events-none absolute right-4 -bottom-10 opacity-5 select-none text-forest"
        aria-hidden="true"
      >
        <Icon name="mosque" size={320} />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-forest">
            WAKTU SOLAT
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-ink-soft">
            <span>{schedule.dateDisplay}</span>
            <span className="mx-2 text-gold">|</span>
            <span>{schedule.locationDisplay}</span>
          </p>
        </div>

        {/* 5 Cards Row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {schedule.prayers.map((slot) => {
            const isActive = slot.key === schedule.activeKey;

            return (
              <div
                key={slot.key}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl shadow-sm transition-all duration-200 text-center ${
                  isActive
                    ? "bg-forest text-white ring-4 ring-forest/20 shadow-md scale-102"
                    : "bg-white text-forest border border-hairline hover:shadow-md"
                }`}
              >
                {isActive ? (
                  <span className="absolute -top-2.5 rounded-full bg-[#e5a823] px-2.5 py-0.5 text-[0.65rem] font-bold text-[#14201a] uppercase tracking-wider">
                    Sekarang
                  </span>
                ) : null}

                <span
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    isActive ? "text-brand-100" : "text-leaf-400"
                  }`}
                >
                  {slot.name}
                </span>

                <span className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {slot.time}
                </span>

                <span
                  className={`mt-1 text-[0.75rem] font-medium ${
                    isActive ? "text-white/80" : "text-ink-soft"
                  }`}
                >
                  {slot.period}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA / Details */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <p className="flex items-center gap-1.5">
            <Icon name="clock" size={14} className="text-leaf" />
            <span>Zon SGR01 (Sepang, Cyberjaya, Selangor) mengikut Takwim JAKIM</span>
          </p>

          <button
            type="button"
            onClick={() => setShowFullSchedule(true)}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-forest-600 transition-colors"
          >
            <span>Lihat Jadual Penuh</span>
            <span>🗓</span>
          </button>
        </div>
      </Container>

      {/* Modal for full schedule timetable */}
      {showFullSchedule ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setShowFullSchedule(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-hairline text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-forest">
                  Jadual Penuh Waktu Solat
                </h3>
                <p className="text-xs text-ink-soft">
                  Zon Selangor SGR01 &bull; {schedule.dateDisplay}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullSchedule(false)}
                className="size-8 rounded-full bg-mist hover:bg-hairline flex items-center justify-center text-ink-soft"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              <div className="divide-y divide-hairline rounded-xl border border-hairline overflow-hidden">
                {schedule.prayers.map((slot) => (
                  <div
                    key={slot.key}
                    className={`flex items-center justify-between p-3.5 text-sm ${
                      slot.key === schedule.activeKey ? "bg-brand-50 font-bold" : ""
                    }`}
                  >
                    <span className="text-forest font-semibold">{slot.name}</span>
                    <span className="font-display font-bold text-ink">
                      {slot.time} {slot.period}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[0.75rem] text-ink-soft pt-2 text-center">
                Waktu azan diselaraskan mengikut hitungan rasmi Jabatan Agama Islam Selangor (JAIS).
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFullSchedule(false)}
                className="rounded-full bg-forest px-5 py-2 text-xs font-bold text-white hover:bg-forest-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
