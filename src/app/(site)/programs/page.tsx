import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { ProgramCard } from "@/components/program-card";
import { Section } from "@/components/section";
import { programs } from "@/content/programs";

export const metadata: Metadata = {
  title: "Program",
  description:
    "Program tetap Surau Al-Fateh KITA: solat berjamaah, kelas Al-Quran, majlis ilmah dan bantuan sosial.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Program"
        title="Program Surau"
        description="Program tetap yang berjalan sepanjang tahun. Semua orang dialu-alukan."
      />

      <Section spacing="lg">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.id}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Placeholder
              label="Tiada pendaftaran diperlukan"
              hint="Hadir terus di waktu yang ditetapkan. Sila hubungi kami jika anda memerlukan bantuan khusus."
              icon="users"
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Sertai"
        title="Mahu menyertai program?"
        description="Hubungi kami untuk pertanyaan tentang waktu dan tempat."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/events", label: "Lihat Aktiviti" }}
      />
    </>
  );
}
