import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";
import { SiteHeader } from "../components/SiteHeader";
import Footer from "../components/Footer";
import commonEn from "../public/locales/en/common.json";

const metadataTranslations = (commonEn as { metadata?: { title?: string; description?: string } }).metadata;

export function generateMetadata(): Metadata {
  return {
    title: metadataTranslations?.title ?? "Foster + Partners",
    description: metadataTranslations?.description ?? "",
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <SiteHeader />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
