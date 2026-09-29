"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { Icon } from "@/components/icon";
import { submitPendaftaranKariah, type SubmitResult } from "./actions";

export function KariahForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nama_penuh: "",
    no_kp: "",
    alamat_kp: "",
    alamat_semasa: "",
    no_telefon: "",
    email: "",
    status_perkahwinan: "berkahwin",
    pekerjaan: "",
    tempoh_menetap: "1 tahun hingga 3 tahun",
    bilangan_tanggungan: 1,
    perakuan: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "bilangan_tanggungan") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.perakuan) {
      setErrorMessage("Sila tandakan kotak perakuan sebelum menghantar borang.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await submitPendaftaranKariah({
          nama_penuh: formData.nama_penuh,
          no_kp: formData.no_kp,
          alamat_kp: formData.alamat_kp,
          alamat_semasa: formData.alamat_semasa,
          no_telefon: formData.no_telefon,
          email: formData.email,
          status_perkahwinan: formData.status_perkahwinan,
          pekerjaan: formData.pekerjaan,
          tempoh_menetap: formData.tempoh_menetap,
          bilangan_tanggungan: formData.bilangan_tanggungan,
          perakuan: formData.perakuan,
        });

        if (res.success) {
          setResult(res);
        } else {
          setErrorMessage(res.message || "Gagal menghantar permohonan. Sila cuba lagi.");
        }
      } catch {
        setErrorMessage("Ralat sambungan rangkaian. Sila semak sambungan internet anda.");
      }
    });
  }

  // Paparan apabila berjaya
  if (result && result.success) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-hairline bg-white p-6 sm:p-10 shadow-xl text-center">
        <div className="mx-auto size-16 sm:size-20 rounded-full bg-brand-50 text-forest flex items-center justify-center shadow-xs">
          <Icon name="check" size={36} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-gold-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold-300/40">
          Status: Menunggu Semakan
        </span>

        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-forest">
          Pendaftaran Berjaya Dihantar!
        </h2>

        <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed max-w-lg mx-auto">
          Terima kasih <strong className="text-forest">{result.nama}</strong>. Permohonan
          pendaftaran ahli kariah anda bagi Surau Al-Fateh, Kita Bayu Cybersouth telah
          diterima untuk tindakan jawatankuasa surau.
        </p>

        <div className="mt-6 rounded-2xl bg-sand p-5 border border-hairline text-left space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-ink-soft">No. Rujukan Pendaftaran:</span>
            <span className="font-mono font-bold text-forest text-base select-all">
              {result.referenceId}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-ink-soft">Tarikh Permohonan:</span>
            <span className="font-medium text-ink">{result.tarikh}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-ink-soft">Kariah:</span>
            <span className="font-medium text-ink">Surau Al-Fateh (Kita Bayu)</span>
          </div>
        </div>

        <div className="mt-6 text-xs text-ink-soft bg-brand-50/60 rounded-xl p-4 border border-brand-200/50 text-left space-y-2">
          <p className="font-semibold text-forest">Langkah Seterusnya:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Setiausaha surau akan menyemak butiran mastautin pemohon.</li>
            <li>Pengesahan rasmi akan dikemas kini dalam senarai induk kariah.</li>
            <li>Untuk sebarang urusan kecemasan atau pengesahan dokumen JAIS, sila hubungi 011-2600 2945.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 bg-white px-6 py-3 text-sm font-bold text-forest hover:bg-brand-50 transition-colors"
          >
            <Icon name="download" size={16} />
            <span>Cetak Salinan</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-forest-600 transition-colors"
          >
            <span>Kembali ke Laman Utama</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-3xl border border-hairline bg-white p-6 sm:p-10 shadow-xl"
    >
      {/* Pengenalan Borang */}
      <div className="border-b border-hairline pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-forest">
          <Icon name="user-check" size={16} />
          <span>Borang Rasmi Kariah JAIS Selangor</span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-forest">
          Borang Pendaftaran Ahli Kariah
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Kariah Surau Al-Fateh, Kita Bayu Cybersouth, Dengkil, Selangor.
        </p>
      </div>

      {errorMessage ? (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <Icon name="close" size={18} className="shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      {/* Bahagian A: Butiran Pemohon */}
      <div className="mt-8 space-y-6">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest border-b border-hairline pb-2 flex items-center gap-2">
          <span className="size-6 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">
            1
          </span>
          <span>Maklumat Peribadi Pemohon</span>
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nama_penuh" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Nama Penuh (Mengikut Kad Pengenalan / Pasport) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama_penuh"
              name="nama_penuh"
              required
              placeholder="Contoh: AHMAD BIN ABDULLAH"
              value={formData.nama_penuh}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest uppercase"
            />
          </div>

          <div>
            <label htmlFor="no_kp" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              No. Kad Pengenalan / Pasport <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="no_kp"
              name="no_kp"
              required
              placeholder="Contoh: 850101-10-5555"
              value={formData.no_kp}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
            <span className="text-[0.7rem] text-ink-soft mt-1 block">
              Masukkan 12 digit MyKad tanpa sempang atau dengan sempang.
            </span>
          </div>

          <div>
            <label htmlFor="status_perkahwinan" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Status Perkahwinan <span className="text-red-500">*</span>
            </label>
            <select
              id="status_perkahwinan"
              name="status_perkahwinan"
              value={formData.status_perkahwinan}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="bujang">Bujang</option>
              <option value="berkahwin">Sudah Berkahwin</option>
              <option value="duda">Duda</option>
              <option value="janda">Janda</option>
            </select>
          </div>

          <div>
            <label htmlFor="pekerjaan" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Pekerjaan / Sektor
            </label>
            <input
              type="text"
              id="pekerjaan"
              name="pekerjaan"
              placeholder="Contoh: Penjawat Awam / Swasta / Peniaga"
              value={formData.pekerjaan}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label htmlFor="tempoh_menetap" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Tempoh Menetap di Kita Bayu <span className="text-red-500">*</span>
            </label>
            <select
              id="tempoh_menetap"
              name="tempoh_menetap"
              value={formData.tempoh_menetap}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="Kurang 6 bulan">Kurang 6 bulan</option>
              <option value="6 bulan hingga 1 tahun">6 bulan hingga 1 tahun</option>
              <option value="1 tahun hingga 3 tahun">1 tahun hingga 3 tahun</option>
              <option value="Lebih 3 tahun">Lebih 3 tahun</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bahagian B: Kediaman & Hubungan */}
      <div className="mt-10 space-y-6">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest border-b border-hairline pb-2 flex items-center gap-2">
          <span className="size-6 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">
            2
          </span>
          <span>Maklumat Tempat Tinggal &amp; Hubungan</span>
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="alamat_semasa" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Alamat Tempat Tinggal Semasa di Kita Bayu <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alamat_semasa"
              name="alamat_semasa"
              required
              rows={2}
              placeholder="Contoh: No. 12, Jalan Bayu 3/2, Kita Bayu Cybersouth, 43800 Dengkil, Selangor"
              value={formData.alamat_semasa}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="alamat_kp" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Alamat Dalam Kad Pengenalan / Pasport <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alamat_kp"
              name="alamat_kp"
              required
              rows={2}
              placeholder="Alamat penuh seperti yang tercatat di belakang kad pengenalan"
              value={formData.alamat_kp}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label htmlFor="no_telefon" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              No. Telefon / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="no_telefon"
              name="no_telefon"
              required
              placeholder="Contoh: 012-3456789"
              value={formData.no_telefon}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Alamat E-mel
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Contoh: ahmad@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      </div>

      {/* Bahagian C: Tanggungan & Pengakuan */}
      <div className="mt-10 space-y-6">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest border-b border-hairline pb-2 flex items-center gap-2">
          <span className="size-6 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">
            3
          </span>
          <span>Tanggungan &amp; Pengakuan Pemohon</span>
        </h3>

        <div>
          <label htmlFor="bilangan_tanggungan" className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
            Bilangan Tanggungan / Ahli Keluarga Menetap Bersama
          </label>
          <input
            type="number"
            id="bilangan_tanggungan"
            name="bilangan_tanggungan"
            min={0}
            max={20}
            value={formData.bilangan_tanggungan}
            onChange={handleChange}
            className="w-32 rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
          <span className="text-[0.7rem] text-ink-soft mt-1 block">
            Termasuk isteri, anak-anak, atau ibu bapa yang menetap serumah.
          </span>
        </div>

        <div className="rounded-2xl bg-sand p-4 sm:p-5 border border-hairline">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="perakuan"
              checked={formData.perakuan}
              onChange={handleChange}
              className="mt-1 size-4 rounded border-hairline text-forest focus:ring-forest"
            />
            <span className="text-xs sm:text-sm text-ink leading-relaxed">
              <strong>Pengakuan Pemohon:</strong> Saya dengan ini memperakui bahawa segala
              maklumat yang diberikan dalam borang ini adalah benar dan sahih. Saya bermastautin
              di kariah Surau Al-Fateh Kita Bayu dan bersedia mematuhi peraturan kariah yang berkuat kuasa.
            </span>
          </label>
        </div>
      </div>

      {/* Butang Hantar */}
      <div className="mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/#perkhidmatan"
          className="text-xs font-semibold text-ink-soft hover:text-forest transition-colors order-2 sm:order-1"
        >
          &larr; Kembali ke Senarai Info Surau
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-forest-600 transition-all disabled:opacity-50 order-1 sm:order-2"
        >
          {isPending ? (
            <>
              <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Menghantar Permohonan...</span>
            </>
          ) : (
            <>
              <span>Hantar Borang Pendaftaran</span>
              <Icon name="arrow-right" size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
