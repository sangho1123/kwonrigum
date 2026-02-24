// components/TopNav.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";

export default function TopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // 현재 페이지가 활성화되었는지 확인하는 함수
  const isActive = (path: string) => pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-1">
          🏬 권리금마켓
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/listing" className={isActive("/listing")}>
            매물 찾기
          </Link>
          <Link href="/listing/new" className={isActive("/listing/new")}>
            매물 내놓기
          </Link>
          <Link href="/calculator" className={`${isActive("/calculator")} flex items-center gap-1`}>
            <span>🧮</span> 권리금 계산기
          </Link>
          <Link href="/analysis" className={`${isActive("/analysis")} flex items-center gap-1`}>
            <span>📊</span> 상권 분석
          </Link> 
          <Link href="/quote/fitout" className={isActive("/quote/fitout")}>
            인테리어 견적
          </Link>
        </div>

        {/* 우측 버튼 (로그인 상태에 따라 다르게 표시) */}
        <div className="hidden md:flex items-center space-x-3">
          {status === "loading" ? (
            <span className="text-sm text-gray-400">로딩중...</span>
          ) : session ? (
            // ✅ 로그인 했을 때: 마이페이지 & 로그아웃 버튼 표시
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                안녕하세요, <b>{session.user?.name || "회원"}</b>님!
              </span>
              <div className="flex items-center gap-2">
                <Link href="/mypage">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    마이페이지
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  로그아웃
                </Button>
              </div>
            </div>
          ) : (
            // ❌ 로그인 안 했을 때: 로그인/회원가입 버튼 표시
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">로그인</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">회원가입</Button>
              </Link>
            </>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 shadow-lg">
          <Link href="/listing" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            매물 찾기
          </Link>
          <Link href="/listing/new" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            매물 내놓기
          </Link>
          <Link href="/calculator" className="block py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
            🧮 권리금 계산기
          </Link>
          <Link href="/quote/fitout" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            인테리어 견적
          </Link>
          
          <div className="pt-3 border-t border-gray-100">
            {session ? (
              // ✅ 모바일 로그인 상태: 마이페이지 추가
              <div className="flex flex-col gap-2">
                 <span className="text-sm text-gray-700 mb-1">
                  👤 {session.user?.name || "회원"}님 로그인 중
                </span>
                <Link href="/mypage" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                    마이페이지
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => signOut()}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">로그인</Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">회원가입</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}