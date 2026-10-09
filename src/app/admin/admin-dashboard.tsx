"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { Icon } from "@/components/icon";
import type { PendaftaranKariahRecord, StatusPendaftaran } from "@/lib/supabase";
import {
  loginAdminAction,
  logoutAdminAction,
  updateKariahStatusAction,
} from "./actions";

interface AdminDashboardProps {
  initialAuthenticated: boolean;
  initialRecords: PendaftaranKariahRecord[];
  isDemoMode: boolean;
}

export function AdminDashboard({
  initialAuthenticated,
  initialRecords,
  isDemoMode,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [records, setRecords] = useState<PendaftaranKariahRecord[]>(initialRecords);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"semua" | StatusPendaftaran>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<PendaftaranKariahRecord | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [isPending, startTransition] = useTransition();

  // 1. Log Masuk Pentadbir
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);

    startTransition(async () => {
      const res = await loginAdminAction(password);
      if (res.success) {
        setIsAuthenticated(true);
        window.location.reload();
      } else {
        setLoginError(res.error || "Kata laluan salah.");
      }
    });
  }

  // 2. Log Keluar
  function handleLogout() {
    startTransition(async () => {
      await logoutAdminAction();
      setIsAuthenticated(false);
      window.location.reload();
    });
  }

  // 3. Kemas kini status kelulusan ahli kariah
  function handleUpdateStatus(id: string, newStatus: StatusPendaftaran) {
    startTransition(async () => {
      const res = await updateKariahStatusAction(id, newStatus, adminNote);
      if (res.success && res.record) {
        setRecords((prev) =>
          prev.map((r) => (r.id === id ? res.record! : r))
        );
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord(res.record);
        }
      } else if (res.success) {
        setRecords((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: newStatus,
                  catatan_admin: adminNote || r.catatan_admin,
                  tarikh_kelulusan:
                    newStatus === "diluluskan" ? new Date().toISOString() : null,
                  diluluskan_oleh: "Setiausaha Surau Al-Fateh",
                }
              : r
          )
        );
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  catatan_admin: adminNote || prev.catatan_admin,
                  tarikh_kelulusan:
                    newStatus === "diluluskan" ? new Date().toISOString() : null,
                }
              : null
          );
        }
      }
    });
  }

  // 4. Eksport CSV untuk senarai ahli kariah
  function handleExportCsv() {
    const headers = [
      "ID",
      "No Keahlian",
      "Nama Penuh",
      "No. Kad Pengenalan",
      "Alamat Semasa (Kita Bayu)",
      "Alamat KP",
      "No Telefon",
      "Emel",
      "Status Perkahwinan",
      "Pekerjaan",
      "Tempoh Menetap",
      "Tanggungan",
      "Status Permohonan",
      "Tarikh Mohon",
      "Tarikh Kelulusan",
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.id}"`,
      `"${r.no_keahlian || "-"}"`,
      `"${r.nama_penuh.replace(/"/g, '""')}"`,
      `"${r.no_kp}"`,
      `"${r.alamat_semasa.replace(/"/g, '""')}"`,
      `"${r.alamat_kp.replace(/"/g, '""')}"`,
      `"${r.no_telefon}"`,
      `"${r.email || "-"}"`,
      `"${r.status_perkahwinan}"`,
      `"${r.pekerjaan || "-"}"`,
      `"${r.tempoh_menetap}"`,
      `"${r.bilangan_tanggungan}"`,
      `"${r.status}"`,
      `"${new Date(r.created_at).toLocaleDateString("ms-MY")}"`,
      `"${r.tarikh_kelulusan ? new Date(r.tarikh_kelulusan).toLocaleDateString("ms-MY") : "-"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `senarai-kariah-kita-bayu-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Penapisan dan carian
  const filteredRecords = records.filter((r) => {
    const matchesTab = activeTab === "semua" || r.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      r.nama_penuh.toLowerCase().includes(q) ||
      (r.no_keahlian && r.no_keahlian.toLowerCase().includes(q)) ||
      r.no_kp.toLowerCase().includes(q) ||
      r.alamat_semasa.toLowerCase().includes(q) ||
      r.no_telefon.includes(q);
    return matchesTab && matchesQuery;
  });

  const totalCount = records.length;
  const pendingCount = records.filter((r) => r.status === "menunggu_kelulusan").length;
  const approvedCount = records.filter((r) => r.status === "diluluskan").length;
  const rejectedCount = records.filter((r) => r.status === "ditolak").length;

  // -------------------------------------------------------------
  // SKRIN LOG MASUK (Jika belum disahkan)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md my-12 rounded-3xl border border-hairline bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto size-16 rounded-2xl bg-brand-50 text-forest flex items-center justify-center shadow-xs">
            <Icon name="shield" size={32} />
          </div>
          <span className="mt-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest">
            Panel Pentadbir
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-forest">
            Surau Al-Fateh
          </h2>
          <p className="mt-2 text-xs text-ink-soft">
            Masukkan kata laluan pentadbir untuk menyemak dan meluluskan permohonan ahli kariah.
          </p>
        </div>

        {loginError ? (
          <div className="mt-6 rounded-xl bg-red-50 p-3.5 border border-red-200 text-xs font-medium text-red-700">
            {loginError}
          </div>
        ) : null}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin_pass"
              className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5"
            >
              Kata Laluan Pentadbir
            </label>
            <input
              type="password"
              id="admin_pass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata laluan"
              className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-forest-600 transition-colors disabled:opacity-50"
          >
            {isPending ? "Mengesahkan..." : "Log Masuk Panel"}
            <Icon name="arrow-right" size={16} />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-hairline text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-ink-soft hover:text-forest transition-colors"
          >
            &larr; Kembali ke Laman Hadapan
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PAPAN PEMUKA PENTADBIR
  // -------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* Bar Atas Papan Pemuka */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-forest">
              Pengurusan Ahli Kariah
            </h1>
            {isDemoMode ? (
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-amber-700 border border-amber-300">
                Pratonton Lokal
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-emerald-700 border border-emerald-300">
                Pangkalan Data Aktif
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-ink-soft">
            Surau Al-Fateh, Kita Bayu Cybersouth &bull; Senarai dan pengesahan permohonan ahli kariah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/daftar-kariah"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-white px-4 py-2 text-xs font-semibold text-forest hover:bg-brand-50 transition-colors"
          >
            <span>Buka Borang Awam</span>
            <Icon name="arrow-right" size={14} />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full bg-mist hover:bg-hairline px-4 py-2 text-xs font-semibold text-ink transition-colors"
          >
            <span>Log Keluar</span>
          </button>
        </div>
      </div>

      {/* Kad Statistik Ringkas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-hairline bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">
              Jumlah Rekod
            </span>
            <span className="size-8 rounded-lg bg-brand-50 text-forest flex items-center justify-center">
              <Icon name="users" size={16} />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-forest">{totalCount}</p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Menunggu
            </span>
            <span className="size-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Icon name="clock" size={16} />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-amber-700">{pendingCount}</p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Diluluskan
            </span>
            <span className="size-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Icon name="check" size={16} />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-emerald-700">{approvedCount}</p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
              Ditolak
            </span>
            <span className="size-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
              <Icon name="close" size={16} />
            </span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-red-700">{rejectedCount}</p>
        </div>
      </div>

      {/* Bar Carian & Tab Penapis */}
      <div className="rounded-2xl border border-hairline bg-white p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab Penapis */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: "semua", label: "Semua", count: totalCount },
            { id: "menunggu_kelulusan", label: "Menunggu", count: pendingCount },
            { id: "diluluskan", label: "Diluluskan", count: approvedCount },
            { id: "ditolak", label: "Ditolak", count: rejectedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "semua" | StatusPendaftaran)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-forest text-white shadow-xs"
                  : "bg-mist text-ink hover:bg-hairline"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Kotak Carian & Butang Eksport */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <input
            type="text"
            placeholder="Cari nama / no. KP / rumah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 rounded-xl border border-hairline bg-white px-3.5 py-1.5 text-xs text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 rounded-xl border border-forest/30 bg-white px-3.5 py-1.5 text-xs font-bold text-forest hover:bg-brand-50 transition-colors shrink-0"
          >
            <Icon name="download" size={14} />
            <span className="hidden sm:inline">Eksport CSV</span>
          </button>
        </div>
      </div>

      {/* Jadual Pemohon */}
      <div className="rounded-2xl border border-hairline bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-sand border-b border-hairline text-ink-soft uppercase font-bold text-[0.7rem] tracking-wider">
              <tr>
                <th className="py-3 px-4">No. Keahlian</th>
                <th className="py-3 px-4">Nama Pemohon &amp; KP</th>
                <th className="py-3 px-4">Alamat Kita Bayu</th>
                <th className="py-3 px-4">No. Telefon</th>
                <th className="py-3 px-4">Tanggungan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-ink-soft">
                    Tiada rekod permohonan yang sepadan dengan carian ini.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      {item.no_keahlian ? (
                        <span className="inline-flex items-center rounded-md bg-forest/10 px-2.5 py-1 text-xs font-mono font-bold text-forest border border-forest/20">
                          {item.no_keahlian}
                        </span>
                      ) : (
                        <span className="text-[0.75rem] text-ink-soft/60 font-mono">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-forest">{item.nama_penuh}</div>
                      <div className="text-[0.7rem] text-ink-soft font-mono">{item.no_kp}</div>
                      <div className="text-[0.65rem] text-ink-soft/75">
                        {new Date(item.created_at).toLocaleDateString("ms-MY")}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="line-clamp-2">{item.alamat_semasa}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <a
                        href={`https://wa.me/6${item.no_telefon.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-forest hover:underline"
                      >
                        <Icon name="whatsapp" size={13} className="text-leaf" />
                        <span>{item.no_telefon}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold">{item.bilangan_tanggungan} orang</span>
                      <div className="text-[0.7rem] text-ink-soft capitalize">
                        {item.status_perkahwinan}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {item.status === "diluluskan" ? (
                        <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-emerald-700 border border-emerald-300">
                          Diluluskan
                        </span>
                      ) : item.status === "ditolak" ? (
                        <span className="inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-red-700 border border-red-300">
                          Ditolak
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-amber-700 border border-amber-300">
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRecord(item);
                          setAdminNote(item.catatan_admin || "");
                        }}
                        className="inline-flex items-center rounded-lg border border-hairline bg-white px-2.5 py-1 text-xs font-semibold text-ink hover:bg-mist transition-colors"
                      >
                        Butiran
                      </button>

                      {item.status !== "diluluskan" ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "diluluskan")}
                          className="inline-flex items-center rounded-lg bg-forest px-2.5 py-1 text-xs font-bold text-white hover:bg-forest-600 transition-colors"
                        >
                          Lulus
                        </button>
                      ) : null}

                      {item.status !== "ditolak" ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "ditolak")}
                          className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                        >
                          Tolak
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tetingkap Modal Butiran Lengkap Pemohon */}
      {selectedRecord ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-hairline text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tajuk Modal */}
            <div className="flex items-start justify-between border-b border-hairline pb-4">
              <div>
                <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.7rem] font-bold text-forest uppercase mb-1">
                  Butiran Permohonan Ahli Kariah
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-forest">
                  {selectedRecord.nama_penuh}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-xs text-ink-soft">
                    No. Kad Pengenalan: <span className="font-mono">{selectedRecord.no_kp}</span>
                  </p>
                  {selectedRecord.no_keahlian ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-forest/10 px-2 py-0.5 text-xs font-mono font-bold text-forest border border-forest/20">
                      <Icon name="check" size={12} />
                      No. Keahlian: {selectedRecord.no_keahlian}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-sand px-2 py-0.5 text-[0.7rem] text-ink-soft border border-hairline">
                      No. Keahlian: Belum dijana (Perlu kelulusan)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Tutup"
                className="size-8 rounded-full bg-mist hover:bg-hairline flex items-center justify-center text-ink-soft"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* Butiran Penuh */}
            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-sand p-4 rounded-2xl border border-hairline">
                <div>
                  <span className="text-ink-soft block text-xs">Status Perkahwinan:</span>
                  <span className="font-semibold text-forest capitalize">
                    {selectedRecord.status_perkahwinan}
                  </span>
                </div>
                <div>
                  <span className="text-ink-soft block text-xs">Pekerjaan:</span>
                  <span className="font-semibold text-forest">
                    {selectedRecord.pekerjaan || "Tidak dinyatakan"}
                  </span>
                </div>
                <div>
                  <span className="text-ink-soft block text-xs">Tempoh Menetap:</span>
                  <span className="font-semibold text-forest">
                    {selectedRecord.tempoh_menetap}
                  </span>
                </div>
                <div>
                  <span className="text-ink-soft block text-xs">Bilangan Tanggungan:</span>
                  <span className="font-semibold text-forest">
                    {selectedRecord.bilangan_tanggungan} orang
                  </span>
                </div>
              </div>

              <div className="space-y-2 border border-hairline rounded-2xl p-4">
                <div>
                  <span className="text-xs font-bold text-forest uppercase block">
                    Alamat Tempat Tinggal Semasa (Kita Bayu):
                  </span>
                  <p className="text-ink font-medium mt-0.5">{selectedRecord.alamat_semasa}</p>
                </div>
                <div className="pt-2 border-t border-hairline">
                  <span className="text-xs font-bold text-forest uppercase block">
                    Alamat Dalam Kad Pengenalan:
                  </span>
                  <p className="text-ink font-medium mt-0.5">{selectedRecord.alamat_kp}</p>
                </div>
                <div className="pt-2 border-t border-hairline flex flex-wrap gap-4">
                  <div>
                    <span className="text-xs text-ink-soft block">Telefon / WhatsApp:</span>
                    <a
                      href={`https://wa.me/6${selectedRecord.no_telefon.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest font-semibold hover:underline"
                    >
                      {selectedRecord.no_telefon}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">E-mel:</span>
                    <span className="text-ink font-semibold">
                      {selectedRecord.email || "Tiada"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Catatan Pentadbir / Setiausaha */}
              <div>
                <label
                  htmlFor="admin_notes_input"
                  className="block text-xs font-bold text-forest uppercase tracking-wider mb-1"
                >
                  Catatan Pentadbir / Ulasan Setiausaha
                </label>
                <textarea
                  id="admin_notes_input"
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Contoh: Disahkan bermastautin di Kita Bayu. Salinan dokumen diterima."
                  className="w-full rounded-xl border border-hairline bg-white p-3 text-xs text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
            </div>

            {/* Butang Tindakan Bawah */}
            <div className="mt-6 pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-ink-soft">
                Status Semasa:{" "}
                <strong className="text-forest uppercase">{selectedRecord.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-mist"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedRecord.id, "ditolak")}
                  className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                >
                  Tolak Permohonan
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedRecord.id, "diluluskan")}
                  className="rounded-full bg-forest px-5 py-2 text-xs font-bold text-white hover:bg-forest-600 shadow-xs"
                >
                  Luluskan Permohonan
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
