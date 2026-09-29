import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { Icon } from "./icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-white text-ink">
      {/* Upper Footer (White) */}
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Col 1: Logo & Identity */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo-ek-kitabayu.png"
                alt="Logo Surau Al-Fateh"
                width={56}
                height={56}
                className="size-14 shrink-0 object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold tracking-tight text-forest">
                  AL-FATEH
                </span>
                <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-leaf uppercase">
                  KITA BAYU CYBERSOUTH
                </span>
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-ink-soft leading-relaxed max-w-sm">
              Rumah ibadah dan pusat ilmu komuniti Kita Bayu Cybersouth. Wadah pengukuhan ukhuwah
              serta kebajikan warga kariah.
            </p>
          </div>

          {/* Col 2: Address & Contact Details */}
          <div className="md:col-span-5 lg:col-span-5 space-y-3.5 text-xs sm:text-sm text-ink-soft">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-forest shrink-0">
                <Icon name="map-pin" size={18} />
              </span>
              <div>
                <p className="font-semibold text-forest">Surau Al-Fateh</p>
                <p>Kita Bayu Cybersouth, Selangor</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-forest shrink-0">
                <Icon name="phone" size={18} />
              </span>
              <a
                href="tel:01126002945"
                className="hover:text-forest transition-colors font-medium text-ink"
              >
                011-2600 2945
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-forest shrink-0">
                <Icon name="mail" size={18} />
              </span>
              <a
                href="mailto:suraualfateh@kcb.com"
                className="hover:text-forest transition-colors font-medium text-ink"
              >
                suraualfateh@kcb.com
              </a>
            </div>
          </div>

          {/* Col 3: Ikuti Kami */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-forest uppercase tracking-wider">
              Ikuti Kami
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Surau Al-Fateh"
                className="size-9 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
              >
                <Icon name="facebook" size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Surau Al-Fateh"
                className="size-9 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
              >
                <Icon name="instagram" size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Surau Al-Fateh"
                className="size-9 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
              >
                <Icon name="youtube" size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Surau Al-Fateh"
                className="size-9 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
              >
                <Icon name="tiktok" size={16} />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Sub-Footer Bar (Dark Green) */}
      <div className="bg-[#003813] py-4 text-white text-xs border-t border-white/10">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-white/80">
              &copy; {year} Surau Al-Fateh (Kita Bayu Cybersouth). Hak Cipta Terpelihara.
            </p>
            <div className="flex items-center gap-4 text-white/80">
              <Link href="/about" className="hover:text-gold-300 transition-colors">
                Dasar Privasi
              </Link>
              <span>|</span>
              <Link href="/about" className="hover:text-gold-300 transition-colors">
                Terma Penggunaan
              </Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-gold-300 transition-colors">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
