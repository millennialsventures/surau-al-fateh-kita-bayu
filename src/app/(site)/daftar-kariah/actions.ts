"use server";

import {
  getAdminSupabase,
  getPublicSupabase,
  isSupabaseConfigured,
  type PermohonanKariahInput,
} from "@/lib/supabase";

export interface SubmitResult {
  success: boolean;
  message?: string;
  referenceId?: string;
  nama?: string;
  tarikh?: string;
}

export async function submitPendaftaranKariah(
  data: PermohonanKariahInput
): Promise<SubmitResult> {
  // 1. Validasi input asas
  const nama = data.nama_penuh?.trim();
  const icClean = data.no_kp?.replace(/\D/g, "");
  const telefon = data.no_telefon?.trim();
  const alamatSemasa = data.alamat_semasa?.trim();
  const alamatKp = data.alamat_kp?.trim();

  if (!nama || nama.length < 3) {
    return {
      success: false,
      message: "Sila masukkan nama penuh yang sah seperti dalam kad pengenalan.",
    };
  }

  if (!icClean || icClean.length < 7) {
    return {
      success: false,
      message: "Sila masukkan nombor kad pengenalan atau pasport yang lengkap.",
    };
  }

  if (!alamatSemasa) {
    return {
      success: false,
      message: "Sila masukkan alamat tempat tinggal semasa anda di Kita Bayu.",
    };
  }

  if (!alamatKp) {
    return {
      success: false,
      message: "Sila masukkan alamat mengikut kad pengenalan.",
    };
  }

  if (!telefon || telefon.length < 8) {
    return {
      success: false,
      message: "Sila masukkan nombor telefon yang boleh dihubungi.",
    };
  }

  if (!data.perakuan) {
    return {
      success: false,
      message: "Sila tandakan kotak perakuan kebenaran maklumat sebelum menghantar.",
    };
  }

  const payload = {
    nama_penuh: nama,
    no_kp: data.no_kp.trim(),
    alamat_kp: alamatKp,
    alamat_semasa: alamatSemasa,
    no_telefon: telefon,
    email: data.email?.trim() || null,
    status_perkahwinan: data.status_perkahwinan || "bujang",
    pekerjaan: data.pekerjaan?.trim() || null,
    tempoh_menetap: data.tempoh_menetap?.trim() || "Kurang 1 tahun",
    bilangan_tanggungan: Number(data.bilangan_tanggungan) || 0,
    perakuan: true,
    status: "menunggu_kelulusan",
  };

  // 2. Simpan ke Supabase jika konfigurasi wujud
  if (isSupabaseConfigured()) {
    const supabase = getAdminSupabase() || getPublicSupabase();
    if (!supabase) {
      return {
        success: false,
        message: "Ralat sambungan pangkalan data. Sila hubungi pihak surau.",
      };
    }

    const { data: record, error } = await supabase
      .from("pendaftaran_kariah")
      .insert(payload)
      .select("id, created_at, nama_penuh")
      .single();

    if (error) {
      if (error.code === "PGRST205") {
        return {
          success: false,
          message:
            "Jadual permohonan belum wujud dalam pangkalan data. Sila hubungi pihak pentadbir surau.",
        };
      }
      return {
        success: false,
        message: `Gagal menyimpan permohonan: ${error.message}`,
      };
    }

    const ref = record.id.slice(0, 8).toUpperCase();
    const dateFormatted = new Date(record.created_at).toLocaleDateString("ms-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      success: true,
      referenceId: ref,
      nama: record.nama_penuh,
      tarikh: dateFormatted,
    };
  }

  // 3. Mod Pratonton jika kunci Supabase belum disuntik
  const demoRef = `KITA-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateFormatted = new Date().toLocaleDateString("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    success: true,
    referenceId: demoRef,
    nama,
    tarikh: dateFormatted,
    message: "Permohonan disimpan (Mod latihan tempatan sebelum pangkalan data dihubungkan).",
  };
}
