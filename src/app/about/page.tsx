import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { StatRow } from "@/components/stat-row";
import { programs } from "@/content/programs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Mengenai Surau Al-Fateh KITA, rumah ibadah komuniti di Bayu Cybersouth, Cyberjaya.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: "book" as const,
    title: "Ibadah",
    body: "Solat lima waktu secara berjamaah setiap hari.",
  },
  {
    icon: "users" as const,
    title: "Pendidikan",
    body: "Kelas Al-Quran dan majlis ilmah untuk semua peringkat umur.",
  },
  {
    icon: "heart" as const,
    title: "Kemasyarakatan",
    body: "Program bantuan sosial untuk warga yang memerlukan.",
  },
];

const stats = [
  { value: String(programs.length), label: "Program tetap" },
  { value: "5", label: "Waktu solat setiap hari" },
  { value: "0", label: "Yuran keahlian" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang"
        title="Mengenai Surau Al-Fateh KITA"
        description="Rumah ibadah komuniti di Bayu Cybersouth, Cyberjaya."
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                title="Visi dan Misi"
                description="Tempat untuk beribadah, belajar dan berkhidmat bersama."
              />

              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
                <p>Surau ini ditubuhkan untuk penduduk di Bayu Cybersouth dan kawasan sekitar.</p>
                <p>
                  Matlamat kami ialah menyediakan tempat yang santun dan terbuka untuk semua
                  lapisan masyarakat.
                </p>
                <p>
                  Semua pengunjung dialu-alukan untuk datang, sama ada untuk solat berjamaah,
                  mengaji atau sekadar bersantai.
                </p>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <li key={pillar.title} className="rounded-card border border-hairline bg-white p-5">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-leaf">
                      <Icon name={pillar.icon} size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-forest">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-card border border-hairline bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-forest">Ringkasan</h2>
                <StatRow stats={stats} className="mt-5 gap-5" />
              </div>

              <div className="mt-6 space-y-5">
                <Placeholder
                  label="Sejarah surau"
                  hint="Tarikh penubuhan dan kronologi singkat belum disediakan."
                  icon="calendar"
                />
                <Placeholder
                  label="Status pendaftaran"
                  hint="Status pendaftaran belum disahkan oleh jawatankuasa."
                  icon="shield"
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Lokasi"
            title="Bertempat di Bayu Cybersouth"
            description={site.shortDescription}
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            Alamat penuh, arah perjalanan dan maklumat hubungan boleh dilihat di halaman hubungi.
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Soalan"
        title="Ada pertanyaan?"
        description="Hubungi jawatankuasa untuk maklumat lanjut tentang surau."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/leadership", label: "Kenali Jawatankuasa" }}
      />
    </>
  );
}
