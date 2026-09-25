import Image from "next/image";

import { galleryCategories, type GalleryItem } from "@/content/gallery";

type GalleryGridProps = {
  items: readonly GalleryItem[];
};

function labelFor(category: GalleryItem["category"]) {
  return galleryCategories.find((entry) => entry.value === category)?.label ?? category;
}

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <figure className="group h-full overflow-hidden rounded-card border border-hairline bg-white">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-50">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-calm)] group-hover:scale-105"
                />
              ) : (
                <div className="pattern-geo flex size-full items-center justify-center">
                  <span className="rounded-full border border-dashed border-gold-300 bg-gold-50 px-4 py-1.5 text-xs font-medium text-gold">
                    Foto belum tersedia
                  </span>
                </div>
              )}

              <span className="absolute top-3 left-3 rounded-full bg-forest/90 px-3 py-1 text-xs font-medium text-white">
                {labelFor(item.category)}
              </span>
            </div>

            <figcaption className="p-5">
              <h3 className="font-display text-base font-semibold text-forest">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.caption}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
