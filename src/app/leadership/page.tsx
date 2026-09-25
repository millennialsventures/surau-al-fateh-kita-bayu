import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { LeaderCard } from "@/components/leader-card";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { committee } from "@/content/leadership";

export const metadata: Metadata = {
  title: "Kepimpinan",
  description: "Ahli pengurusan dan ketua jabatan Surau Al-Fateh KITA.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  const hasConfirmedNames = committee.some((group) =>
    group.members.some((member) => !member.name.startsWith("TODO")),
  );

  return (
    <>
      <PageHeader
        eyebrow="Kepimpinan"
        title="Ahli Jawatankuasa"
        description="Mereka yang menguruskan hal ehwal surau dan bidang kerja masing-masing."
      />

      <Section spacing="lg">
        <Container>
          {!hasConfirmedNames ? (
            <div className="mb-10">
              <Placeholder
                label="Nama belum disahkan"
                hint="Butiran di bawah adalah tempat letak sementara. Jawatankuasa perlu mengemas kini nama sebenar sebelum laman ini diterbitkan."
                icon="users"
              />
            </div>
          ) : null}

          <div className="space-y-14">
            {committee.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-heading`}>
                <SectionHeading
                  id={`${group.id}-heading`}
                  title={group.title}
                  description={group.description}
                />

                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {group.members.map((member) => (
                    <li key={member.id}>
                      <LeaderCard leader={member} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-12">
            <Placeholder
              label="Gambar portrait"
              hint="Potret ahli jawatankuasa belum dihantar oleh pihak mereka."
              icon="sparkle"
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Hubungi"
        title="Nak berhubung dengan jawatankuasa?"
        description="Hubungi kami untuk pertanyaan tentang surau dan aktivitinya."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/about", label: "Tentang Surau" }}
      />
    </>
  );
}
