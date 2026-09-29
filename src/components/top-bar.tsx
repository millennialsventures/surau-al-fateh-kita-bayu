import { site } from "@/lib/site";
import { Container } from "./container";
import { Icon } from "./icon";

export function TopBar() {
  return (
    <div className="bg-[#004818] text-white text-xs border-b border-white/10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 gap-2">
          {/* Slogan */}
          <div className="text-center sm:text-left text-white/90 font-medium tracking-wide">
            <span>Surau Al-Fateh (Kita Bayu Cybersouth)</span>
            <span className="hidden md:inline mx-2 text-gold-300">|</span>
            <span className="hidden md:inline text-white/80">Rumah Ibadah, Pusat Ilmu, Asas Ukhuwah</span>
          </div>

          {/* Social icons & Phone */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-white/85">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Surau Al-Fateh"
                className="hover:text-gold-300 transition-colors p-0.5"
              >
                <Icon name="facebook" size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Surau Al-Fateh"
                className="hover:text-gold-300 transition-colors p-0.5"
              >
                <Icon name="instagram" size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Surau Al-Fateh"
                className="hover:text-gold-300 transition-colors p-0.5"
              >
                <Icon name="youtube" size={14} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Surau Al-Fateh"
                className="hover:text-gold-300 transition-colors p-0.5"
              >
                <Icon name="tiktok" size={14} />
              </a>
            </div>

            <span className="h-3 w-px bg-white/20" aria-hidden="true" />

            <a
              href="tel:01126002945"
              className="inline-flex items-center gap-1.5 font-medium text-white hover:text-gold-300 transition-colors"
            >
              <Icon name="phone" size={13} className="text-gold-300" />
              <span>{site.contact.phoneDisplay || "011-2600 2945"}</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
