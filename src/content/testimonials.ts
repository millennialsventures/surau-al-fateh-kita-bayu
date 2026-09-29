export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Alhamdulillah, surau yang sangat selesa dan aktif dengan pelbagai program ilmu. Semoga terus maju.",
    author: "Ahli Kariah",
    role: "Penduduk Kita Bayu",
  },
  {
    id: "2",
    quote:
      "Tempat terbaik untuk keluarga kami mendekatkan diri kepada Allah. Terima kasih Surau Al-Fateh.",
    author: "Ibu Muda",
    role: "Komuniti Muslimat",
  },
  {
    id: "3",
    quote:
      "Program surau sangat bermanfaat dan merapatkan ukhuwah masyarakat.",
    author: "Jemaah Tetap",
    role: "Kariah Cybersouth",
  },
];
