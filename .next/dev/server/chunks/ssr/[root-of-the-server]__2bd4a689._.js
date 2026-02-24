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
"[project]/app/listing/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ListingIndexPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-rsc] (ecmascript)");
;
;
;
function ListingIndexPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-3xl mx-auto p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "매물 목록"
            }, void 0, false, {
                fileName: "[project]/app/listing/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-disc ml-5 space-y-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listings"].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            className: "underline",
                            href: `/listing/${x.id}`,
                            children: [
                                "/listing/",
                                x.id,
                                " — ",
                                x.title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/listing/page.tsx",
                            lineNumber: 11,
                            columnNumber: 13
                        }, this)
                    }, x.id, false, {
                        fileName: "[project]/app/listing/page.tsx",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/listing/page.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/listing/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/listing/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/listing/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2bd4a689._.js.map