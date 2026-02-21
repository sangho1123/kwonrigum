import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. API 및 자원 무조건 통과
  if (
    pathname.startsWith("/api") || 
    pathname.startsWith("/_next") || 
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. 토큰 확인
  const token = await getToken({ 
    req, 
    // .env의 NEXTAUTH_SECRET을 정확히 참조
    secret: process.env.NEXTAUTH_SECRET 
  });

  // 3. 공개 페이지 (나머지는 모두 보호)
  const publicPaths = ["/", "/login", "/register", "/listing", "/compare", "/calculator"];
  const isPublic = publicPaths.some(path => 
    pathname === path || pathname.startsWith("/listing/")
  );

  // 4. ✅ 핵심: 채팅방(/chat) 등 보호된 페이지 접근 시 토큰이 있으면 통과
  if (token) {
    // 이미 로그인된 사용자가 로그인창 가려 하면 메인으로
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 5. 토큰 없는데 비공개 페이지 가려 하면 로그인으로
  if (!isPublic && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};