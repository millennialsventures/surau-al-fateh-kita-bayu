export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  tag?: string;
  modal: {
    heading: string;
    subheading: string;
    badge?: string;
    description: string;
    points?: string[];
    actionLabel?: string;
    actionHref?: string;
    actionExternal?: boolean;
    secondaryActionLabel?: string;
    secondaryActionHref?: string;
    secondaryActionExternal?: boolean;
    image?: string;
    details?: { label: string; value: string }[];
  };
}

export const servicesList: ServiceItem[] = [
  {
    id: "pendaftaran-kariah",
    title: "Pendaftaran Ahli Kariah",
    shortDesc: "Pendaftaran rasmi kariah Masjid & Surau Negeri Selangor bagi komuniti Kita Bayu.",
    iconName: "user-check",
    modal: {
      heading: "Pendaftaran Ahli Kariah Negeri Selangor",
      subheading: "Kariah Surau Al-Fateh, Kita Bayu Cybersouth",
      badge: "Rasmi Selangor",
      description:
        "Semua penduduk beragama Islam yang menetap di Kita Bayu Cybersouth dialu-alukan untuk mendaftar sebagai ahli kariah rasmi bagi memudahkan urusan kebajikan, pengesahan dokumen, dan penyertaan aktiviti kariah.",
      points: [
        "Warganegara Malaysia beragama Islam",
        "Bermastautin di Kita Bayu Cybersouth, Dengkil",
        "Berumur 18 tahun ke atas",
        "Melayakkan diri dan keluarga untuk kemudahan kariah serta khairat kematian",
      ],
      actionLabel: "Daftar Dalam Talian",
      actionHref: "/daftar-kariah",
      actionExternal: false,
      details: [
        { label: "Kaedah", value: "Borang Rasmi Dalam Talian (JAIS)" },
        { label: "Pengesahan", value: "Semakan Jawatankuasa & Setiausaha Surau" },
        { label: "Pertanyaan", value: "013-602 5123" },
      ],
    },
  },
  {
    id: "senarai-ajk",
    title: "Senarai AJK Surau",
    shortDesc: "Barisan saf kepimpinan dan pegawai Surau Al-Fateh sesi 2024 / 2026.",
    iconName: "users",
    modal: {
      heading: "Ahli Jawatankuasa Surau Al-Fateh",
      subheading: "Sesi Pentadbiran 2024 / 2026",
      badge: "Sesi 2024/2026",
      description:
        "Struktur kepimpinan Surau Al-Fateh diterajui oleh barisan pentadbir, pegawai surau (imam, bilal, siak), dan ahli jawatankuasa yang komited berkhidmat untuk jemaah Kita Bayu Cybersouth.",
      image: "/images/ajk-chart.png",
      actionLabel: "Lihat Carta Kepimpinan Penuh",
      actionHref: "/leadership",
      details: [
        { label: "Pengerusi", value: "Us Khairun Nizam" },
        { label: "Timbalan Pengerusi", value: "En. Muhammad Aliff" },
        { label: "Setiausaha", value: "En. Ali Asyraf" },
        { label: "Bendahari", value: "En. Norazman" },
        { label: "Imam 1 & 2", value: "En. Isham Ibrahim / En. Hami'auf Jamal" },
        { label: "Bilal 1 & 2", value: "En. Nik Mohd Rosli / En. Hayatul Kamil" },
        { label: "Siak 1 & 2", value: "En. Anwar Idayah / En. Othman" },
      ],
    },
  },
  {
    id: "khairat-kematian",
    title: "Khairat Kematian",
    shortDesc: "Skim perlindungan pengurusan jenazah lengkap untuk ahli keluarga kariah.",
    iconName: "heart-hand",
    modal: {
      heading: "Skim Khairat Kematian Al-Fateh",
      subheading: "Perlindungan & Kebajikan Keluarga Kariah",
      badge: "Kebajikan",
      description:
        "Skim khairat kematian Surau Al-Fateh menyediakan bantuan pengurusan jenazah yang tersusun dan menyeluruh, meliputi van jenazah, kain kafan, pemandian, solat jenazah, sehingga urusan pengebumian.",
      points: [
        "Pengurusan jenazah 24 jam bersama pasukan pengurus jenazah terlatih",
        "Pengurusan jenazah muslimat diselia oleh Pn. Fakhriah",
        "Sistem pendaftaran dan semakan status dalam talian melalui e-Khairat",
        "Sumbangan pampasan kewangan segera kepada waris keluarga yang berdaftar",
      ],
      actionLabel: "Layari Portal e-Khairat",
      actionHref: "https://www.e-khairat.com/",
      actionExternal: true,
      details: [
        { label: "Penyelaras", value: "Biro Kebajikan & Pengurusan Jenazah Surau" },
        { label: "Hubungi", value: "013-602 5123" },
        { label: "Portal", value: "www.e-khairat.com" },
      ],
    },
  },
  {
    id: "sedekah-infaq",
    title: "Sedekah / Infaq / Wakaf",
    shortDesc: "Salurkan sumbangan untuk pengimarahan surau dan kebajikan ummah.",
    iconName: "hand-coins",
    modal: {
      heading: "Infaq & Sumbangan Surau Al-Fateh",
      subheading: "Maybank Islamic: 5660 1066 5759",
      badge: "Infaq Rasmi",
      description:
        "Setiap sumbangan ikhlas anda amat bermakna bagi menampung kos operasi harian, elaun guru kuliah, program kemasyarakatan, serta pembangunan fasiliti Surau Al-Fateh.",
      image: "/images/duitnow-qr.jpg",
      actionLabel: "Halaman Derma Penuh",
      actionHref: "/donate",
      details: [
        { label: "Bank", value: "Maybank Islamic" },
        { label: "No. Akaun", value: "566010665759" },
        { label: "Nama Penerima", value: "SURAU AL-FATEH" },
        { label: "Kaedah Pantas", value: "DuitNow QR (Imbas & Bayar)" },
      ],
    },
  },
  {
    id: "korban",
    title: "Korban",
    shortDesc: "Penyertaan ibadah korban & aqiqah perdana sempena Hari Raya Aidiladha.",
    iconName: "beef",
    modal: {
      heading: "Program Goro Korban Perdana Kita Bayu 4.0",
      subheading: "Ibadah Korban & Aqiqah 1447H / 2026M",
      badge: "Aidiladha",
      description:
        "Program tahunan penyembelihan dan pengagihan daging korban beramai-ramai oleh seluruh ahli kariah Kita Bayu Cybersouth. Memupuk semangat ukhuwah dan menyantuni golongan yang memerlukan.",
      image: "/images/poster-korban.png",
      points: [
        "Tarikh: 30 Mei 2026 (Sabtu) bersamaan Hari Raya Aidiladha",
        "Masa: Bermula jam 7:00 Pagi",
        "Tempat: Perkarangan Surau Al-Fateh Kita Bayu",
        "Penyembelihan mengikut syarak dengan kerjasama veterinar dan pihak berkuasa",
        "Agihan kepada peserta, fakir miskin, dan seluruh penduduk setempat",
      ],
      details: [
        { label: "Anjuran", value: "Jawatankuasa Korban Surau Al-Fateh" },
        { label: "Penyertaan", value: "Terbuka untuk bahagian Lembu & Kambing" },
      ],
    },
  },
  {
    id: "mesyuarat",
    title: "Mesyuarat",
    shortDesc: "Maklumat mesyuarat agung, perjumpaan jawatankuasa dan notis kariah.",
    iconName: "clipboard-list",
    modal: {
      heading: "Mesyuarat & Ketelusan Tadbir Urus",
      subheading: "Mesyuarat Ahli Kariah & Jawatankuasa",
      badge: "Tadbir Urus",
      description:
        "Surau Al-Fateh mengamalkan prinsip musyawarah telus dalam merancang pembangunan, pengurusan kewangan, serta aktiviti dakwah bersama seluruh komuniti.",
      image: "/images/activity-mesyuarat.png",
      points: [
        "Mesyuarat Jawatankuasa Kerja: diadakan secara berkala setiap bulan",
        "Mesyuarat Agung Kariah (AGM): pembentangan laporan aktiviti dan audit akaun",
        "Sesi Dialog Penduduk: ruang maklum balas fasiliti dan kebajikan taman",
      ],
      details: [
        { label: "Lokasi", value: "Bilik Mesyuarat / Dewan Surau Al-Fateh" },
        { label: "Setiausaha", value: "En. Ali Asyraf" },
      ],
    },
  },
  {
    id: "aktiviti-program",
    title: "Aktiviti / Program / Kursus / Bengkel",
    shortDesc: "Jadual kuliah harian, bengkel faraid, tadarus, dan majlis ilmu.",
    iconName: "presentation",
    modal: {
      heading: "Program Pengajian & Kemasyarakatan",
      subheading: "Pusat Tarbiah & Ilmu Komuniti",
      badge: "Majlis Ilmu",
      description:
        "Pelbagai program ilmiah dan kemasyarakatan disusun sepanjang tahun merangkumi segenap peringkat umur:",
      points: [
        "Bengkel Faraid: Merungkai pembahagian pusaka Islam bersama Ustaz Hamdan",
        "Kuliah Dhuha Muslimat bersama Ustazah Isfadiah Mohd Dasuki",
        "Kuliah Khas Pengurusan Harta Umat Islam bersama Ustaz Mohd Hilmi (Baitulmal Sepang)",
        "Kuliah Maghrib Perdana bersama Ustaz Prof Dato' Dr. Izhar Ariff",
        "Ihya Ramadan: Berbuka Puasa 4.0, Solat Terawih, Tadarus & Khatam Al-Quran",
      ],
      actionLabel: "Lihat Semua Program & Aktiviti",
      actionHref: "/events",
      details: [
        { label: "Penyertaan", value: "Terbuka kepada semua muslimin & muslimat" },
        { label: "Yuran", value: "Percuma (kecuali bengkel bersijil khas)" },
      ],
    },
  },
  {
    id: "sijil",
    title: "Sijil",
    shortDesc: "Pengesahan penyertaan kursus, tauliah, dan pengesahan anak kariah.",
    iconName: "award",
    modal: {
      heading: "Perkhidmatan Sijil & Pengesahan Dokumen",
      subheading: "Pengesahan Rasmi Kariah Surau Al-Fateh",
      badge: "Dokumentasi",
      description:
        "Surau Al-Fateh menyediakan perkhidmatan pengesahan dokumen mastautin serta pengeluaran sijil penyertaan kursus untuk kegunaan rasmi.",
      points: [
        "Sijil Penyertaan Bengkel Faraid & Kursus Pengurusan Jenazah",
        "Pengesahan status mastautin anak kariah bagi urusan perkahwinan (Borang JAIS)",
        "Pengesahan permohonan bantuan Baitulmal / Lembaga Zakat Selangor (LZS)",
        "Tandatangan & cop pengesahan oleh Pengerusi / Pegawai Surau bertauliah",
      ],
      details: [
        { label: "Pegawai Pengesah", value: "Pengerusi / Timbalan Pengerusi Surau" },
        { label: "Waktu Urusan", value: "Selepas solat fardu atau temujanji awal" },
        { label: "Hubungi", value: "013-602 5123" },
      ],
    },
  },
  {
    id: "laporan-kewangan",
    title: "Laporan Aktiviti & Kewangan",
    shortDesc: "Penyata ketelusan aliran tunai, infaq, dan akaun tahunan surau.",
    iconName: "trending-up",
    modal: {
      heading: "Laporan Aktiviti & Kewangan Surau",
      subheading: "Ketelusan Akaun Sesi 2024 / 2025",
      badge: "Diaudit",
      description:
        "Sebagai amanah jemaah, penyata penerimaan sumbangan dan perbelanjaan diurus secara telus serta diaudit oleh Pemeriksa Kira-kira bertauliah.",
      points: [
        "Rumusan Kewangan Tahunan dibentangkan pada setiap Mesyuarat Agung",
        "Bajet Pengkuliahan & Program Dakwah: anggaran RM3,500 sebulan (RM42,000 setahun)",
        "Akaun Skim Khairat Kematian: diasingkan khusus demi kebajikan ahli berdaftar",
        "Pemeriksa Kira-kira: En. Kh. Ikhwan & Pn. Rafidah",
      ],
      details: [
        { label: "Bendahari", value: "En. Norazman" },
        { label: "Timbalan Bendahari", value: "Dr. Masita" },
        { label: "Status Audit", value: "Telah disemak & disahkan" },
      ],
    },
  },
  {
    id: "waktu-solat",
    title: "Waktu Solat",
    shortDesc: "Jadual waktu solat fardu lima waktu harian bagi zon Selangor (SGR01).",
    iconName: "clock",
    modal: {
      heading: "Jadual Waktu Solat & Azan",
      subheading: "Zon Selangor SGR01 (Sepang, Cyberjaya, Dengkil)",
      badge: "Zon SGR01",
      description:
        "Waktu solat fardu di Surau Al-Fateh diselaraskan mengikut takwim rasmi Jabatan Kemajuan Islam Malaysia (JAKIM) dan Jabatan Agama Islam Selangor (JAIS).",
      points: [
        "Solat berjemaah lima waktu didirikan setiap hari",
        "Kuliah Subuh & Maghrib berkala mengikut jadual guru jemputan",
        "Azan dilaungkan tepat mengikut waktu zon SGR01",
        "Kawasan solat berhawa dingin selesa untuk muslimin dan muslimat",
      ],
      details: [
        { label: "Zon JAKIM", value: "SGR01 (Sepang / Cyberjaya / Petaling / Shah Alam)" },
        { label: "Imam Bertugas", value: "En. Isham Ibrahim & En. Hami'auf Jamal" },
      ],
    },
  },
  {
    id: "ayat-hadis",
    title: "Ayat Al-Quran / Hadis Pilihan",
    shortDesc: "Peringatan tazkirah, mutiara hadis sahih dan ayat Al-Quran harian.",
    iconName: "book-open",
    modal: {
      heading: "Tazkirah & Ayat Al-Quran Pilihan",
      subheading: "Santapan Rohani Harian",
      badge: "Tazkirah",
      description:
        "Mutiara kata Al-Quran dan Hadis Nabawi sebagai pedoman harian bagi memupuk masyarakat yang beramal soleh dan saling tolong-menolong dalam kebaikan.",
      points: [
        "Surah Al-Ma'idah ayat 2: Perintah saling tolong-menolong dalam kebajikan dan takwa",
        "Surah Al-Baqarah ayat 43: Seruan mendirikan solat, zakat dan rukuk bersama jemaah",
        "Surah At-Taubah ayat 18: Keutamaan golongan yang memakmurkan rumah-rumah Allah",
      ],
      details: [
        { label: "Rujukan", value: "Tafsir Pimpinan Ar-Rahman & Kitab Hadis Sahih" },
        { label: "Program Pengajian", value: "Kelas Al-Quran & Tajwid Surau Al-Fateh" },
      ],
    },
  },
];
