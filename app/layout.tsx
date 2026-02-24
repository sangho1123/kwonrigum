import TopNav from "@/components/TopNav";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
// 👇 임포트는 이미 잘 되어 있습니다.
import CompareBar from "@/components/CompareBar";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: "권리금중개앱",
  description: "권리금/대출/인테리어 통합 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          {/* 👇 1. CompareProvider로 내용을 감싸주세요 */}
          <CompareProvider>
            <TopNav />
            {children}
            {/* 👇 2. CompareBar를 맨 아래에 추가해주세요 (선택 시 하단에 뜨는 바) */}
            <CompareBar />
          </CompareProvider>
        </SessionProvider>
      </body>
    </html>
  );
}