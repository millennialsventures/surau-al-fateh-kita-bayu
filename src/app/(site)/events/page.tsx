import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { EventCard } from "@/components/event-card";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { publishedEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Aktiviti",
  description:
    "Aktiviti dan acara akan datang di Surau Al-Fateh KITA, Bayu Cybersouth, Cyberjaya.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Aktiviti"
        title="Aktiviti Mendatang"
        description="Majlis ilmah, gotong-royong dan program komuniti."
      />

      <Section spacing="lg">
        <Container>
          <SectionHeading
            title="Kalendar"
            description="Disusun mengikut tarikh terdekat."
          />

          {publishedEvents.length > 0 ? (
            <ul className="mt-10 grid gap-5">
              {publishedEvents.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10">
              <Placeholder
                label="Belum ada aktiviti"
                hint="Aktiviti seterusnya akan ditambah di sini."
                icon="calendar"
              />
            </div>
          )}

          <div className="mt-10">
            <Placeholder
              label="Gambar poster"
              hint="Poster aktiviti akan dimuat naik oleh jawatankuasa selepas disahkan."
              icon="sparkle"
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Aktiviti"
        title="Hadir dan menyertai"
        description="Semua aktiviti terbuka kepada umum."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/programs", label: "Lihat Program" }}
      />
    </>
  );
}
