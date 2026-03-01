import CompareBar from "@/components/CompareBar";
import TopNav from "@/components/TopNav";
import { CompareProvider } from "@/context/CompareContext";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "권리금 중개 서비스",
  description: "투명한 권리금 거래 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 🗺️ 네이버 지도 스크립트 (변수명 수정 완료) */}
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <CompareProvider>
            <TopNav />
            <main className="pt-16 pb-20">
              {children}
            </main>
            <CompareBar />
          </CompareProvider>
        </SessionProvider>
      </body>
    </html>
  );
}