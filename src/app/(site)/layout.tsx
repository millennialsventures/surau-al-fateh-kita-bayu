import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppFloat } from "@/components/whatsapp-float";

/** Public site chrome — the admin panel lives outside this group. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
