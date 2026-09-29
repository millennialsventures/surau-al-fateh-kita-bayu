# PANDUAN SISTEM PENDAFTARAN KARIAH & PANEL PENTADBIR
**Surau Al-Fateh KITA Bayu, Cybersouth, Dengkil, Selangor**

---

## 1. Pengenalan Sistem

Sistem ini dibangunkan khas untuk memodenkan dan memudahkan pengurusan rekod penduduk kariah di perumahan **KITA Bayu Cybersouth**. Melalui sistem digital ini, proses pendaftaran fizikal berasaskan kertas digantikan dengan sistem dalam talian yang pantas, mesra telefon pintar, serta menepati piawaian privasi data (PDPA).

### Pautan Rasmi Sistem:
* **Portal Utama Surau:** `https://surau-al-fateh-kita-bayu.vercel.app`
* **Borang Pendaftaran Kariah:** `https://surau-al-fateh-kita-bayu.vercel.app/daftar-kariah`
* **Panel Pentadbir (Admin):** `https://surau-al-fateh-kita-bayu.vercel.app/admin`

---

## 2. Aliran Pendaftaran Penduduk (Registration Flow)

Penduduk hanya perlu melayari pautan borang melalui telefon pintar atau komputer riba tanpa perlu mendaftar akaun yang rumit.

### A. Pengisian Maklumat Pemohon
1. **Maklumat Pengenalan Diri:**
   * **Nama Penuh:** Mengikut kad pengenalan / pasport rasmi.
   * **Nombor KP / Pasport:** Format MyKad diproses secara automatik.
2. **Maklumat Tempat Tinggal:**
   * **Alamat Semasa (KITA Bayu):** Nombor rumah dan jalan kediaman semasa di KITA Bayu untuk mengesahkan mukim kariah.
   * **Alamat Kad Pengenalan:** Alamat asal mengikut dokumen pengenalan.
3. **Maklumat Perhubungan:**
   * **Nombor Telefon Bimbit:** Nombor aktif untuk dihubungi oleh pihak surau melalui panggilan atau WhatsApp.
   * **Alamat Emel:** (Pilihan) Untuk rekod komunikasi digital.
4. **Maklumat Profil Komuniti & Demografi:**
   * **Status Perkahwinan:** Bujang / Berkahwin / Ibu atau Bapa Tunggal.
   * **Pekerjaan:** Sektor perkhidmatan awam, swasta, perniagaan sendiri, persara, dsb.
   * **Tempoh Menetap di KITA Bayu:** Kurang 1 tahun, 1 hingga 3 tahun, atau lebih 3 tahun.
   * **Bilangan Tanggungan:** Jumlah isi rumah bagi membantu perancangan program kebajikan dan bantuan asnaf.
5. **Perakuan Maklumat:**
   * Pemohon wajib menandakan kotak perakuan kebenaran maklumat sebelum permohonan boleh dihantar.

### B. Pengeluaran Slip & Resit Pengesahan Segera
Sebaik sahaja butang **"Hantar Pendaftaran Kariah"** ditekan:
* Data permohonan disimpan serta-merta ke dalam pangkalan data selamat dengan status `menunggu_kelulusan`.
* Sistem memaparkan **Resit Pengesahan Digital** yang mengandungi:
  * **Nombor Rujukan Unik Permohonan** (contoh: `KB-A1B2C3`).
  * **Tarikh dan Masa Pendaftaran**.
  * **Status Semasa:** `Menunggu Semakan Pentadbir`.
* Pemohon boleh menekan butang **"Salin No. Rujukan"** atau **"Cetak / Simpan PDF Slip"** sebagai bukti permohonan.

---

## 3. Aliran Kerja Panel Pentadbir (Admin Workflow)

Panel pentadbir disediakan untuk jawatankuasa surau (Setiausaha, Biro Kariah, dan AJK) memproses, menyemak, dan meluluskan setiap permohonan.

### A. Kawalan Keselamatan & Log Masuk
* Pentadbir melayari `/admin` dan memasukkan kata laluan keselamatan rasmi surau.
* Sesi log masuk dikunci menggunakan *HTTP-only secure cookie* untuk mengelakkan pencerobohan tanpa izin.

