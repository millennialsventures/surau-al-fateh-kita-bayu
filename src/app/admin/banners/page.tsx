import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { isUserAdmin } from "../actions";
import { fetchBanners } from "./actions";
import { BannersManager } from "./banners-manager";

export const metadata: Metadata = {
  title: "Banner — Panel Pentadbir",
  description: "Pengurusan banner hero laman utama Surau Al-Fateh Kita Bayu Cybersouth.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    redirect("/admin");
  }

  const { banners, isConfigured } = await fetchBanners();

  return (
    <Section tone="sand" spacing="lg">
      <Container>
        <BannersManager initialBanners={banners} isConfigured={isConfigured} />
      </Container>
    </Section>
  );
}
