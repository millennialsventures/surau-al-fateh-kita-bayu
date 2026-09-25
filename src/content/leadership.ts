export type Leader = {
  id: string;
  name: string;
  role: string;
  /** Short line about their responsibility, shown under the name. */
  remit: string;
  /** TODO: replace with real portraits. */
  photo: string | null;
  initials: string;
};

export type CommitteeGroup = {
  id: string;
  title: string;
  description: string;
  members: Leader[];
};

/**
 * Names are placeholders. The committee must confirm the real office bearers
 * before this page goes live — see the TODO on the About page.
 */
export const committee: readonly CommitteeGroup[] = [
  {
    id: "pengurusan",
    title: "Ahli Pengurusan",
    description: "Kepimpinan utama surau.",
    members: [
      {
        id: "p1",
        name: "TODO: Nama Ketua Surau",
        role: "Ketua Surau",
        remit: "Memimpin hal ehwal umum surau.",
        photo: null,
        initials: "KS",
      },
      {
        id: "p2",
        name: "TODO: Nama Timbalan Ketua",
        role: "Timbalan Ketua",
        remit: "Membantu ketua dalam urusan harian.",
        photo: null,
        initials: "TK",
      },
      {
        id: "p3",
        name: "TODO: Nama Bendahari",
        role: "Bendahari",
        remit: "Mengurus kewangan dan penyata akaun.",
        photo: null,
        initials: "BN",
      },
      {
        id: "p4",
        name: "TODO: Nama Setiausaha",
        role: "Setiausaha",
        remit: "Mengekalkan minit mesyuarat dan surat menyurat.",
        photo: null,
        initials: "SS",
      },
    ],
  },
  {
    id: "jabatan",
    title: "Ketua Jabatan",
    description: "Setiap jabatan menyelarai satu bidang kerja utama.",
    members: [
      {
        id: "j1",
        name: "TODO: Nama Ketua Jabatan",
        role: "Jabatan Ibadah",
        remit: "Mengurus solat berjamaah.",
        photo: null,
        initials: "JI",
      },
      {
        id: "j2",
        name: "TODO: Nama Ketua Jabatan",
        role: "Jabatan Pendidikan",
        remit: "Mengelola kelas Al-Quran dan program belia.",
        photo: null,
        initials: "JP",
      },
      {
        id: "j3",
        name: "TODO: Nama Ketua Jabatan",
        role: "Jabatan Sosial",
        remit: "Menjalankan bantuan sosial.",
        photo: null,
        initials: "JS",
      },
      {
        id: "j4",
        name: "TODO: Nama Ketua Jabatan",
        role: "Jabatan Sekretariat",
        remit: "Mengurus pentadbiran dan dokumentasi.",
        photo: null,
        initials: "JU",
      },
    ],
  },
] as const;

export const allLeaders = committee.flatMap((group) => group.members);
