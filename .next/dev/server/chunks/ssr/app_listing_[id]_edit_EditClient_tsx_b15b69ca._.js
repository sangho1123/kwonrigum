module.exports = [
"[project]/app/listing/[id]/edit/EditClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/listing/[id]/edit/EditClient.tsx
__turbopack_context__.s([
    "default",
    ()=>EditClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function EditClient({ initial }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const set = (k, v)=>setForm((s)=>({
                ...s,
                [k]: v
            }));
    const save = async ()=>{
        if (!form.title.trim()) {
            setErr("제목은 필수입니다.");
            return;
        }
        setBusy(true);
        setErr(null);
        try {
            const res = await fetch(`/api/listings/${initial.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: form.title,
                    category: form.category,
                    address_area: form.address_area,
                    deposit: form.deposit,
                    rent_monthly: form.rent_monthly,
                    goodwill_price: form.goodwill_price,
                    monthly_sales: form.monthly_sales,
                    parking_spaces: form.parking_spaces
                })
            });
            const j = await res.json();
            if (!res.ok || !j?.ok) {
                throw new Error(j?.error || "저장 실패");
            }
            // 저장 후 상세 페이지로 이동
            router.replace(`/listing/${initial.id}`);
            router.refresh();
        } catch (e) {
            setErr(e?.message ?? "네트워크 오류");
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-3xl mx-auto p-4 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-lg font-semibold",
                children: "매물 수정"
            }, void 0, false, {
                fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2 col-span-2",
                        placeholder: "제목",
                        value: form.title,
                        onChange: (e)=>set("title", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "카테고리",
                        value: form.category,
                        onChange: (e)=>set("category", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "주소/지역",
                        value: form.address_area,
                        onChange: (e)=>set("address_area", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "보증금",
                        value: form.deposit,
                        onChange: (e)=>set("deposit", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "월세",
                        value: form.rent_monthly,
                        onChange: (e)=>set("rent_monthly", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "권리금",
                        value: form.goodwill_price,
                        onChange: (e)=>set("goodwill_price", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "월매출",
                        value: form.monthly_sales,
                        onChange: (e)=>set("monthly_sales", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "rounded-lg border px-3 py-2",
                        placeholder: "주차대수",
                        value: form.parking_spaces,
                        onChange: (e)=>set("parking_spaces", e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-red-600",
                children: err
            }, void 0, false, {
                fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                lineNumber: 121,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: save,
                        disabled: busy,
                        className: "rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm",
                        children: busy ? "저장 중…" : "저장"
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "rounded-lg border px-4 py-2 text-sm",
                        children: "취소"
                    }, void 0, false, {
                        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/listing/[id]/edit/EditClient.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_listing_%5Bid%5D_edit_EditClient_tsx_b15b69ca._.js.map