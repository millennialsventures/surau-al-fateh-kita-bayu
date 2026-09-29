import { Container } from "./container";
import { Icon } from "./icon";

export interface MotivationBannerProps {
  onJoinClick?: () => void;
}

export function MotivationBanner({ onJoinClick }: MotivationBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#003813] text-white py-6 border-y border-gold-300/20">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Mosque silhouette + quote */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="hidden sm:flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-300/15 border border-gold-300/30 text-[#e5a823]">
              <Icon name="mosque" size={32} />
            </div>

            <div>
              <p className="italic font-serif text-lg sm:text-xl text-[#f4eeda] font-medium tracking-wide">
                &ldquo;Memakmurkan surau, memakmurkan ummah&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                Jom bersama-sama dalam setiap kebaikan.
              </p>
            </div>
          </div>

          {/* JOM SERTAI KAMI CTA */}
          <div className="shrink-0">
            {onJoinClick ? (
              <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#e5a823] px-6 py-3 text-xs sm:text-sm font-bold tracking-wider text-[#14201a] uppercase shadow-md transition-all hover:bg-[#d69b18] hover:shadow-lg active:scale-95"
              >
                <span>JOM SERTAI KAMI</span>
                <Icon name="users" size={16} />
              </button>
            ) : (
              <a
                href="https://wa.me/601126002945?text=Assalamualaikum%2C%20saya%20ingin%20menyertai%20aktiviti%20Surau%20Al-Fateh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#e5a823] px-6 py-3 text-xs sm:text-sm font-bold tracking-wider text-[#14201a] uppercase shadow-md transition-all hover:bg-[#d69b18] hover:shadow-lg active:scale-95"
              >
                <span>JOM SERTAI KAMI</span>
                <Icon name="users" size={16} />
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
