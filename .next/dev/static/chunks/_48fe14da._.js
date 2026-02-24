(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mockAnalysis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/mockAnalysis.ts
__turbopack_context__.s([
    "getMockAnalysisData",
    ()=>getMockAnalysisData
]);
function getMockAnalysisData(address, category) {
    let data = {
        region: address || "지역 미상",
        category: category || "일반업종",
        floatingPopulation: 12500,
        topAgeGroup: "30대",
        peakTime: "12:00 ~ 14:00",
        avgRevenue: 3500,
        competitionCount: 15,
        trend: "보합세",
        weekdaysRatio: 60,
        weekendRatio: 40,
        lat: 37.5665,
        lng: 126.9780
    };
    if (address.includes("역삼동")) {
        data = {
            ...data,
            lat: 37.4979,
            lng: 127.0276,
            floatingPopulation: 85000,
            topAgeGroup: "30대 직장인",
            peakTime: "11:30 ~ 13:30",
            avgRevenue: 8500,
            competitionCount: 42,
            trend: "상승세",
            weekdaysRatio: 85,
            weekendRatio: 15
        };
    } else if (address.includes("서교동") || address.includes("홍대")) {
        data = {
            ...data,
            lat: 37.5565,
            lng: 126.9239,
            floatingPopulation: 62000,
            topAgeGroup: "20대 대학생",
            peakTime: "18:00 ~ 22:00",
            avgRevenue: 5200,
            competitionCount: 55,
            trend: "상승세",
            weekdaysRatio: 40,
            weekendRatio: 60
        };
    } else if (address.includes("한남동")) {
        data = {
            ...data,
            lat: 37.5344,
            lng: 127.0022,
            floatingPopulation: 25000,
            topAgeGroup: "30-40대",
            peakTime: "13:00 ~ 16:00",
            avgRevenue: 6800,
            competitionCount: 18,
            trend: "상승세",
            weekdaysRatio: 50,
            weekendRatio: 50
        };
    } else if (address.includes("성수동")) {
        data = {
            ...data,
            lat: 37.5446,
            lng: 127.0560,
            floatingPopulation: 58000,
            topAgeGroup: "20-30대",
            peakTime: "12:00 ~ 18:00",
            avgRevenue: 6500,
            competitionCount: 38,
            trend: "상승세",
            weekdaysRatio: 45,
            weekendRatio: 55
        };
    } else if (address.includes("이태원동")) {
        data = {
            ...data,
            lat: 37.5358,
            lng: 126.9899,
            floatingPopulation: 35000,
            topAgeGroup: "20-30대, 외국인",
            peakTime: "20:00 ~ 02:00",
            avgRevenue: 5000,
            competitionCount: 25,
            trend: "보합세",
            weekdaysRatio: 30,
            weekendRatio: 70
        };
    } else if (address.includes("여의도동")) {
        data = {
            ...data,
            lat: 37.5216,
            lng: 126.9242,
            floatingPopulation: 95000,
            topAgeGroup: "40대 직장인",
            peakTime: "11:30 ~ 13:00",
            avgRevenue: 7500,
            competitionCount: 48,
            trend: "보합세",
            weekdaysRatio: 90,
            weekendRatio: 10
        };
    } else if (address.includes("송파동")) {
        data = {
            ...data,
            lat: 37.5070,
            lng: 127.1064,
            floatingPopulation: 42000,
            topAgeGroup: "20-30대 여성",
            peakTime: "14:00 ~ 18:00",
            avgRevenue: 4800,
            competitionCount: 32,
            trend: "상승세",
            weekdaysRatio: 40,
            weekendRatio: 60
        };
    } else if (address.includes("신사동")) {
        data = {
            ...data,
            lat: 37.5208,
            lng: 127.0227,
            floatingPopulation: 45000,
            topAgeGroup: "20-30대",
            peakTime: "18:00 ~ 21:00",
            avgRevenue: 8200,
            competitionCount: 28,
            trend: "보합세",
            weekdaysRatio: 55,
            weekendRatio: 45
        };
    } else if (address.includes("익선동")) {
        data = {
            ...data,
            lat: 37.5744,
            lng: 126.9898,
            floatingPopulation: 38000,
            topAgeGroup: "20대, 관광객",
            peakTime: "13:00 ~ 19:00",
            avgRevenue: 4500,
            competitionCount: 22,
            trend: "하락세",
            weekdaysRatio: 35,
            weekendRatio: 65
        };
    } else if (address.includes("가회동") || address.includes("북촌")) {
        data = {
            ...data,
            lat: 37.5829,
            lng: 126.9835,
            floatingPopulation: 28000,
            topAgeGroup: "30-50대",
            peakTime: "11:00 ~ 15:00",
            avgRevenue: 3200,
            competitionCount: 12,
            trend: "보합세",
            weekdaysRatio: 40,
            weekendRatio: 60
        };
    }
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/analysis/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/analysis/page.tsx
__turbopack_context__.s([
    "default",
    ()=>AnalysisPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockAnalysis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockAnalysis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AnalysisPage() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const address = searchParams.get("address") || "서울 강남구 역삼동";
    const category = searchParams.get("category") || "카페/디저트";
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalysisPage.useEffect": ()=>{
            // 실제로는 API 호출을 하겠지만, 여기서는 모의 데이터를 즉시 불러옵니다.
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockAnalysis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockAnalysisData"])(address, category);
            setData(result);
        }
    }["AnalysisPage.useEffect"], [
        address,
        category
    ]);
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center",
        children: "분석 데이터를 불러오는 중..."
    }, void 0, false, {
        fileName: "[project]/app/analysis/page.tsx",
        lineNumber: 21,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-3",
                            children: "AI 상권 분석 리포트"
                        }, void 0, false, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-extrabold text-gray-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-indigo-600",
                                    children: [
                                        "[",
                                        data.region,
                                        "]"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                " 주변 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 73
                                }, this),
                                data.category,
                                " 업종 분석 결과입니다."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/analysis/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 font-medium mb-1",
                                    children: "일평균 유동인구"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: [
                                        data.floatingPopulation.toLocaleString(),
                                        "명"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 font-medium mb-1",
                                    children: "동종업계 평균 월매출"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-blue-600",
                                    children: [
                                        data.avgRevenue.toLocaleString(),
                                        "만원"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 font-medium mb-1",
                                    children: "주요 소비 연령층"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: data.topAgeGroup
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 font-medium mb-1",
                                    children: "반경 500m 내 경쟁점포"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-red-500",
                                    children: [
                                        data.competitionCount,
                                        "개"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/analysis/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-bold mb-6 flex items-center gap-2",
                                    children: "⏱️ 소비 패턴 분석"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-sm mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "가장 붐비는 시간대"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analysis/page.tsx",
                                                            lineNumber: 67,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-indigo-600",
                                                            children: data.peakTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analysis/page.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/analysis/page.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-2 w-full bg-gray-100 rounded-full overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-indigo-500 w-3/4 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analysis/page.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analysis/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analysis/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 border-t",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 mb-4",
                                                    children: "평일 vs 주말 매출 비중"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analysis/page.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-8 rounded-lg overflow-hidden text-xs font-bold text-white text-center leading-8 shadow-inner",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: `${data.weekdaysRatio}%`
                                                            },
                                                            className: "bg-blue-500 transition-all",
                                                            children: [
                                                                "평일 ",
                                                                data.weekdaysRatio,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analysis/page.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: `${data.weekendRatio}%`
                                                            },
                                                            className: "bg-orange-400 transition-all",
                                                            children: [
                                                                "주말 ",
                                                                data.weekendRatio,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analysis/page.tsx",
                                                            lineNumber: 81,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/analysis/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analysis/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold mb-2 flex items-center gap-2",
                                            children: "📈 상권 종합 트렌드"
                                        }, void 0, false, {
                                            fileName: "[project]/app/analysis/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm mb-6",
                                            children: "최근 6개월 간의 상권 활성도를 분석했습니다."
                                        }, void 0, false, {
                                            fileName: "[project]/app/analysis/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center p-8 bg-gray-50 rounded-xl mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-4xl font-black mb-2 ${data.trend === "상승세" ? "text-red-500" : data.trend === "보합세" ? "text-green-500" : "text-blue-500"}`,
                                                        children: data.trend === "상승세" ? "🔥 상승세" : data.trend === "보합세" ? "✨ 안정적 보합세" : "❄️ 하락세 주의"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analysis/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: [
                                                            data.trend === "상승세" && "유동인구와 평균 매출이 꾸준히 증가하고 있는 핫플레이스입니다.",
                                                            data.trend === "보합세" && "매출 변동폭이 적어 안정적인 매장 운영이 가능한 상권입니다.",
                                                            data.trend === "하락세" && "최근 상권 활성도가 다소 감소하고 있어 신중한 접근이 필요합니다."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analysis/page.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/analysis/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/analysis/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>history.back(),
                                    className: "w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition",
                                    children: "매물 상세로 돌아가기"
                                }, void 0, false, {
                                    fileName: "[project]/app/analysis/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analysis/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/analysis/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/analysis/page.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/analysis/page.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(AnalysisPage, "OiGgvCKkL0XJ7LXmabT6p6Epo3M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AnalysisPage;
var _c;
__turbopack_context__.k.register(_c, "AnalysisPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_48fe14da._.js.map