import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { siteConfig } from "@/config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const { brand, founder, location } = siteConfig;
const title = `${brand.name} | Best Career Counsellor in ${location.city} — ${founder.name}`;
const description = `Career counselling, psychometric assessments & study abroad guidance in ${location.city} and online across India by ${founder.name}, ${founder.headlineCredential}. Book a free 15-minute guidance call.`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title,
  description,
  keywords: [
    "career counselling hyderabad",
    "best career counsellor hyderabad",
    "career guidance hyderabad",
    "psychometric test hyderabad",
    "online career counselling india",
    "study abroad guidance hyderabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#081C3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
