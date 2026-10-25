import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/page-header";
import { Placeholder } from "@/components/placeholder";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { gallery, galleryCategories } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Gambar aktiviti dan kegiatan Surau Al-Fateh KITA.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const hasPhotos = gallery.some((item) => item.image !== null);

  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Gambar Aktiviti"
        description="Rangkaian aktiviti dan kegiatan komuniti surau."
      />

      <Section spacing="lg">
        <Container>
          <SectionHeading
            title="Koleksi"
            description="Gambar akan ditambah secara berkala oleh jawatankuasa."
          />

          <ul className="mt-8 flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <li
                key={category.value}
                className="rounded-full border border-hairline bg-white px-4 py-1.5 text-sm text-ink-soft"
              >
                {category.label}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <GalleryGrid items={gallery} />
          </div>

          {!hasPhotos ? (
            <div className="mt-10">
              <Placeholder
                label="Foto belum tersedia"
                hint="Galeri ini akan diisi selepas jawatankuasa menghantar gambar."
                icon="sparkle"
              />
            </div>
          ) : null}
        </Container>
      </Section>

      <CtaBand
        eyebrow="Galeri"
        title="Ada gambar untuk dicadangkan?"
        description="Sila hubungi kami untuk membincangkan penggunaan gambar aktiviti."
        primary={{ href: "/contact", label: "Hubungi Kami" }}
        secondary={{ href: "/about", label: "Tentang Surau" }}
      />
    </>
  );
}
