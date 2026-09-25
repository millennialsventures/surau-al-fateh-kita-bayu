import type { Metadata } from "next";

import { Container } from "@/components/container";
import { ContactSection, DirectionsButton } from "@/components/contact-card";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hubungi",
  description:
    "Alamat, arah perjalanan dan cara menghubungi Surau Al-Fateh KITA di Bayu Cybersouth, Cyberjaya.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hubungi"
        title="Hubungi Kami"
        description="Alamat surau, waktu solat dan cara menghubungi kami."
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                title="Maklumat Hubungan"
                description="Butiran di bawah akan dikemas kini selepas disahkan oleh jawatankuasa."
              />
              <div className="mt-8">
                <ContactSection />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card border border-hairline bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-forest">Waktu Solat</h2>

                <ul className="mt-4 divide-y divide-hairline">
                  {site.hours.map((slot) => (
                    <li key={slot.label} className="flex items-center justify-between py-2.5">
                      <span className="flex items-center gap-2.5 text-sm text-ink-soft">
                        <Icon name="clock" size={16} className="text-leaf-400" />
                        {slot.label}
                      </span>
                      <span className="font-display text-base font-semibold text-forest tabular-nums">
                        {slot.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs text-ink-soft">
                  Waktu anggaran. Sila rujuk aplikasi waktu solat untuk waktu terkini.
                </p>
              </div>

              <div className="mt-6">
                <Placeholder
                  label="Waktu solat tepat"
                  hint="Jadual rasmi daripada Jabatan Mufti Selangor belum dimuatkan."
                  icon="clock"
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Lokasi"
                title="Arah Perjalanan"
                description="Terletak di kawasan Bayu Cybersouth, Cyberjaya, Selangor."
              />

              <address className="mt-6 space-y-2 text-base not-italic text-ink-soft">
                <p className="font-semibold text-forest">{site.address.line1}</p>
                <p>{site.address.line2}</p>
                <p>
                  {site.address.line3} {site.address.postcode}
                </p>
                <p>{site.address.country}</p>
              </address>

              <div className="mt-7 flex flex-wrap gap-3">
                <DirectionsButton />
              </div>

              <p className="mt-5 text-sm text-ink-soft">
                Peta tidak dipaparkan pada laman ini. Gunakan pautan di atas untuk membuka
                aplikasi peta anda.
              </p>
            </div>

            <div className="rounded-card border border-dashed border-hairline bg-sand p-8 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-50 text-leaf">
                <Icon name="map-pin" size={24} />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-forest">
                Peta tidak dipaparkan
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">
                Peta Google tidak dibekalkan secara langsung supaya laman ini lebih pantas.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Lain-lain"
        title="Perlukan bantuan lain?"
        description="Lihat program surau atau halaman derma untuk sokongan anda."
        primary={{ href: "/programs", label: "Lihat Program" }}
        secondary={{ href: "/donate", label: "Halaman Derma" }}
      />
    </>
  );
}
