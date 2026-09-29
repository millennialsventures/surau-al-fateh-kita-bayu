import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { Icon } from "./icon";

export function AboutSection() {
  return (
    <section id="tentang" className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-forest">
                TENTANG
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#b8860b]">
                SURAU AL-FATEH
              </span>
            </div>

            <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-forest leading-snug">
              Rumah Ibadah, Pusat Ilmu, Asas Ukhuwah
            </h2>

            <p className="mt-5 text-ink-soft leading-relaxed text-sm sm:text-base">
              Surau Al-Fateh (Kita Bayu Cybersouth) merupakan tempat ibadah dan pusat aktiviti
              kemasyarakatan yang berperanan dalam membina masyarakat berilmu, berakhlak dan bersatu
              padu. Surau ini menjadi wadah utama untuk solat berjemaah, kelas ilmu, program dakwah,
              kebajikan serta pelbagai aktiviti yang memberi manfaat kepada semua lapisan masyarakat di
              kawasan Kita Bayu Cybersouth.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-forest px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-forest-600 hover:shadow-lg active:scale-95"
              >
                <span>KETAHUI LEBIH LANJUT TENTANG KAMI</span>
                <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-1">
                  <Icon name="arrow-right" size={13} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Photo Card */}
              <div className="overflow-hidden rounded-2xl border border-hairline bg-sand shadow-xl">
                <Image
                  src="/images/about-ustaz.png"
                  alt="Kuliah Ilmu Surau Al-Fateh"
                  width={450}
                  height={380}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
