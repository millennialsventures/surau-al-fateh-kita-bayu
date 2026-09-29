import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { LeaderCard } from "@/components/leader-card";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { committee, organizationChart } from "@/content/leadership";

export const metadata: Metadata = {
  title: "Kepimpinan",
  description: "Carta organisasi dan barisan ahli jawatankuasa Surau Al-Fateh KITA Bayu sesi 2024 / 2026.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  const { pengerusi, timbalanPengerusi, eksekutif, timbalanEksekutif, pemeriksaKiraKira, pegawaiSurau, ahliJawatankuasa } = organizationChart;

  return (
    <>
      <PageHeader
        eyebrow="Kepimpinan"
        title="Ahli Jawatankuasa"
        description="Carta organisasi dan saf kepimpinan Surau Al-Fateh KITA Bayu sesi 2024 / 2026."
      />

      {/* 1. Visual Organization Chart Section (Modeled after the Official Poster) */}
      <Section spacing="lg" className="overflow-hidden">
        <Container>
          <div className="rounded-2xl border border-hairline bg-gradient-to-b from-brand-50/40 via-white to-white p-4 shadow-sm sm:p-8 lg:p-10">
            {/* Poster Header */}
            <header className="mb-10 text-center sm:mb-12">
              <span className="inline-block rounded-full bg-gold-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold border border-gold-300/60">
                Sesi 2024 / 2026
              </span>
              <h2 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-forest sm:text-2xl lg:text-3xl">
                Ahli Jawatankuasa Surau Al-Fateh KITA Bayu
              </h2>
              <p className="mt-2 text-sm text-ink-soft sm:text-base">
                Struktur organisasi saf pentadbiran, pegawai surau dan barisan jawatankuasa
              </p>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold-300" />
            </header>

            {/* 3-Column Chart Layout (Desktop: Left = Pegawai, Center = Pengurusan, Right = AJK; Mobile: Pengurusan first) */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6 xl:gap-8">
              
              {/* === SAYAP KIRI: IMAM, BILAL & SIAK === */}
              <div className="order-2 flex flex-col rounded-xl border border-hairline bg-white/80 p-4 shadow-xs sm:p-5 lg:order-1 lg:col-span-3 xl:col-span-3">
                <div className="mb-5 text-center">
                  <span className="inline-block rounded-full bg-[#f6ebc9] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest border border-gold-300 shadow-xs">
                    Imam, Bilal &amp; Siak
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Kumpulan Imam */}
                  <div>
                    <h3 className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-leaf">
                      Pegawai Imam
                    </h3>
                    <div className="grid gap-2.5">
                      {pegawaiSurau.imams.map((imam) => (
                        <LeaderCard key={imam.id} leader={imam} variant="compact" />
                      ))}
                    </div>
                  </div>

                  {/* Kumpulan Bilal */}
                  <div>
                    <h3 className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-leaf">
                      Pegawai Bilal
                    </h3>
                    <div className="grid gap-2.5">
                      {pegawaiSurau.bilals.map((bilal) => (
                        <LeaderCard key={bilal.id} leader={bilal} variant="compact" />
                      ))}
                    </div>
                  </div>

                  {/* Kumpulan Siak */}
                  <div>
                    <h3 className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-leaf">
                      Pegawai Siak
                    </h3>
                    <div className="grid gap-2.5">
                      {pegawaiSurau.siaks.map((siak) => (
                        <LeaderCard key={siak.id} leader={siak} variant="compact" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* === PUSAT: PENGURUSAN UTAMA & PEMERIKSA KIRA-KIRA === */}
              <div className="order-1 flex flex-col rounded-xl border border-forest/15 bg-white p-4 shadow-xs sm:p-6 lg:order-2 lg:col-span-6 xl:col-span-6">
                <div className="mb-6 text-center">
                  <span className="inline-block rounded-full bg-forest px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-xs">
                    Pengurusan Tertinggi
                  </span>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  {/* 1. Pengerusi */}
                  <div className="w-full max-w-md">
                    <LeaderCard leader={pengerusi} variant="featured" align="center" />
                  </div>

                  {/* Connector Line */}
                  <div className="h-4 w-0.5 bg-gold-300" aria-hidden="true" />

                  {/* 2. Timbalan Pengerusi */}
                  <div className="w-full max-w-sm">
                    <LeaderCard leader={timbalanPengerusi} variant="featured" align="center" />
                  </div>

                  {/* Connector Line */}
                  <div className="h-4 w-0.5 bg-gold-300" aria-hidden="true" />

                  {/* 3. Bendahari & Setiausaha */}
                  <div className="grid w-full gap-3 sm:grid-cols-2">
                    {eksekutif.map((item) => (
                      <LeaderCard key={item.id} leader={item} variant="default" />
                    ))}
                  </div>

                  {/* Connector Line */}
                  <div className="h-3 w-0.5 bg-brand-200" aria-hidden="true" />

                  {/* 4. Timbalan Bendahari & Timbalan Setiausaha */}
                  <div className="grid w-full gap-3 sm:grid-cols-2">
                    {timbalanEksekutif.map((item) => (
                      <LeaderCard key={item.id} leader={item} variant="default" />
                    ))}
                  </div>

                  {/* Separator to Pemeriksa Kira-kira */}
                  <div className="my-2 w-full pt-4">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-hairline" />
                      </div>
                      <span className="relative bg-white px-3 text-xs font-semibold uppercase tracking-wider text-gold">
                        Pemeriksa Kira-kira
                      </span>
                    </div>
                  </div>

                  {/* 5. Pemeriksa Kira-kira */}
                  <div className="grid w-full gap-3 sm:grid-cols-2">
                    {pemeriksaKiraKira.map((item) => (
                      <LeaderCard key={item.id} leader={item} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>

              {/* === SAYAP KANAN: AHLI JAWATANKUASA === */}
              <div className="order-3 flex flex-col rounded-xl border border-hairline bg-white/80 p-4 shadow-xs sm:p-5 lg:order-3 lg:col-span-3 xl:col-span-3">
                <div className="mb-5 text-center">
                  <span className="inline-block rounded-full bg-[#f6ebc9] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest border border-gold-300 shadow-xs">
                    Ahli Jawatankuasa
                  </span>
                </div>

                <div className="grid gap-2.5">
                  {ahliJawatankuasa.map((ajk) => (
                    <LeaderCard key={ajk.id} leader={ajk} variant="compact" />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Breakdown Section by Category */}
      <Section tone="white" spacing="lg">
        <Container>
          <div className="mb-8">
            <SectionHeading
              eyebrow="Senarai Lengkap"
              title="Perincian Mengikut Bahagian"
              description="Senarai penuh 22 ahli jawatankuasa dan pegawai mengikut bahagian tugasan rasmi."
            />
          </div>

          <div className="space-y-12">
            {committee.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-heading`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-hairline pb-3">
                  <div>
                    <h3 id={`${group.id}-heading`} className="font-display text-lg sm:text-xl font-bold text-forest">
                      {group.title}
                    </h3>
                    <p className="text-sm text-ink-soft">{group.description}</p>
                  </div>
                  {group.badge ? (
                    <span className="self-start sm:self-auto rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-leaf">
                      {group.badge}
                    </span>
                  ) : null}
                </div>

                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member) => (
                    <li key={member.id}>
                      <LeaderCard leader={member} variant="default" />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Hubungi"
        title="Nak berhubung dengan jawatankuasa?"
        description="Hubungi kami untuk sebarang pertanyaan tentang surau, program dan aktivitinya."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/about", label: "Tentang Surau" }}
      />
    </>
  );
}

