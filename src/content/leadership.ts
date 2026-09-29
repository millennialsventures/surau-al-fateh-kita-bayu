export type Leader = {
  id: string;
  name: string;
  role: string;
  /** Short line about their responsibility or title. */
  remit?: string;
  photo?: string | null;
  initials: string;
  category?: "pengurusan" | "pegawai" | "pemeriksa" | "jawatankuasa";
  highlight?: boolean;
};

export type CommitteeGroup = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  members: Leader[];
};

export const organizationChart = {
  session: "Sesi 2024 / 2026",
  title: "Ahli Jawatankuasa Surau Al-Fateh KITA Bayu",
  subtitle: "Sesi 2024 / 2026",
  pengerusi: {
    id: "pengerusi",
    name: "Us. Khairun Nizam",
    role: "Pengerusi",
    remit: "Pengerusi Surau Al-Fateh",
    initials: "KN",
    category: "pengurusan" as const,
    highlight: true,
  },
  timbalanPengerusi: {
    id: "timb-pengerusi",
    name: "En. Muhammad Aliff",
    role: "Timbalan Pengerusi",
    remit: "Timbalan Pengerusi",
    initials: "MA",
    category: "pengurusan" as const,
  },
  eksekutif: [
    {
      id: "bendahari",
      name: "En. Norazman",
      role: "Bendahari",
      initials: "NA",
      category: "pengurusan" as const,
    },
    {
      id: "setiausaha",
      name: "En. Ali Asyraf",
      role: "Setiausaha",
      initials: "AA",
      category: "pengurusan" as const,
    },
  ],
  timbalanEksekutif: [
    {
      id: "timb-bendahari",
      name: "Dr. Masita",
      role: "Timbalan Bendahari",
      initials: "DM",
      category: "pengurusan" as const,
    },
    {
      id: "timb-setiausaha",
      name: "Pn. Nuruljannah",
      role: "Timbalan Setiausaha",
      initials: "NJ",
      category: "pengurusan" as const,
    },
  ],
  pemeriksaKiraKira: [
    {
      id: "pemeriksa-1",
      name: "En. Kh. Ikhwan",
      role: "Pemeriksa Kira-kira",
      initials: "KI",
      category: "pemeriksa" as const,
    },
    {
      id: "pemeriksa-2",
      name: "Pn. Rafidah",
      role: "Pemeriksa Kira-kira",
      initials: "RF",
      category: "pemeriksa" as const,
    },
  ],
  pegawaiSurau: {
    title: "Imam, Bilal & Siak",
    imams: [
      {
        id: "imam-1",
        name: "Us. Isham Ibrahim",
        role: "Imam 1",
        initials: "II",
        category: "pegawai" as const,
      },
      {
        id: "imam-2",
        name: "Us. Hami'auf Jamal",
        role: "Imam 2",
        initials: "HJ",
        category: "pegawai" as const,
      },
    ],
    bilals: [
      {
        id: "bilal-1",
        name: "En. Nik Mohd Rosli",
        role: "Bilal 1",
        initials: "NR",
        category: "pegawai" as const,
      },
      {
        id: "bilal-2",
        name: "En. Hayatul Kamil",
        role: "Bilal 2",
        initials: "HK",
        category: "pegawai" as const,
      },
    ],
    siaks: [
      {
        id: "siak-1",
        name: "En. Anwar Idayah",
        role: "Siak 1",
        initials: "AI",
        category: "pegawai" as const,
      },
      {
        id: "siak-2",
        name: "En. Othman",
        role: "Siak 2",
        initials: "OT",
        category: "pegawai" as const,
      },
    ],
  },
  ahliJawatankuasa: [
    {
      id: "ajk-shahrul",
      name: "En. Shah Rul Niza",
      role: "Ahli Jawatankuasa",
      initials: "SN",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-manan",
      name: "En. Abd Manan",
      role: "Ahli Jawatankuasa",
      initials: "AM",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-faizal",
      name: "En. Mohd Faizal",
      role: "Ahli Jawatankuasa",
      initials: "MF",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-nabil",
      name: "En. Nabil",
      role: "Wakil Pemuda",
      initials: "NB",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-asan",
      name: "En. Asan Azhari",
      role: "Ahli Jawatankuasa",
      initials: "AA",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-fakhriah",
      name: "Pn. Fakhriah",
      role: "Pengurus Jenazah Muslimat",
      initials: "FK",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-azura",
      name: "Pn. Azura",
      role: "Ahli Jawatankuasa",
      initials: "AZ",
      category: "jawatankuasa" as const,
    },
    {
      id: "ajk-hanizah",
      name: "Pn. Hanizah",
      role: "Ahli Jawatankuasa",
      initials: "HN",
      category: "jawatankuasa" as const,
    },
  ],
};

export const committee: readonly CommitteeGroup[] = [
  {
    id: "pengurusan",
    title: "Pengurusan Tertinggi",
    description: "Saf kepimpinan utama pentadbiran Surau Al-Fateh KITA Bayu.",
    badge: "Puncak Kepimpinan",
    members: [
      organizationChart.pengerusi,
      organizationChart.timbalanPengerusi,
      ...organizationChart.eksekutif,
      ...organizationChart.timbalanEksekutif,
    ],
  },
  {
    id: "pegawai",
    title: "Pegawai Surau",
    description: "Imam, Bilal dan Siak yang memimpin ibadah dan pengurusan fizikal surau.",
    badge: "Imam, Bilal & Siak",
    members: [
      ...organizationChart.pegawaiSurau.imams,
      ...organizationChart.pegawaiSurau.bilals,
      ...organizationChart.pegawaiSurau.siaks,
    ],
  },
  {
    id: "jawatankuasa",
    title: "Ahli Jawatankuasa",
    description: "Barisan AJK yang menggerakkan aktiviti, biro, pemuda, dan muslimat.",
    badge: "AJK Sesi 2024 / 2026",
    members: organizationChart.ahliJawatankuasa,
  },
  {
    id: "pemeriksa",
    title: "Pemeriksa Kira-kira",
    description: "Juruaudit dalaman bagi ketelusan kewangan dan akaun surau.",
    badge: "Audit & Ketelusan",
    members: organizationChart.pemeriksaKiraKira,
  },
] as const;

export const allLeaders = committee.flatMap((group) => group.members);

