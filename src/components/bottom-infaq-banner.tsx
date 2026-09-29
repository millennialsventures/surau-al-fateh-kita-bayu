import Link from "next/link";
import { Container } from "./container";
import { Icon } from "./icon";

export interface BottomInfaqBannerProps {
  onInfaqClick?: () => void;
}

export function BottomInfaqBanner({ onInfaqClick }: BottomInfaqBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#003813] text-white py-8 border-t border-gold-300/20">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Mosque silhouette illustration + Text */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="hidden sm:flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-300/15 border border-gold-300/30 text-[#e5a823]">
              <Icon name="mosque" size={32} />
            </div>

            <div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-wide uppercase text-white">
                JOM BERSAMA MEMAKMURKAN SURAU
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/80">
                Setiap sumbangan anda amat bermakna buat kelangsungan aktiviti surau.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="shrink-0">
            {onInfaqClick ? (
              <button
                type="button"
                onClick={onInfaqClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#e5a823] px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-[#14201a] uppercase shadow-lg transition-all hover:bg-[#d69b18] hover:shadow-xl active:scale-95"
              >
                <span>BERINFAQ SEKARANG</span>
                <span>💛</span>
              </button>
            ) : (
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#e5a823] px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-[#14201a] uppercase shadow-lg transition-all hover:bg-[#d69b18] hover:shadow-xl active:scale-95"
              >
                <span>BERINFAQ SEKARANG</span>
                <span>💛</span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