### B. Ringkasan Papan Pemuka (Dashboard Metrics)
Pada bahagian atas skrin, 4 kad ringkasan memaparkan status semasa pendaftaran secara masa nyata (*real-time*):
1. **Jumlah Permohonan Keseluruhan**
2. **Menunggu Kelulusan** (permohonan baru yang memerlukan tindakan)
3. **Telah Diluluskan** (ahli kariah berdaftar rasmi)
4. **Permohonan Ditolak** (rekod tidak lengkap atau luar kariah)

### C. Carian & Penapisan Pintar
* **Tab Penapis:** Pentadbir boleh beralih antara paparan *Semua*, *Menunggu Kelulusan*, *Diluluskan*, dan *Ditolak*.
* **Kotak Carian Pantas:** Carian segera boleh dilakukan mengikut:
  * Nama pemohon.
  * Nombor Kad Pengenalan.
  * Nombor telefon.
  * Nombor rumah atau nama jalan di KITA Bayu.

### D. Tindakan Semakan & Pengesahan
* Klik pada mana-mana pemohon untuk melihat paparan profil penuh.
* **Pautan Pantas WhatsApp:** Satu klik pada butang WhatsApp akan membuka aplikasi WhatsApp terus kepada nombor pemohon berserta mesej sapaan rasmi, memudahkan pihak AJK meminta dokumen sokongan (contohnya bil elektrik/perjanjian sewa jika perlu).
* **Catatan Admin:** Pentadbir boleh mencatat nota dalaman (contoh: *"Disahkan penyewa unit 12, dokumen lengkap"*).
* **Keputusan Permohonan:**
  * Butang **"Luluskan"**: Status bertukar kepada `diluluskan`, sistem merekodkan tarikh kelulusan dan nama pelulus secara automatik.
  * Butang **"Tolak"**: Status bertukar kepada `ditolak` berserta alasan dalam catatan.

### E. Eksport Data ke Format Excel (CSV)
* Terdapat butang **"Eksport CSV"** di panel pentadbir.
* Satu klik akan memuat turun keseluruhan senarai pendaftaran yang telah ditapis ke dalam format lembaran kerja (*spreadsheet*) yang disokong oleh Microsoft Excel dan Google Sheets.
* Amat berguna untuk persediaan **Mesyuarat Agung Tahunan (AGM)**, bancian penduduk, serta laporan rasmi kepada **Jabatan Agama Islam Selangor (JAIS)**.

---

## 4. Keselamatan & Privasi Data Penduduk (PDPA)

Sistem ini dibina dengan keutamaan perlindungan data peribadi mengikut amalan terbaik industri:
1. **Kawalan Keselamatan Peringkat Baris (Row Level Security - RLS):**
   * Pelawat umum di internet hanya dibenarkan membuat penambahan rekod baharu (`INSERT`).
   * Pelawat awam disekat sepenuhnya daripada membaca (`SELECT`), mengubah (`UPDATE`), atau memadam (`DELETE`) sebarang rekod pemohon lain.
2. **Akses Pentadbir Melalui Kunci Pelayan Terpelihara (Service Role Key):**
   * Segala capaian bacaan dan pengemaskinian hanya boleh dijalankan di peringkat pelayan (*server-side*) setelah kata laluan pentadbir disahkan.
3. **Pangkalan Data Awan Supabase (PostgreSQL):**
   * Dihoskan pada infrastruktur berprestasi tinggi dengan penyulitan semasa penghantaran (*SSL/TLS*) dan rehat (*encryption at rest*).

---

## 5. Senarai Semak Panduan Ujian (Quick Testing Steps)

Untuk menerangkan kepada rakan anda cara mencuba sistem ini secara langsung:

1. **Ujian Penduduk:**
   * Layari: `https://surau-al-fateh-kita-bayu.vercel.app/daftar-kariah`
   * Isi butiran contoh dan tekan **Hantar**.
   * Perhatikan nombor rujukan yang dijana dan paparan slip pengesahan digital.
2. **Ujian Pentadbir:**
   * Layari: `https://surau-al-fateh-kita-bayu.vercel.app/admin`
   * Log masuk ke panel pentadbir.
   * Rekod yang baru dihantar akan berada di tab **Menunggu Kelulusan**.
   * Klik rekod berkenaan, masukkan catatan pengesahan, dan klik butang **Luluskan**.
   * Rekod kini berpindah ke tab **Diluluskan** dan sedia dieksport melalui butang **Eksport CSV**.

---
*Disediakan untuk Jawatankuasa Penaja & Pengurusan Surau Al-Fateh KITA Bayu, Cybersouth.*
