import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { DonateCard } from "@/components/donate-card";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Derma",
  description: "Cara menyumbangkan derma kepada Surau Al-Fateh KITA.",
  alternates: { canonical: "/donate" },
};

const uses = [
  {
    title: "Penyelenggaraan surau",
    description: "Baiki bangunan, elektrik dan air.",
  },
  {
    title: "Program pendidikan",
    description: "Buku, alat tulis dan bahan bacaan Al-Quran.",
  },
  {
    title: "Bantuan sosial",
    description: "Sumbangan kepada warga yang memerlukan.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Derma"
        title="Sumbang kepada Surau"
        description="Setiap sumbangannya membantu kami meneruskan program surau."
      />

      <Section spacing="lg">
        <Container>
          <SectionHeading
            title="Kegunaan Derma"
            description="Dana digunakan untuk keperluan surau dan komuniti."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uses.map((use) => (
              <li key={use.title}>
                <DonateCard
                  title={use.title}
                  description={use.description}
                  actionHref="/contact"
                  actionLabel="Tanya cara menyumbang"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container>
          <SectionHeading
            title="Cara Menyumbang"
            description="Laman ini tidak memproses pembayaran. Sila gunakan cara yang paling mudah untuk anda."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Placeholder
              label="DuitNow"
              hint="Nombor DuitNow akan dipaparkan di sini selepas diperoleh daripada bendahari."
              icon="wallet"
            />
            <Placeholder
              label="Bank transfer"
              hint="Butiran akaun bank akan dipaparkan di sini selepas disahkan."
              icon="wallet"
            />
            <Placeholder
              label="Kod QR"
              hint="Kod QR DuitNow akan diletakkan di sini."
              icon="sparkle"
            />
            <Placeholder
              label="Sumbangan lain"
              hint="Boleh juga disumbangkan secara langsung kepada bendahari."
              icon="heart"
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Terima kasih"
        title="Terima kasih"
        description="Doa dan sokongan anda sangat dihargai oleh warga surau."
        primary={{ href: "/contact", label: "Hubungi Surau" }}
        secondary={{ href: "/about", label: "Tentang Surau" }}
      />
    </>
  );
}
