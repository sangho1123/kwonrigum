(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/calculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 업종별 평균 순수익률 (가정)
__turbopack_context__.s([
    "calculatePremium",
    ()=>calculatePremium
]);
const MARGIN_RATES = {
    cafe: 0.25,
    restaurant: 0.20,
    retail: 0.15,
    pub: 0.25,
    beauty: 0.30,
    gym: 0.35,
    other: 0.20
};
function calculatePremium(inputs) {
    const { monthlyRevenue, monthlyRent, deposit, sector, facilityAge, area } = inputs;
    const marginRate = MARGIN_RATES[sector] || 0.20;
    // 1. 영업권리금 (예상 월 순수익 * 10개월)
    // 순수익 = (매출 * 마진율) - 월세
    const monthlyProfit = monthlyRevenue * marginRate - monthlyRent;
    const businessPremium = Math.max(0, monthlyProfit * 10);
    // 2. 바닥권리금 (보증금의 10% + 평당 30만원 기본 가정)
    // *실제로는 유동인구가 중요하지만 여기선 보증금을 척도로 사용
    const locationPremium = deposit * 0.1 + area * 30;
    // 3. 시설권리금 (평당 150만원 투자 가정, 매년 20% 감가상각)
    const initialFacilityCost = area * 150;
    const depreciationFactor = Math.max(0.2, 1 - facilityAge * 0.2); // 최소 20%는 남김
    const facilityPremium = initialFacilityCost * depreciationFactor;
    // 총 권리금 합계
    const total = businessPremium + locationPremium + facilityPremium;
    // 범위 제공 (±15%)
    return {
        min: Math.round(total * 0.85 / 100) * 100,
        max: Math.round(total * 1.15 / 100) * 100,
        details: {
            business: Math.round(businessPremium),
            location: Math.round(locationPremium),
            facility: Math.round(facilityPremium)
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/classnames/index.js [app-client] (ecmascript)");
"use client";
;
;
function Button({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-card", "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700", "disabled:opacity-40 disabled:cursor-not-allowed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PremiumCalculator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PremiumCalculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/calculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)"); // 기존 Button 컴포넌트 활용
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const SECTORS = [
    {
        value: "cafe",
        label: "카페/디저트"
    },
    {
        value: "restaurant",
        label: "식당/음식점"
    },
    {
        value: "pub",
        label: "주점/호프"
    },
    {
        value: "retail",
        label: "판매업/소매"
    },
    {
        value: "beauty",
        label: "미용/뷰티"
    },
    {
        value: "gym",
        label: "운동/헬스"
    },
    {
        value: "other",
        label: "기타"
    }
];
function PremiumCalculator() {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        monthlyRevenue: "",
        monthlyRent: "",
        deposit: "",
        area: "",
        sector: "cafe",
        facilityAge: "2"
    });
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleCalculate = ()=>{
        // 입력값 검증
        if (!formData.monthlyRevenue || !formData.monthlyRent || !formData.area) {
            alert("주요 정보를 모두 입력해주세요.");
            return;
        }
        const calculated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePremium"])({
            monthlyRevenue: Number(formData.monthlyRevenue),
            monthlyRent: Number(formData.monthlyRent),
            deposit: Number(formData.deposit),
            area: Number(formData.area),
            sector: formData.sector,
            facilityAge: Number(formData.facilityAge)
        });
        setResult(calculated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2",
                children: "🤖 AI 권리금 계산기"
            }, void 0, false, {
                fileName: "[project]/components/PremiumCalculator.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "업종"
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                name: "sector",
                                value: formData.sector,
                                onChange: handleChange,
                                className: "w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none",
                                children: SECTORS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: s.value,
                                        children: s.label
                                    }, s.value, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "월 평균 매출 (만원)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "monthlyRevenue",
                                        placeholder: "예: 3000",
                                        value: formData.monthlyRevenue,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded-md p-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "월세 (만원)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "monthlyRent",
                                        placeholder: "예: 250",
                                        value: formData.monthlyRent,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded-md p-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "보증금 (만원)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "deposit",
                                        placeholder: "예: 5000",
                                        value: formData.deposit,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded-md p-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "매장 평수 (평)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "area",
                                        placeholder: "예: 20",
                                        value: formData.area,
                                        onChange: handleChange,
                                        className: "w-full border border-gray-300 rounded-md p-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PremiumCalculator.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "시설 사용 기간 (년)"
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                name: "facilityAge",
                                placeholder: "예: 2",
                                value: formData.facilityAge,
                                onChange: handleChange,
                                className: "w-full border border-gray-300 rounded-md p-2"
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1",
                                children: "*시설 감가상각 계산에 사용됩니다."
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleCalculate,
                            className: "w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white",
                            children: "적정 권리금 조회하기"
                        }, void 0, false, {
                            fileName: "[project]/components/PremiumCalculator.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PremiumCalculator.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-600 mb-2",
                        children: "분석 결과 예상 적정가는"
                    }, void 0, false, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-3xl font-extrabold text-blue-700",
                                children: [
                                    result.min.toLocaleString(),
                                    " ~ ",
                                    result.max.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl text-gray-700 ml-1",
                                children: "만원"
                            }, void 0, false, {
                                fileName: "[project]/components/PremiumCalculator.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-xs text-gray-400 mt-3",
                        children: "* 이 결과는 추정치이며 실제 거래가는 상권과 협의에 따라 달라질 수 있습니다."
                    }, void 0, false, {
                        fileName: "[project]/components/PremiumCalculator.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PremiumCalculator.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PremiumCalculator.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(PremiumCalculator, "CXplQfmgiR9GS7ymRF+yHYuuuDw=");
_c = PremiumCalculator;
var _c;
__turbopack_context__.k.register(_c, "PremiumCalculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/classnames/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ /* global define */ (function() {
    'use strict';
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
        var classes = '';
        for(var i = 0; i < arguments.length; i++){
            var arg = arguments[i];
            if (arg) {
                classes = appendClass(classes, parseValue(arg));
            }
        }
        return classes;
    }
    function parseValue(arg) {
        if (typeof arg === 'string' || typeof arg === 'number') {
            return arg;
        }
        if (typeof arg !== 'object') {
            return '';
        }
        if (Array.isArray(arg)) {
            return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
            return arg.toString();
        }
        var classes = '';
        for(var key in arg){
            if (hasOwn.call(arg, key) && arg[key]) {
                classes = appendClass(classes, key);
            }
        }
        return classes;
    }
    function appendClass(value, newClass) {
        if (!newClass) {
            return value;
        }
        if (value) {
            return value + ' ' + newClass;
        }
        return value + newClass;
    }
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        // register as 'classnames', consistent with npm package name
        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
            return classNames;
        }());
    } else {
        window.classNames = classNames;
    }
})();
}),
]);

//# sourceMappingURL=_333ec1f3._.js.map