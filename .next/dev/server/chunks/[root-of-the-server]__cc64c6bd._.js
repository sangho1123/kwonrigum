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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
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
"[project]/lib/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/store.ts
// ---- Lead demo store ----
__turbopack_context__.s([
    "getProofStatus",
    ()=>getProofStatus,
    "leads",
    ()=>leads,
    "proofs",
    ()=>proofs,
    "setProofStatus",
    ()=>setProofStatus
]);
const leads = [];
const proofs = [];
// 인메모리 검증 상태 맵
const proofStatusByListing = new Map();
function setProofStatus(listingId, status) {
    proofStatusByListing.set(listingId, status);
}
function getProofStatus(listingId) {
    return proofStatusByListing.get(listingId);
}
}),
"[project]/app/api/leads/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/leads/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/partners.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-route] (ecmascript)");
;
;
;
const ALLOWED_TYPES = new Set([
    "listing",
    "loan",
    "fitout",
    "closure"
]);
const DEDUP_WINDOW_MS = 2 * 60 * 1000; // 2분
const WEBHOOK_TIMEOUT_MS = 3000;
// 간단 CORS 헬퍼 (외부 도메인 폼 직접 POST 허용용)
function withCors(res) {
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
}
async function OPTIONS() {
    return withCors(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 204
    }));
}
async function GET(req) {
    const limitParam = req.nextUrl.searchParams.get("limit");
    const limit = Math.max(1, Math.min(500, Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100));
    // 최신 먼저
    const items = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["leads"].slice(0, limit);
    return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        items
    }));
}
async function POST(req) {
    try {
        let body;
        try {
            body = await req.json();
        } catch  {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "잘못된 JSON 본문"
            }, {
                status: 400
            }));
        }
        // 추출 + 기본값
        let { type = "listing", listingId, name, phone, message, payload } = body ?? {};
        // 기본 검증
        if (typeof name !== "string" || typeof phone !== "string") {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "필수 값 누락 또는 타입 불일치(name, phone)"
            }, {
                status: 400
            }));
        }
        // type 정규화
        if (typeof type !== "string") type = "listing";
        type = String(type).toLowerCase().trim();
        if (!ALLOWED_TYPES.has(type)) type = "listing";
        // listingId 숫자 검증 (선택값)
        let listingIdNum = undefined;
        if (listingId !== undefined && listingId !== null && listingId !== "") {
            const n = Number(listingId);
            if (!Number.isFinite(n)) {
                return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: false,
                    error: "listingId는 숫자여야 합니다"
                }, {
                    status: 422
                }));
            }
            listingIdNum = n;
        }
        // 이름/전화 정규화
        const nameTrim = name.trim();
        const phoneDigits = String(phone).replace(/\D+/g, "");
        if (!nameTrim) {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "이름이 비어있습니다"
            }, {
                status: 422
            }));
        }
        if (phoneDigits.length < 8) {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "전화번호 형식이 올바르지 않습니다"
            }, {
                status: 422
            }));
        }
        // payload는 객체만 허용(선택)
        if (payload !== undefined && payload !== null && (typeof payload !== "object" || Array.isArray(payload))) {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "payload는 객체여야 합니다"
            }, {
                status: 422
            }));
        }
        // 디듀프: 동일 (name, phone, listingId, type) 2분 내 재접수 방지
        const now = Date.now();
        const dup = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["leads"].find((l)=>l.type === type && l.name === nameTrim && l.phone === phoneDigits && (l.listingId ?? undefined) === (listingIdNum ?? undefined) && now - l.createdAt < DEDUP_WINDOW_MS);
        if (dup) {
            return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                id: dup.id,
                partnerId: dup.partnerId,
                dedup: true
            }));
        }
        // 리드 생성
        const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(now);
        const lead = {
            id,
            type,
            listingId: listingIdNum,
            name: nameTrim,
            phone: phoneDigits,
            message,
            payload,
            partnerId: null,
            createdAt: now
        };
        // 파트너 라우팅: type별 매핑
        // loan -> lender, fitout -> fitout, closure -> closure, listing -> 전달 안함(내부 처리)
        const routeType = type === "loan" ? "lender" : type === "fitout" ? "fitout" : type === "closure" ? "closure" : null;
        const partner = routeType ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$partners$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partners"].find((p)=>p.type === routeType) : null;
        if (partner) {
            // 웹훅 호출 (타임아웃/실패 허용: 실패해도 리드는 저장)
            const controller = new AbortController();
            const timer = setTimeout(()=>controller.abort(), WEBHOOK_TIMEOUT_MS);
            try {
                const resp = await fetch(partner.webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        partnerId: partner.id,
                        lead
                    }),
                    signal: controller.signal
                });
                if (resp.ok) {
                    lead.partnerId = partner.id;
                } else {
                // 실패면 partnerId 유지(null)
                // 필요시 resp.text() 로깅 가능
                }
            } catch  {
            // 타임아웃/네트워크 오류 → 무시하고 내부 저장 진행
            } finally{
                clearTimeout(timer);
            }
        }
        // 선두에 저장(최근 순)
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["leads"].unshift(lead);
        // 민감정보 과다 로깅 방지: phone은 로깅하지 않음
        console.log("[LEAD] created", {
            id: lead.id,
            type: lead.type,
            listingId: lead.listingId,
            partnerId: lead.partnerId
        });
        return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            id: lead.id,
            partnerId: lead.partnerId
        }, {
            status: 201
        }));
    } catch (e) {
        return withCors(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: e?.message || "서버 오류"
        }, {
            status: 500
        }));
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cc64c6bd._.js.map