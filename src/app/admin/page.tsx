import type { Metadata } from "next";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { fetchKariahRegistrations, isUserAdmin } from "./actions";
import { AdminDashboard } from "./admin-dashboard";

export const metadata: Metadata = {
  title: "Panel Pentadbir",
  description: "Panel pengurusan dalaman Surau Al-Fateh Kita Bayu Cybersouth.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isUserAdmin();
  const { records, isDemoMode } = authenticated
    ? await fetchKariahRegistrations()
    : { records: [], isDemoMode: false };

  return (
    <Section tone="sand" spacing="lg">
      <Container>
        <AdminDashboard
          initialAuthenticated={authenticated}
          initialRecords={records}
          isDemoMode={isDemoMode}
        />
      </Container>
    </Section>
  );
}
