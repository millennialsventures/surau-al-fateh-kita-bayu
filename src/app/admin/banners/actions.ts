"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { getAdminSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  ACCEPTED_BANNER_MIME_TYPES,
  BANNER_BUCKET,
  MAX_BANNER_FILE_SIZE,
  type HeroBannerRecord,
} from "@/lib/hero-banners";
import { isUserAdmin } from "../actions";

interface ActionResult {
  success: boolean;
  message?: string;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
}

function revalidateBannerPaths() {
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function fetchBanners(): Promise<{
  banners: HeroBannerRecord[];
  isConfigured: boolean;
}> {
  const authenticated = await isUserAdmin();
  if (!authenticated || !isSupabaseConfigured()) {
    return { banners: [], isConfigured: false };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { banners: [], isConfigured: false };
  }

  const { data, error } = await supabase
    .from("hero_banners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return { banners: [], isConfigured: true };
  }

  return { banners: data as HeroBannerRecord[], isConfigured: true };
}

export async function uploadBannerAction(formData: FormData): Promise<ActionResult> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { success: false, message: "Akses tidak dibenarkan." };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Gagal menghubungkan pangkalan data." };
  }

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Sila pilih imej banner untuk dimuat naik." };
  }

  if (file.size > MAX_BANNER_FILE_SIZE) {
    return { success: false, message: "Saiz imej melebihi had maksimum 5MB." };
  }

  if (!ACCEPTED_BANNER_MIME_TYPES.includes(file.type as (typeof ACCEPTED_BANNER_MIME_TYPES)[number])) {
    return { success: false, message: "Format imej tidak disokong. Gunakan JPG, PNG atau WEBP." };
  }

  const altText = String(formData.get("altText") ?? "").trim();
  const captionRaw = formData.get("caption");
  const caption = typeof captionRaw === "string" && captionRaw.trim() ? captionRaw.trim() : null;

  const path = `${randomUUID()}-${sanitizeFilename(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from(BANNER_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { success: false, message: uploadError.message };
  }

  const { data: maxRow } = await supabase
    .from("hero_banners")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextSortOrder = (maxRow?.sort_order ?? -1) + 1;

  const { error: insertError } = await supabase.from("hero_banners").insert({
    image_path: path,
    alt_text: altText,
    caption,
    is_active: true,
    sort_order: nextSortOrder,
  });

  if (insertError) {
    await supabase.storage.from(BANNER_BUCKET).remove([path]);
    return { success: false, message: insertError.message };
  }

  revalidateBannerPaths();
  return { success: true };
}

export async function toggleBannerActiveAction(id: string, isActive: boolean): Promise<ActionResult> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { success: false, message: "Akses tidak dibenarkan." };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Gagal menghubungkan pangkalan data." };
  }

  const { error } = await supabase.from("hero_banners").update({ is_active: isActive }).eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateBannerPaths();
  return { success: true };
}

export async function deleteBannerAction(id: string): Promise<ActionResult> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { success: false, message: "Akses tidak dibenarkan." };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Gagal menghubungkan pangkalan data." };
  }

  const { data: row } = await supabase
    .from("hero_banners")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (row?.image_path) {
    await supabase.storage.from(BANNER_BUCKET).remove([row.image_path]);
  }

  const { error } = await supabase.from("hero_banners").delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidateBannerPaths();
  return { success: true };
}

export async function moveBannerAction(id: string, direction: "up" | "down"): Promise<ActionResult> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { success: false, message: "Akses tidak dibenarkan." };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Gagal menghubungkan pangkalan data." };
  }

  const { data: banners, error } = await supabase
    .from("hero_banners")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !banners) {
    return { success: false, message: error?.message ?? "Gagal memuatkan senarai banner." };
  }

  const currentIndex = banners.findIndex((b) => b.id === id);
  if (currentIndex === -1) {
    return { success: false, message: "Banner tidak dijumpai." };
  }

  const neighborIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (neighborIndex < 0 || neighborIndex >= banners.length) {
    return { success: true };
  }

  const current = banners[currentIndex];
  const neighbor = banners[neighborIndex];

  const { error: firstError } = await supabase
    .from("hero_banners")
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);

  if (firstError) {
    return { success: false, message: firstError.message };
  }

  const { error: secondError } = await supabase
    .from("hero_banners")
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);

  if (secondError) {
    return { success: false, message: secondError.message };
  }

  revalidateBannerPaths();
  return { success: true };
}
