import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

interface ActivityCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const activitiesData: ActivityCardData[] = [
  {
    id: "gotong-royong",
    title: "Program Gotong-Royong",
    description: "Bersama menjayakan kerja-kerja pembersihan dan penyelenggaraan surau.",
    image: "/images/activity-gotong-royong.png",
    href: "/events",
  },
  {
    id: "mesyuarat-kariah",
    title: "Mesyuarat Ahli Kariah",
    description: "Perbincangan demi kemajuan surau dan komuniti.",
    image: "/images/activity-mesyuarat.png",
    href: "/events",
  },
  {
    id: "jamuan-ukhuwah",
    title: "Majlis Jamuan & Ukhuwah",
    description: "Merai ukhuwah melalui program kebersamaan.",
    image: "/images/activity-jamuan.png",
    href: "/events",
  },
  {
    id: "ceramah-khas",
    title: "Program Khas & Ceramah",
    description: "Menambah ilmu, memperkukuh iman.",
    image: "/images/activity-ceramah.png",
    href: "/events",
  },
];

export function ActivitiesSection() {
  return (
    <section id="aktiviti" className="py-16 sm:py-24 bg-[#004818] text-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-10 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                AKTIVITI
              </h2>
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#e5a823]">
                SURAU
              </span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-white/80">
              Pelbagai aktiviti dan program untuk masyarakat.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full bg-[#e5a823] px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#14201a] uppercase shadow-md transition-all hover:bg-[#d69b18] hover:shadow-lg active:scale-95 shrink-0"
          >
            <span>Lihat Semua Aktiviti</span>
            <span className="transition-transform group-hover:translate-x-1">➔</span>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activitiesData.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white text-[#14201a] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-mist">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold text-forest transition-colors group-hover:text-leaf">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
