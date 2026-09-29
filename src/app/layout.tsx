import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/** TODO: replace with the real production domain before go-live. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surau-al-fateh-kita.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "surau",
    "Bayu Cybersouth",
    "Cyberjaya",
    "Selangor",
    "rumah ibadah",
    "masjid",
    "solat berjamaah",
    "kelas Al-Quran",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
    images: [
      {
        url: "/logo-ek-kitabayu.png",
        width: 300,
        height: 300,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
    images: ["/logo-ek-kitabayu.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ms" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Terus ke kandungan utama
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
