import { Icon } from "./icon";

export function WhatsAppFloat() {
  return (
    <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/601126002945?text=Assalamualaikum%20Surau%20Al-Fateh%2C%20saya%20ingin%20bertanya%20mengenai"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami melalui WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] active:scale-95"
      >
        {/* Soft pulse effect */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none"
          aria-hidden="true"
        />

        <Icon name="whatsapp" size={32} className="relative transition-transform group-hover:rotate-12" />
      </a>
    </aside>
  );
}
