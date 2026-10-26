"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { Icon } from "@/components/icon";
import {
  ACCEPTED_BANNER_MIME_TYPES,
  MAX_BANNER_FILE_SIZE,
  getBannerPublicUrl,
  type HeroBannerRecord,
} from "@/lib/hero-banners";
import {
  deleteBannerAction,
  moveBannerAction,
  toggleBannerActiveAction,
  uploadBannerAction,
} from "./actions";

interface BannersManagerProps {
  initialBanners: HeroBannerRecord[];
  isConfigured: boolean;
}

export function BannersManager({
  initialBanners,
  isConfigured,
}: BannersManagerProps) {
  const router = useRouter();
  const [banners, setBanners] = useState(initialBanners);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // router.refresh() re-fetches server data and passes a fresh initialBanners
  // array, but useState's initial value is only used on first mount — adjust
  // state during render (React's recommended pattern) so uploads/deletes/
  // reorders show up without a manual browser refresh.
  const [prevInitialBanners, setPrevInitialBanners] = useState(initialBanners);
  if (initialBanners !== prevInitialBanners) {
    setPrevInitialBanners(initialBanners);
    setBanners(initialBanners);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFormError(null);
    setPreviewUrl(null);

    if (!file) return;

    if (file.size > MAX_BANNER_FILE_SIZE) {
      setFormError("Saiz imej melebihi had maksimum 5MB.");
      e.target.value = "";
      return;
    }

    if (
      !ACCEPTED_BANNER_MIME_TYPES.includes(
        file.type as (typeof ACCEPTED_BANNER_MIME_TYPES)[number],
      )
    ) {
      setFormError("Format imej tidak disokong. Gunakan JPG, PNG atau WEBP.");
      e.target.value = "";
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await uploadBannerAction(formData);
      if (!res.success) {
        setFormError(res.message ?? "Gagal memuat naik banner.");
        return;
      }
      setPreviewUrl(null);
      fileInputRef.current?.form?.reset();
      router.refresh();
    });
  }

  function handleToggleActive(id: string, isActive: boolean) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, is_active: isActive } : b)),
    );
    startTransition(async () => {
      const res = await toggleBannerActiveAction(id, isActive);
      if (!res.success) {
        router.refresh();
      }
    });
  }

  function handleMove(id: string, direction: "up" | "down") {
    startTransition(async () => {
      await moveBannerAction(id, direction);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    setConfirmDeleteId(null);
    startTransition(async () => {
      await deleteBannerAction(id);
      router.refresh();
    });
  }

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-800">
        Ciri Banner memerlukan sambungan Supabase. Sila konfigurasikan{" "}
        <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
        <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
        untuk mengurus banner.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-hairline pb-6">
        <h1 className="font-display text-2xl font-bold text-forest">
          Pengurusan Banner
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-ink-soft">
          Muat naik, aktifkan/nyahaktifkan, padam dan susun semula banner
          carousel laman utama.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="space-y-4 rounded-2xl border border-hairline bg-white p-5 shadow-xs"
      >
        <h2 className="font-display text-base font-bold text-forest">
          Muat Naik Banner Baharu
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="banner_image"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest"
            >
              Imej Banner
            </label>
            <input
              ref={fileInputRef}
              id="banner_image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-xs text-ink file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-forest"
            />
            <p className="mt-1.5 text-[0.7rem] text-ink-soft">
              Disyorkan: 1920×1080px atau lebih, format JPG/PNG/WEBP, maksimum
              5MB.
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-hairline bg-sand">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Pratonton banner"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-ink-soft/60">
                <Icon name="image" size={28} />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="banner_alt"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest"
            >
              Teks Alt (Perihalan Imej)
            </label>
            <input
              id="banner_alt"
              name="altText"
              type="text"
              placeholder="Contoh: Majlis Sambutan Maulidur Rasul 2026"
              className="w-full rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          <div>
            <label
              htmlFor="banner_caption"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest"
            >
              Caption (Pilihan)
            </label>
            <input
              id="banner_caption"
              name="caption"
              type="text"
              placeholder="Teks ringkas dipaparkan atas banner"
              className="w-full rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>

        {formError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
            {formError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-forest-600 disabled:opacity-50"
        >
          <Icon name="upload" size={16} />
          {isPending ? "Memuat naik..." : "Muat Naik Banner"}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-base font-bold text-forest">
          Senarai Banner ({banners.length})
        </h2>

        {banners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-hairline bg-white p-8 text-center text-sm text-ink-soft">
            Tiada banner lagi. Muat naik banner pertama anda di atas.
          </div>
        ) : (
          <ul className="space-y-3">
            {banners.map((banner, index) => {
              const publicUrl = getBannerPublicUrl(banner.image_path);
              const isFirst = index === 0;
              const isLast = index === banners.length - 1;

              return (
                <li
                  key={banner.id}
                  className="flex flex-col gap-4 rounded-2xl border border-hairline bg-white p-4 shadow-xs sm:flex-row sm:items-center"
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-sand sm:w-48">
                    {publicUrl ? (
                      <Image
                        src={publicUrl}
                        alt={banner.alt_text || "Banner"}
                        fill
                        sizes="192px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-ink-soft/60">
                        <Icon name="image" size={24} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-forest">
                      {banner.alt_text || "(Tiada teks alt)"}
                    </p>
                    {banner.caption ? (
                      <p className="truncate text-xs text-ink-soft">
                        {banner.caption}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={banner.is_active}
                      onClick={() =>
                        handleToggleActive(banner.id, !banner.is_active)
                      }
                      className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                        banner.is_active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-mist text-ink-soft border border-hairline"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${banner.is_active ? "bg-emerald-600" : "bg-ink-soft/40"}`}
                      />
                      {banner.is_active ? "Aktif" : "Tidak Aktif"}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      aria-label="Naikkan susunan"
                      disabled={isFirst || isPending}
                      onClick={() => handleMove(banner.id, "up")}
                      className="flex size-8 items-center justify-center rounded-lg border border-hairline text-ink hover:bg-mist disabled:opacity-30"
                    >
                      <Icon
                        name="chevron-right"
                        size={16}
                        className="-rotate-90"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="Turunkan susunan"
                      disabled={isLast || isPending}
                      onClick={() => handleMove(banner.id, "down")}
                      className="flex size-8 items-center justify-center rounded-lg border border-hairline text-ink hover:bg-mist disabled:opacity-30"
                    >
                      <Icon
                        name="chevron-right"
                        size={16}
                        className="rotate-90"
                      />
                    </button>

                    {confirmDeleteId === banner.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDelete(banner.id)}
                          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-red-700"
                        >
                          Ya, Padam
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg border border-hairline px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-mist"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        aria-label="Padam banner"
                        onClick={() => setConfirmDeleteId(banner.id)}
                        className="flex size-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
