import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { KariahForm } from "./kariah-form";

export const metadata: Metadata = {
  title: "Pendaftaran Ahli Kariah",
  description:
    "Borang pendaftaran rasmi ahli kariah Surau Al-Fateh, Kita Bayu Cybersouth Dengkil Selangor.",
  alternates: { canonical: "/daftar-kariah" },
};

export default function DaftarKariahPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pendaftaran Rasmi"
        title="Daftar Ahli Kariah"
        description="Pendaftaran rasmi kariah Masjid dan Surau Negeri Selangor bagi seluruh warga komuniti Kita Bayu Cybersouth."
      />

      <Section tone="sand" spacing="lg">
        <Container>
          <KariahForm />
        </Container>
      </Section>
    </>
  );
}
