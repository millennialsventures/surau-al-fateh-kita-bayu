import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { DonateCard } from "@/components/donate-card";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Derma & Infaq",
  description: "Cara menyumbangkan derma dan infaq kepada Surau Al-Fateh Kita Bayu Cybersouth.",
  alternates: { canonical: "/donate" },
};

const uses = [
  {
    title: "Penyelenggaraan surau",
    description: "Membiayai kos utiliti, kebersihan, pembaikan fasiliti dan pendingin hawa dewan solat.",
  },
  {
    title: "Program pendidikan & dakwah",
    description: "Elaun guru pengajian, pembelian kitab, naskhah Al-Quran dan penganjuran bengkel ilmu.",
  },
  {
    title: "Kebajikan & ukhuwah",
    description: "Bantuan asnaf setempat, jamuan iftar Ramadan, aktiviti belia dan khairat kematian.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Infaq & Sedekah"
        title="Sumbang kepada Surau"
        description="Setiap sumbangan ikhlas anda amat bermakna buat kelangsungan dakwah dan operasi Surau Al-Fateh."
      />

      {/* Cara Menyumbang: DuitNow QR & Bank Transfer */}
      <Section tone="white" spacing="lg">
        <Container>
          <SectionHeading
            title="Kaedah Sumbangan Rasmi"
            description="Imbas kod QR DuitNow melalui aplikasi bank pilihan anda atau lakukan pemindahan dalam talian."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
            {/* DuitNow QR Poster Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="overflow-hidden rounded-3xl border-2 border-hairline bg-white p-4 shadow-xl max-w-sm w-full text-center">
                <div className="relative aspect-[818/1280] w-full rounded-2xl overflow-hidden bg-sand">
                  <Image
                    src="/images/duitnow-qr.jpg"
                    alt="DuitNow QR Rasmi Surau Al-Fateh"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
                <div className="mt-4 pt-3 border-t border-hairline">
                  <a
                    href="/images/duitnow-qr.jpg"
                    download="DuitNow-QR-Surau-Al-Fateh.jpg"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-forest-600 transition-colors"
                  >
                    <Icon name="download" size={14} />
                    <span>Muat Turun Kod QR</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bank Transfer & Maklumat Akaun */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-hairline bg-sand p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 text-forest">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-100 text-forest">
                    <Icon name="wallet" size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-forest">
                      Pindahan Bank Dalam Talian (IBFT / DuitNow)
                    </h3>
                    <p className="text-xs text-ink-soft">Akaun rasmi Surau Al-Fateh</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 border border-hairline divide-y divide-hairline">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-1">
                    <span className="text-xs text-ink-soft font-medium">Bank</span>
                    <span className="font-display text-base font-bold text-forest">
                      Maybank Islamic
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1">
                    <span className="text-xs text-ink-soft font-medium">Nombor Akaun</span>
                    <span className="font-display text-xl font-extrabold text-forest tracking-wider select-all">
                      5660 1066 5759
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 gap-1">
                    <span className="text-xs text-ink-soft font-medium">Nama Pemegang Akaun</span>
                    <span className="font-bold text-ink text-sm">
                      SURAU AL-FATEH
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-xs text-ink-soft leading-relaxed space-y-1">
                  <p>&bull; Sila letakkan rujukan transaksi seperti: <strong>INFAQ</strong>, <strong>KHAIRAT</strong>, atau <strong>SEDEKAH</strong>.</p>
                  <p>&bull; Resit sumbangan boleh dihantar kepada Bendahari melalui WhatsApp untuk rekod audit.</p>
                </div>
              </div>

              {/* Kotak Tabung Surau & Sumbangan Tunai */}
              <div className="rounded-3xl border border-hairline bg-sand p-6 shadow-sm flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold">
                  <Icon name="mosque" size={22} />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-forest">
                    Tabung Fizikal di Surau
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    Jemaah juga boleh menyalurkan sumbangan tunai secara terus ke dalam tabung bergerak semasa solat Jumaat atau tabung tetap di pintu dewan solat Surau Al-Fateh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kegunaan Derma */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            title="Kegunaan Derma &amp; Infaq"
            description="Setiap ringgit yang diamanahkan diagihkan secara telus demi manfaat bersama."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uses.map((use) => (
              <li key={use.title}>
                <DonateCard
                  title={use.title}
                  description={use.description}
                  actionHref="/contact"
                  actionLabel="Hubungi kami"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Jazakumullah Khairan"
        title="Terima Kasih Atas Sumbangan Anda"
        description="Semoga setiap sumbangan menjadi amal jariah yang berpanjangan dan diberkati Allah SWT."
        primary={{ href: "/contact", label: "Hubungi Surau" }}
        secondary={{ href: "/about", label: "Tentang Surau" }}
      />
    </>
  );
}
