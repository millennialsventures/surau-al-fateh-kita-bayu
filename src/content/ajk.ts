export interface AjkMember {
  name: string;
  role: string;
  category: "pengurusan" | "pegawai" | "pemeriksa" | "jawatankuasa";
}

export const ajkMembers: AjkMember[] = [
  {
    name: "Us Khairun Nizam",
    role: "Pengerusi",
    category: "pengurusan",
  },
  {
    name: "En. Muhammad Aliff",
    role: "Timbalan Pengerusi",
    category: "pengurusan",
  },
  {
    name: "En. Ali Asyraf",
    role: "Setiausaha",
    category: "pengurusan",
  },
  {
    name: "Pn. Nuruljannah",
    role: "Timbalan Setiausaha",
    category: "pengurusan",
  },
  {
    name: "En. Norazman",
    role: "Bendahari",
    category: "pengurusan",
  },
  {
    name: "Dr. Masita",
    role: "Timbalan Bendahari",
    category: "pengurusan",
  },
  {
    name: "En. Isham Ibrahim",
    role: "Imam 1",
    category: "pegawai",
  },
  {
    name: "En. Hami'auf Jamal",
    role: "Imam 2",
    category: "pegawai",
  },
  {
    name: "En. Nik Mohd Rosli",
    role: "Bilal 1",
    category: "pegawai",
  },
  {
    name: "En. Hayatul Kamil",
    role: "Bilal 2",
    category: "pegawai",
  },
  {
    name: "En. Anwar Idayah",
    role: "Siak 1",
    category: "pegawai",
  },
  {
    name: "En. Othman",
    role: "Siak 2",
    category: "pegawai",
  },
  {
    name: "En. Kh. Ikhwan",
    role: "Pemeriksa Kira-kira",
    category: "pemeriksa",
  },
  {
    name: "Pn. Rafidah",
    role: "Pemeriksa Kira-kira",
    category: "pemeriksa",
  },
  {
    name: "En. Shah Rul Niza",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
  {
    name: "En. Abd Manan",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
  {
    name: "En. Mohd Faizal",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
  {
    name: "En. Asan Azhari",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
  {
    name: "En. Nabil",
    role: "Wakil Pemuda",
    category: "jawatankuasa",
  },
  {
    name: "Pn. Fakhriah",
    role: "Pengurus Jenazah Muslimat",
    category: "jawatankuasa",
  },
  {
    name: "Pn. Azura",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
  {
    name: "Pn. Hanizah",
    role: "Ahli Jawatankuasa",
    category: "jawatankuasa",
  },
];
