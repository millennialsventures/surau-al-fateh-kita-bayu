"use client";

import Image from "next/image";
import { useState } from "react";
import quranVerses from "@/content/quran.json";
import { Container } from "./container";
import { Icon } from "./icon";

export function QuranSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = quranVerses.length;
  const current = quranVerses[currentIndex];

  function prevSlide() {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-[#003813] text-white">
      {/* Pattern overlay */}
      <div className="pattern-geo-lg absolute inset-0 opacity-15" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left: Quran on Rehal Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-52 sm:w-64 md:w-72 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/quran-rehal.png"
                alt="Al-Quran di atas rehal"
                width={440}
                height={244}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: Verse Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center">
            {/* Header + Nav Arrows */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Ayat sebelumnya"
                className="size-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Icon name="chevron-left" size={18} />
              </button>

              <h2 className="font-display text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white/90">
                AYAT AL-QURAN PILIHAN
              </h2>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Ayat seterusnya"
                className="size-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <Icon name="chevron-right" size={18} />
              </button>
            </div>

            {/* Arabic Verse */}
            <div className="min-h-[140px] flex flex-col justify-center px-4">
              <p
                dir="rtl"
                lang="ar"
                className="font-serif text-xl sm:text-2xl lg:text-3xl leading-loose sm:leading-[2.2] text-[#f4eeda] font-normal drop-shadow-sm select-text"
              >
                {current.arabic}
              </p>

              {/* Translation */}
              <p className="mt-4 text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl mx-auto italic">
                &ldquo;{current.translation}&rdquo;
              </p>

              {/* Reference */}
              <p className="mt-2 text-xs font-semibold text-[#e5a823]">
                ({current.reference})
              </p>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {quranVerses.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Pilih ayat ${i + 1}`}
                  className={`size-2.5 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-[#e5a823]" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
