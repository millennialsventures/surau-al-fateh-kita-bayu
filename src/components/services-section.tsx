"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { servicesList, type ServiceItem } from "@/content/services";
import { Container } from "./container";
import { Icon, type IconName } from "./icon";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!selectedService) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedService(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!selectedService) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedService]);

  function handleCopy(text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section id="perkhidmatan" className="py-16 sm:py-24 bg-[#faf9f6]">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-forest">
              PERKHIDMATAN &amp;
            </h2>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#b8860b]">
              MAKLUMAT KAMI
            </span>
          </div>
          <p className="mt-2 text-sm sm:text-base text-ink-soft">
            Kemudahan maklumat untuk kemudahan semua ahli kariah.
          </p>
        </div>

        {/* 11 Services Grid: 5 cards on row 1, 6 cards on row 2 on desktop */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4.5 max-w-5xl mx-auto">
          {servicesList.slice(0, 5).map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-hairline shadow-xs hover:shadow-md hover:border-leaf/40 hover:-translate-y-1 transition-all duration-200 text-center"
            >
              <div className="size-13 sm:size-15 rounded-2xl bg-brand-50 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-200 mb-3 shadow-xs">
                <Icon name={service.iconName as IconName} size={28} />
              </div>
              <h3 className="font-display text-xs sm:text-sm font-bold text-forest leading-snug line-clamp-2 group-hover:text-leaf">
                {service.title}
              </h3>
            </button>
          ))}
        </div>

        <div className="mt-3.5 sm:mt-4.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4.5 max-w-6xl mx-auto">
          {servicesList.slice(5, 11).map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-hairline shadow-xs hover:shadow-md hover:border-leaf/40 hover:-translate-y-1 transition-all duration-200 text-center"
            >
              <div className="size-13 sm:size-15 rounded-2xl bg-brand-50 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-200 mb-3 shadow-xs">
                <Icon name={service.iconName as IconName} size={28} />
              </div>
              <h3 className="font-display text-xs sm:text-sm font-bold text-forest leading-snug line-clamp-2 group-hover:text-leaf">
                {service.title}
              </h3>
            </button>
          ))}
        </div>
      </Container>

      {/* Modal Dialog */}
      {selectedService ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-hairline text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-brand-50 text-forest flex items-center justify-center shrink-0">
                  <Icon name={selectedService.iconName as IconName} size={24} />
                </div>
                <div>
                  {selectedService.modal.badge ? (
                    <span className="inline-block rounded-full bg-gold-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-gold uppercase border border-gold-300/40 mb-1">
                      {selectedService.modal.badge}
                    </span>
                  ) : null}
                  <h3 id="modal-title" className="font-display text-lg sm:text-xl font-bold text-forest">
                    {selectedService.modal.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft">
                    {selectedService.modal.subheading}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Tutup tetingkap"
                className="size-9 rounded-full bg-mist hover:bg-hairline flex items-center justify-center text-ink-soft transition-colors shrink-0"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4 text-sm text-ink-soft">
              <p className="leading-relaxed">{selectedService.modal.description}</p>

              {/* Points if available */}
              {selectedService.modal.points ? (
                <ul className="space-y-2 rounded-xl bg-sand p-4 border border-hairline">
                  {selectedService.modal.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                      <span className="mt-0.5 text-forest font-bold shrink-0">
                        <Icon name="check" size={16} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Details table if available */}
              {selectedService.modal.details ? (
                <div className="rounded-xl border border-hairline divide-y divide-hairline overflow-hidden bg-white">
                  {selectedService.modal.details.map((d, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 text-xs sm:text-sm gap-1">
                      <span className="font-semibold text-forest">{d.label}</span>
                      <span className="text-ink font-medium select-all">{d.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Special interactive section for Sedekah/Infaq */}
              {selectedService.id === "sedekah-infaq" ? (
                <div className="rounded-2xl bg-brand-50 p-4 border border-brand-200 text-center space-y-3">
                  <p className="text-xs font-semibold text-forest uppercase tracking-wider">
                    Maybank Islamic
                  </p>
                  <p className="font-display text-2xl font-extrabold text-forest tracking-wider">
                    5660 1066 5759
                  </p>
                  <p className="text-xs text-leaf font-medium">SURAU AL-FATEH</p>
                  <button
                    type="button"
                    onClick={() => handleCopy("566010665759")}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-forest-600 transition-colors"
                  >
                    <Icon name={copied ? "check" : "copy"} size={14} />
                    <span>{copied ? "Nombor Disalin!" : "Salin Nombor Akaun"}</span>
                  </button>
                </div>
              ) : null}

              {/* Modal Image preview if provided */}
              {selectedService.modal.image ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-hairline bg-mist p-2">
                  <Image
                    src={selectedService.modal.image}
                    alt={selectedService.modal.heading}
                    width={600}
                    height={800}
                    className="w-full max-h-80 object-contain mx-auto"
                  />
                </div>
              ) : null}
            </div>

            {/* Modal Footer / Actions */}
            <div className="mt-6 pt-4 border-t border-hairline flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-full px-5 py-2 text-xs font-semibold text-ink-soft hover:bg-mist transition-colors"
              >
                Tutup
              </button>

              {selectedService.modal.secondaryActionLabel && selectedService.modal.secondaryActionHref ? (
                selectedService.modal.secondaryActionExternal ? (
                  <a
                    href={selectedService.modal.secondaryActionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-white px-5 py-2.5 text-xs font-bold text-forest hover:bg-brand-50 transition-colors"
                  >
                    <span>{selectedService.modal.secondaryActionLabel}</span>
                    <Icon name="arrow-right" size={14} />
                  </a>
                ) : (
                  <Link
                    href={selectedService.modal.secondaryActionHref}
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-white px-5 py-2.5 text-xs font-bold text-forest hover:bg-brand-50 transition-colors"
                  >
                    <span>{selectedService.modal.secondaryActionLabel}</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                )
              ) : null}

              {selectedService.modal.actionLabel && selectedService.modal.actionHref ? (
                selectedService.modal.actionExternal ? (
                  <a
                    href={selectedService.modal.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-forest-600 transition-colors"
                  >
                    <span>{selectedService.modal.actionLabel}</span>
                    <Icon name="arrow-right" size={14} />
                  </a>
                ) : (
                  <Link
                    href={selectedService.modal.actionHref}
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-forest-600 transition-colors"
                  >
                    <span>{selectedService.modal.actionLabel}</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
