import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { EventCard } from "@/components/event-card";
import { Hero } from "@/components/hero";
import { Icon } from "@/components/icon";
import { Placeholder } from "@/components/placeholder";
import { ProgramCard } from "@/components/program-card";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { StatRow } from "@/components/stat-row";
import { publishedEvents } from "@/content/events";
import { featuredPrograms, programs } from "@/content/programs";

const stats = [
  { value: "5", label: "Waktu solat", note: "Setiap hari" },
  { value: String(programs.length), label: "Program tetap", note: "Sepanjang tahun" },
  { value: String(publishedEvents.length), label: "Aktiviti", note: "Akan datang" },
  { value: "0", label: "Yuran", note: "Tanpa yuran" },
] as const;

const values = [
  {
    icon: "shield" as const,
    title: "Aman dan terbuka",
    body: "Kawasan surau boleh diakses oleh semua lapisan masyarakat.",
  },
  {
    icon: "users" as const,
    title: "Untuk semua lapisan",
    body: "Kanak-kanak, dewasa dan warga emas dialu-alukan bersama-sama.",
  },
  {
    icon: "book" as const,
    title: "Ilmu yang membina",
    body: "Pengajian Al-Quran dan majlis ilmah sebagai asas kepada rutinitas harian.",
  },
  {
    icon: "heart" as const,
    title: "Prihatin",
    body: "Program bantuan sosial untuk warga yang memerlukan.",
  },
] as const;

export default function HomePage() {
  const upcoming = publishedEvents.slice(0, 2);

  return (
    <>
      <Hero />

      <Section spacing="lg">
        <Container>
          <StatRow stats={stats} />
        </Container>
      </Section>

      <Section tone="white" spacing="lg" id="program">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Program"
              title="Apa yang Kami Tawarkan"
              description="Program tetap yang dijalankan secara konsisten sepanjang tahun."
            />
            <ButtonLink href="/programs" variant="secondary" withArrow>
              Semua Program
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((program) => (
              <li key={program.id}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="brand-50" spacing="lg" id="aktiviti">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Aktiviti"
              title="Aktiviti Mendatang"
              description="Majlis ilmah, gotong-royong dan program komuniti."
            />
            <ButtonLink href="/events" variant="secondary" withArrow>
              Semua Aktiviti
            </ButtonLink>
          </div>

          {upcoming.length > 0 ? (
            <ul className="mt-10 grid gap-5">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10">
              <Placeholder
                label="Belum ada aktiviti"
                hint="Aktiviti seterusnya akan ditambah oleh jawatankuasa."
                icon="calendar"
              />
            </div>
          )}
        </Container>
      </Section>

      <Section tone="white" spacing="lg" id="nilai">
        <Container>
          <SectionHeading
            eyebrow="Keutamaan"
            title="Rumah Ibadah yang Mesra"
            description="Pendekatan ringkas kepada cara kami berkhidmat kepada komuniti."
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title}>
                <div className="rounded-card border border-hairline bg-sand p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-100 text-leaf">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-forest">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Placeholder
              label="Galeri aktiviti"
              hint="Gambar aktiviti akan dipaparkan di sini. Foto belum dihantar."
              icon="sparkle"
            />
            <Placeholder
              label="Maklumat hubungan"
              hint="Nombor telefon dan e-mel masih menunggu pengesahan jawatankuasa."
              icon="phone"
            />
          </div>

          <p className="mt-10 text-center text-sm text-ink-soft">
            Ingin tahu lebih lanjut?{" "}
            <Link
              href="/about"
              className="font-semibold text-forest underline decoration-gold-300 decoration-2 underline-offset-4 hover:decoration-gold"
            >
              Kenali Surau Kami
            </Link>
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Selamat datang"
        title="Datang dan Kenali Kami"
        description="Kami mengalu-alukan semua pengunjung untuk menyertai aktiviti surau."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/donate", label: "Sumbang" }}
      />
    </>
  );
}
