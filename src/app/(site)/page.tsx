import { AboutSection } from "@/components/about-section";
import { ActivitiesSection } from "@/components/activities-section";
import { BottomInfaqBanner } from "@/components/bottom-infaq-banner";
import { HeroBannerCarousel } from "@/components/hero-banner-carousel";
import { MotivationBanner } from "@/components/motivation-banner";
import { PrayerTimesSection } from "@/components/prayer-times-section";
import { QuranSection } from "@/components/quran-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { fetchActiveBanners } from "@/lib/hero-banners";
import { getTodayPrayerTimes } from "@/lib/prayer-times";

export const revalidate = 1800; // Refresh every 30 minutes for prayer times

export default async function HomePage() {
  const [schedule, banners] = await Promise.all([
    getTodayPrayerTimes("SGR01"),
    fetchActiveBanners(),
  ]);

  return (
    <>
      {/* 1. Hero Section */}
      <HeroBannerCarousel banners={banners} />

      {/* 2. Motivation Banner */}
      <MotivationBanner />

      {/* 3. Tentang Surau Al-Fateh */}
      <AboutSection />

      {/* 4. Perkhidmatan & Maklumat Kami (11 Interactive Cards & Modals) */}
      <ServicesSection />

      {/* 5. Aktiviti Surau (Green Container with 4 Cards) */}
      <ActivitiesSection />

      {/* 6. Waktu Solat Automatik (Zon SGR01) */}
      <PrayerTimesSection schedule={schedule} />

      {/* 7. Ayat Al-Quran Pilihan (Interactive Carousel) */}
      <QuranSection />

      {/* 8. Kata Kariah (Testimoni) */}
      <TestimonialsSection />

      {/* 9. Jom Bersama Memakmurkan Surau (Infaq Banner) */}
      <BottomInfaqBanner />
    </>
  );
}
