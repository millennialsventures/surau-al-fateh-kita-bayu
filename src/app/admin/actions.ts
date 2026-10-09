"use server";

import { cookies } from "next/headers";

import {
  getAdminSupabase,
  isSupabaseConfigured,
  type PendaftaranKariahRecord,
  type StatusPendaftaran,
} from "@/lib/supabase";

const SESSION_COOKIE = "surau_admin_token";

function getExpectedAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "suraualfateh2026";
}

// Data contoh tempatan sekiranya Supabase belum dihubungkan
const fallbackDemoRecords: PendaftaranKariahRecord[] = [
  {
    id: "kb-001-demo",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    nama_penuh: "MUHAMMAD HAZIQ BIN ZULKIFLI",
    no_kp: "920412-10-5431",
    no_keahlian: null,
    alamat_kp: "No. 45, Kampung Jenderam Hulu, 43800 Dengkil, Selangor",
    alamat_semasa: "No. 18, Jalan Bayu 2/3, Kita Bayu Cybersouth, Dengkil",
    no_telefon: "013-4567890",
    email: "haziq.zul@example.com",
    status_perkahwinan: "berkahwin",
    pekerjaan: "Jurutera Perisian",
    tempoh_menetap: "1 tahun hingga 3 tahun",
    bilangan_tanggungan: 3,
    perakuan: true,
    status: "menunggu_kelulusan",
    catatan_admin: null,
    tarikh_kelulusan: null,
    diluluskan_oleh: null,
  },
  {
    id: "kb-002-demo",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    nama_penuh: "ABDUL RAHMAN BIN OTHMAN",
    no_kp: "880520-14-5123",
    no_keahlian: "SAF0001",
    alamat_kp: "B-3-12, Presint 9, 62250 Putrajaya",
    alamat_semasa: "No. 5, Jalan Bayu 1/1, Kita Bayu Cybersouth, Dengkil",
    no_telefon: "019-8765432",
    email: "ar.othman@example.com",
    status_perkahwinan: "berkahwin",
    pekerjaan: "Penjawat Awam",
    tempoh_menetap: "Lebih 3 tahun",
    bilangan_tanggungan: 4,
    perakuan: true,
    status: "diluluskan",
    catatan_admin: "Bermastautin sah sejak 2023. Dokumen lengkap.",
    tarikh_kelulusan: new Date(Date.now() - 86400000 * 4).toISOString(),
    diluluskan_oleh: "Setiausaha Surau",
  },
  {
    id: "kb-003-demo",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    nama_penuh: "FARIDAH BINTI HASHIM",
    no_kp: "951103-08-6210",
    no_keahlian: "SAF0002",
    alamat_kp: "No. 12, Taman Melati, 53100 Setapak, Kuala Lumpur",
    alamat_semasa: "No. 32, Jalan Bayu 4/1, Kita Bayu Cybersouth, Dengkil",
    no_telefon: "017-3344556",
    email: "faridah.h@example.com",
    status_perkahwinan: "bujang",
    pekerjaan: "Eksekutif Pemasaran",
    tempoh_menetap: "6 bulan hingga 1 tahun",
    bilangan_tanggungan: 0,
    perakuan: true,
    status: "diluluskan",
    catatan_admin: "Penyewa berdaftar. Disokong oleh pemilik rumah.",
    tarikh_kelulusan: new Date(Date.now() - 86400000 * 7).toISOString(),
    diluluskan_oleh: "Setiausaha Surau",
  },
];

let inMemoryDemoRecords = [...fallbackDemoRecords];

export async function isUserAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(sessionToken && sessionToken === "surau-authorized-admin-session");
}

export async function loginAdminAction(password: string): Promise<{ success: boolean; error?: string }> {
  const expected = getExpectedAdminPassword();
  if (password.trim() !== expected) {
    return {
      success: false,
      error: "Kata laluan pentadbir tidak tepat. Sila cuba lagi.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "surau-authorized-admin-session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  return { success: true };
}

export async function logoutAdminAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}

export async function fetchKariahRegistrations(): Promise<{
  records: PendaftaranKariahRecord[];
  isDemoMode: boolean;
}> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { records: [], isDemoMode: false };
  }

  if (isSupabaseConfigured()) {
    const supabase = getAdminSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("pendaftaran_kariah")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return { records: data as PendaftaranKariahRecord[], isDemoMode: false };
      }
    }
  }

  // Mod fallback jika Supabase belum disambung
  return { records: inMemoryDemoRecords, isDemoMode: true };
}

export interface UpdateKariahStatusResult {
  success: boolean;
  message?: string;
  record?: PendaftaranKariahRecord;
}

export async function updateKariahStatusAction(
  id: string,
  newStatus: StatusPendaftaran,
  catatan?: string
): Promise<UpdateKariahStatusResult> {
  const authenticated = await isUserAdmin();
  if (!authenticated) {
    return { success: false, message: "Akses tidak dibenarkan." };
  }

  if (isSupabaseConfigured()) {
    const supabase = getAdminSupabase();
    if (!supabase) {
      return { success: false, message: "Gagal menghubungkan pangkalan data." };
    }

    const { data, error } = await supabase
      .from("pendaftaran_kariah")
      .update({
        status: newStatus,
        catatan_admin: catatan || null,
        tarikh_kelulusan: newStatus === "diluluskan" ? new Date().toISOString() : null,
        diluluskan_oleh: "Setiausaha Surau Al-Fateh",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, record: data as PendaftaranKariahRecord };
  }

  // Kemas kini memori tempatan demo
  let updatedRecord: PendaftaranKariahRecord | undefined;
  inMemoryDemoRecords = inMemoryDemoRecords.map((item) => {
    if (item.id !== id) {
      return item;
    }

    let assignedNo = item.no_keahlian;
    if (newStatus === "diluluskan" && !assignedNo) {
      const existingNumbers = inMemoryDemoRecords
        .map((r) => r.no_keahlian)
        .filter((n): n is string => Boolean(n && n.startsWith("SAF")))
        .map((n) => parseInt(n.replace("SAF", ""), 10))
        .filter((n) => !isNaN(n));
      const nextNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
      assignedNo = `SAF${String(nextNum).padStart(4, "0")}`;
    }

    updatedRecord = {
      ...item,
      status: newStatus,
      no_keahlian: assignedNo,
      catatan_admin: catatan || item.catatan_admin,
      tarikh_kelulusan: newStatus === "diluluskan" ? new Date().toISOString() : null,
      diluluskan_oleh: "Setiausaha Surau Al-Fateh",
    };
    return updatedRecord;
  });

  return { success: true, record: updatedRecord };
}
