import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helix",
  description: "Plataforma de missões, avaliações e recompensas",
  manifest: "/manifest.webmanifest",
  themeColor: "#101827"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Script src="/assets/js/local-img.js" strategy="beforeInteractive" />
        <Script src="/assets/js/sounds.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
