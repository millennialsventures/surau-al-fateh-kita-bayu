import { getPublicSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const BANNER_BUCKET = "hero-banners";
export const MAX_BANNER_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_BANNER_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export interface HeroBannerRecord {
  id: string;
  created_at: string;
  image_path: string;
  alt_text: string;
  caption: string | null;
  is_active: boolean;
  sort_order: number;
}

export function getBannerPublicUrl(imagePath: string): string | null {
  const supabase = getPublicSupabase();
  if (!supabase) return null;
  return supabase.storage.from(BANNER_BUCKET).getPublicUrl(imagePath).data.publicUrl;
}

export async function fetchActiveBanners(): Promise<HeroBannerRecord[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getPublicSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("hero_banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as HeroBannerRecord[];
}
