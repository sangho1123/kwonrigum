(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/jwt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
// 1. 로그인 없이도 접근 가능한 경로 (정적 파일 제외)
const publicPaths = [
    "/",
    "/login",
    "/register",
    "/listing",
    "/listing/*",
    "/calculator",
    "/analysis",
    "/compare",
    "/api/listings/*"
];
async function middleware(req) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const { pathname } = req.nextUrl;
    // 2. 정적 파일 및 넥스트 내부 자원은 무조건 통과 (디자인 깨짐 방지)
    if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.includes(".") // .css, .js, .png 등 확장자 포함 파일
    ) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // 3. 공공 경로 확인
    const isPublic = publicPaths.some((path)=>{
        if (path.endsWith("/*")) {
            return pathname.startsWith(path.replace("/*", ""));
        }
        return pathname === path;
    });
    // 4. 채팅 API 인증 체크 (리다이렉트가 아닌 401 응답)
    if (pathname.startsWith("/api/chat") && !token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    // 5. 비공개 페이지인데 토큰이 없으면 로그인으로 리다이렉트
    if (!isPublic && !token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("callbackUrl", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * 아래로 시작하는 경로를 제외한 모든 경로에 미들웨어 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더 내부 파일들
     */ "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map