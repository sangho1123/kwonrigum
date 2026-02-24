module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/mockData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/mockData.ts
__turbopack_context__.s([
    "listings",
    ()=>listings
]);
const listings = [
    {
        id: 45,
        title: "논현동 소형 카페",
        category: "카페/디저트",
        gu: "강남구",
        dong: "논현동",
        address_area: "강남구 논현동",
        lat: 37.512345,
        lng: 127.032198,
        rent_monthly: 3_800_000,
        deposit: 30_000_000,
        goodwill_price: 50_000_000,
        monthly_sales: 35_000_000,
        parking_spaces: 1,
        photos: [
            "/photos/coffee.jpg"
        ],
        verification_status: "unverified"
    },
    {
        id: 47,
        title: "봉천동 치킨 전문",
        category: "치킨",
        gu: "관악구",
        dong: "봉천동",
        address_area: "관악구 봉천동",
        lat: 37.485555,
        lng: 126.955,
        rent_monthly: 2_500_000,
        deposit: 20_000_000,
        goodwill_price: 0,
        monthly_sales: 28_000_000,
        parking_spaces: 0,
        photos: [
            "/photos/chicken.jpg"
        ],
        verification_status: "unverified"
    }
];
}),
"[project]/app/listing/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/listing/[id]/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ListingDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
// mockData 폴백용
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function ListingDetailPage({ params }) {
    const { id } = await params;
    const num = Number(id);
    if (!Number.isFinite(num)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    // 세션은 선택사항(권한 체크용) – 에러나면 무시
    let meId;
    let myRole;
    try {
        const { auth } = await __turbopack_context__.A("[project]/lib/auth.ts [app-rsc] (ecmascript, async loader)");
        const session = await auth().catch(()=>null);
        meId = session?.user?.id;
        myRole = session?.user?.role;
    } catch  {}
    // 1) DB에서 먼저 시도
    let item = null;
    try {
        item = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].listing.findUnique({
            where: {
                id: num
            },
            select: {
                id: true,
                title: true,
                category: true,
                address_area: true,
                address_full: true,
                lat: true,
                lng: true,
                rent_monthly: true,
                deposit: true,
                goodwill_price: true,
                monthly_sales: true,
                parking_spaces: true,
                ownerId: true,
                photos: true,
                media: {
                    where: {
                        is_public: true,
                        file_type: "photo"
                    },
                    select: {
                        file_url: true
                    }
                }
            }
        });
    } catch  {
    // prisma 미정비여도 폴백으로 이어감
    }
    // 2) DB 없으면 mock으로 폴백
    let fromMock = false;
    let title = item?.title ?? "";
    let category = item?.category ?? "";
    let address_area = item?.address_area ?? "";
    let lat = item?.lat ?? null;
    let lng = item?.lng ?? null;
    let rent_monthly = item?.rent_monthly ?? null;
    let deposit = item?.deposit ?? null;
    let goodwill_price = item?.goodwill_price ?? null;
    let monthly_sales = item?.monthly_sales ?? null;
    let parking_spaces = item?.parking_spaces ?? null;
    let ownerId = item?.ownerId ?? null;
    let photos = Array.isArray(item?.photos) ? item.photos : Array.isArray(item?.media) ? item.media.map((m)=>m.file_url) : [];
    if (!item) {
        const mockOne = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__.listings?.find((x)=>x.id === num);
        if (!mockOne) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        fromMock = true;
        title = mockOne.title ?? "(제목 없음)";
        category = mockOne.category ?? "";
        address_area = mockOne.address_area ?? "";
        lat = mockOne.lat ?? null;
        lng = mockOne.lng ?? null;
        rent_monthly = mockOne.rent_monthly ?? null;
        deposit = mockOne.deposit ?? null;
        goodwill_price = mockOne.goodwill_price ?? null;
        monthly_sales = mockOne.monthly_sales ?? null;
        parking_spaces = mockOne.parking_spaces ?? null;
        const media = Array.isArray(mockOne.media) ? mockOne.media.filter((m)=>m.file_type === "photo").map((m)=>m.file_url) : [];
        photos = [
            ...mockOne.thumbnail_url ? [
                mockOne.thumbnail_url
            ] : [],
            ...media
        ];
    }
    const canEdit = !fromMock && !!meId && (ownerId === meId || myRole === "ADMIN");
    const fmt = (n)=>n == null ? "-" : new Intl.NumberFormat("ko-KR").format(n);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-4xl mx-auto p-4 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold",
                                children: title || "(제목 없음)"
                            }, void 0, false, {
                                fileName: "[project]/app/listing/[id]/page.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            address_area && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-neutral-600",
                                children: address_area
                            }, void 0, false, {
                                fileName: "[project]/app/listing/[id]/page.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/listing/[id]/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/listing/${num}/edit`,
                        className: "rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50",
                        children: "수정"
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/listing/[id]/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            photos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: photos.slice(0, 2).map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative aspect-[4/3] rounded-xl overflow-hidden border bg-neutral-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: src,
                            alt: `photo-${i}`,
                            fill: true,
                            sizes: "(max-width: 768px) 100vw, 50vw",
                            style: {
                                objectFit: "cover"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 140,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/app/listing/[id]/page.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/listing/[id]/page.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border bg-white p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-x-8 gap-y-2 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "월세: ",
                                fmt(rent_monthly)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "임대보증금: ",
                                fmt(deposit)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "권리금: ",
                                fmt(goodwill_price)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "월매출: ",
                                fmt(monthly_sales)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "주차: ",
                                parking_spaces ?? 0,
                                "대"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "좌표: ",
                                lat ?? "-",
                                ", ",
                                lng ?? "-"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/[id]/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/listing/[id]/page.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/listing/[id]/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/listing/[id]/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/listing/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/listing/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2b14716f._.js.map