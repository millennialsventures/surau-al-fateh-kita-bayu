"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { getBannerPublicUrl, type HeroBannerRecord } from "@/lib/hero-banners";
import { Icon } from "./icon";

interface HeroBannerCarouselProps {
  banners: HeroBannerRecord[];
}

export function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
  const hasMultiple = banners.length > 1;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: hasMultiple, duration: prefersReducedMotion ? 0 : 25 },
    hasMultiple && !prefersReducedMotion
      ? [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
      : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#003813] text-white">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {banners.map((banner, index) => {
            const publicUrl = getBannerPublicUrl(banner.image_path);
            return (
              <div
                key={banner.id}
                className="relative aspect-[16/9] max-h-[600px] min-w-0 flex-[0_0_100%] sm:aspect-[21/9]"
              >
                {publicUrl ? (
                  <Image
                    src={publicUrl}
                    alt={banner.alt_text || "Banner Surau Al-Fateh"}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover"
                  />
                ) : null}

                {banner.caption ? (
                  <div className="absolute inset-0 flex items-start pt-10 sm:items-center sm:pt-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10 sm:from-black/70 sm:via-black/35 sm:to-transparent">
                    <div className="max-w-[60%] px-4 sm:max-w-xl sm:px-10 lg:max-w-2xl lg:px-14">
                      <p className="font-display text-lg font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-6xl">
                        {banner.caption}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Banner sebelumnya"
            className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
          >
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Banner seterusnya"
            className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
          >
            <Icon name="chevron-right" size={18} />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 sm:bottom-5">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Pilih banner ${index + 1}`}
                className={`size-2.5 rounded-full transition-all ${
                  index === selectedIndex ? "w-6 bg-[#e5a823]" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
