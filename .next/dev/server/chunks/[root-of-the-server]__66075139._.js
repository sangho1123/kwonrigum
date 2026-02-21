module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/db.ts
__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "query",
        "error",
        "warn"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/lib/partners.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/partners.ts
__turbopack_context__.s([
    "partners",
    ()=>partners
]);
const partners = [
    {
        id: "lend-001",
        name: "샘플 대출 제휴사",
        type: "lender",
        areas: [
            "강남구",
            "관악구"
        ],
        webhookUrl: "/api/partners/webhook"
    },
    {
        id: "fit-001",
        name: "샘플 인테리어 제휴사",
        type: "fitout",
        areas: [
            "강남구",
            "관악구"
        ],
        webhookUrl: "/api/partners/webhook"
    },
    {
        id: "close-001",
        name: "샘플 폐업정리 제휴사",
        type: "closure",
        webhookUrl: "/api/partners/webhook"
    }
];
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/leads/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/leads/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/partners.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].lead.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 200
        });
        const items = rows.map((r)=>({
                id: r.id,
                type: r.type,
                listingId: r.listingId ?? undefined,
                name: r.name,
                phone: r.phone,
                message: r.message ?? undefined,
                payload: r.payload ?? undefined,
                partnerId: r.partnerId ?? null,
                // AdminLeadsPage에서 number로 쓰고 있으니 timestamp로 변환
                createdAt: r.createdAt.getTime()
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            items
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: e?.message || "서버 오류"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { type = "listing", listingId, name, phone, message, payload } = body;
        if (!name || !phone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "필수 값 누락(name, phone)"
            }, {
                status: 400
            });
        }
        // listingId 숫자 변환 (문자로 들어와도 처리)
        let listingIdNum = null;
        if (typeof listingId === "number") {
            listingIdNum = listingId;
        } else if (typeof listingId === "string" && listingId.trim() !== "") {
            const n = Number(listingId);
            if (Number.isFinite(n)) listingIdNum = n;
        }
        // 1) DB에 리드 생성 (처음에는 partnerId 없이)
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].lead.create({
            data: {
                type: String(type),
                listingId: listingIdNum,
                name: String(name),
                phone: String(phone),
                message: message ? String(message) : null,
                payload: payload ?? null,
                partnerId: null
            }
        });
        let partnerId = null;
        // 2) 간단한 라우팅: 타입별 첫 파트너
        const partner = type === "loan" && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partners"].find((p)=>p.type === "lender") || type === "fitout" && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partners"].find((p)=>p.type === "fitout") || type === "closure" && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partners"].find((p)=>p.type === "closure") || null;
        if (partner) {
            try {
                await fetch(partner.webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        partnerId: partner.id,
                        lead: {
                            id: created.id,
                            type,
                            listingId: listingIdNum,
                            name,
                            phone,
                            message,
                            payload,
                            createdAt: created.createdAt.getTime()
                        }
                    })
                });
                // 웹훅 성공 시 DB에 partnerId 업데이트
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].lead.update({
                    where: {
                        id: created.id
                    },
                    data: {
                        partnerId: partner.id
                    }
                });
                partnerId = partner.id;
            } catch  {
            // 파트너 호출 실패해도 리드는 DB에 남아 있게 둠
            }
        }
        console.log("[LEAD][DB]", {
            id: created.id,
            partnerId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            id: created.id,
            partnerId
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: e?.message || "서버 오류"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__66075139._.js.map