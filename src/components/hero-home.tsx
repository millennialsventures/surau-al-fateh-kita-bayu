import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { Icon } from "./icon";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#063f18] via-[#004818] to-[#022e11] text-white py-14 sm:py-20 lg:py-24">
      {/* Decorative Islamic arch watermark in background */}
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 size-[500px] rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-0 size-[400px] rounded-full bg-amber-400/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] !text-white">
              Surau Al-Fateh
              <span className="block mt-2 text-[#e5a823] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Kita Bayu Cybersouth
              </span>
            </h1>

            <p className="mt-5 font-semibold text-lg sm:text-xl text-white/95 leading-snug">
              Bersama Membina Masyarakat Berilmu, Beramal dan Bersatu
            </p>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
              Surau Al-Fateh merupakan pusat ibadah, pendidikan dan kebajikan komuniti di Kita Bayu Cybersouth.
              Mari bersama memakmurkan surau kita.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#tentang"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-forest uppercase shadow-lg transition-all hover:bg-gold-50 hover:shadow-xl active:scale-95"
              >
                <span>KETAHUI LEBIH LANJUT</span>
                <span className="flex size-6 items-center justify-center rounded-full bg-forest text-white transition-transform group-hover:translate-x-1">
                  <Icon name="arrow-right" size={13} />
                </span>
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                <Icon name="heart" size={16} className="text-[#e5a823]" />
                <span>Infaq Surau</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Framed Photo */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Photo Frame with subtle shadow and rounded corners */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl bg-forest-600/40">
                <Image
                  src="/images/hero-group.png"
                  alt="Komuniti Surau Al-Fateh Kita Bayu Cybersouth"
                  width={600}
                  height={550}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
