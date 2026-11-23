import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { getPublishedContent } from "@/lib/content";
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

export async function generateMetadata(): Promise<Metadata> {
  const { brand, seo } = (await getPublishedContent()).site;
  const images = seo.ogImage ? [seo.ogImage] : undefined;
  return {
    metadataBase: new URL(brand.url),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: brand.url,
      siteName: brand.name,
      title: seo.title,
      description: seo.description,
      locale: "en_IN",
      images,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images },
  };
}

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
