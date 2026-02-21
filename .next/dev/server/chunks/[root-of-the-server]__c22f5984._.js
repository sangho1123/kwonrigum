module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ... 상단 import 생략
__turbopack_context__.s([
    "proxy",
    ()=>proxy
]);
async function proxy(req) {
    const { pathname } = req.nextUrl;
    // 1. 정적 자원 및 인증/매물 API 무조건 통과
    if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.startsWith("/api/listings") || // 매물 API 통과
    pathname.includes(".")) {
        return NextResponse.next();
    }
    // 2. 채팅 API도 미들웨어 단계에서는 통과 (내부 route.ts에서 auth()로 검증)
    if (pathname.startsWith("/api/chat")) {
        return NextResponse.next();
    }
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    // 3. 공개 페이지 정의
    const publicPaths = [
        "/",
        "/login",
        "/register",
        "/listing",
        "/compare",
        "/calculator"
    ];
    const isPublic = publicPaths.some((path)=>pathname === path || pathname.startsWith("/listing/"));
    // 4. 페이지 접근 제어 (API가 아닌 일반 페이지 이동 시에만 리다이렉트)
    if (!isPublic && !token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c22f5984._.js.map