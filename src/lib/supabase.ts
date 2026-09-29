import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type StatusPendaftaran = "menunggu_kelulusan" | "diluluskan" | "ditolak";

export interface PendaftaranKariahRecord {
  id: string;
  created_at: string;
  nama_penuh: string;
  no_kp: string;
  alamat_kp: string;
  alamat_semasa: string;
  no_telefon: string;
  email: string | null;
  status_perkahwinan: string;
  pekerjaan: string | null;
  tempoh_menetap: string;
  bilangan_tanggungan: number;
  perakuan: boolean;
  status: StatusPendaftaran;
  catatan_admin: string | null;
  tarikh_kelulusan: string | null;
  diluluskan_oleh: string | null;
}

export type PermohonanKariahInput = Omit<
  PendaftaranKariahRecord,
  "id" | "created_at" | "status" | "catatan_admin" | "tarikh_kelulusan" | "diluluskan_oleh"
>;

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    "";
  return { url, anonKey, serviceRoleKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
}

let publicClientInstance: SupabaseClient | null = null;

export function getPublicSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    return null;
  }
  if (!publicClientInstance) {
    publicClientInstance = createClient(url, anonKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return publicClientInstance;
}

export function getAdminSupabase(): SupabaseClient | null {
  const { url, serviceRoleKey, anonKey } = getSupabaseEnv();
  const keyToUse = serviceRoleKey || anonKey;
  if (!url || !keyToUse) {
    return null;
  }
  return createClient(url, keyToUse, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
