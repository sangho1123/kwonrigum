(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/leads/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLeadsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const typeLabel = {
    listing: "일반",
    loan: "대출",
    fitout: "인테리어",
    closure: "임차/권리금"
};
const typeBadgeClass = {
    listing: "inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-700",
    loan: "inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700",
    fitout: "inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700",
    closure: "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700"
};
function AdminLeadsPage() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const load = async (signal)=>{
        try {
            setError(null);
            const res = await fetch("/api/leads", {
                cache: "no-store",
                signal
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "불러오기 실패");
            const list = Array.isArray(data.items) ? data.items : [];
            setItems(list);
            // 선택된 리드가 있으면 최신 데이터와 동기화
            if (selected) {
                const updated = list.find((x)=>x.id === selected.id) || null;
                setSelected(updated);
            }
        } catch (e) {
            if (e?.name !== "AbortError") setError(e?.message || "불러오기 실패");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLeadsPage.useEffect": ()=>{
            const ctrl = new AbortController();
            load(ctrl.signal); // 최초 로드
            // 4초마다 자동 새로고침
            timerRef.current = window.setInterval({
                "AdminLeadsPage.useEffect": ()=>load()
            }["AdminLeadsPage.useEffect"], 4000);
            return ({
                "AdminLeadsPage.useEffect": ()=>{
                    ctrl.abort();
                    if (timerRef.current) window.clearInterval(timerRef.current);
                }
            })["AdminLeadsPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AdminLeadsPage.useEffect"], []);
    const filtered = activeFilter === "all" ? items : items.filter((x)=>x.type === activeFilter);
    const handleRowClick = (item)=>{
        setSelected((prev)=>prev?.id === item.id ? null : item);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-4xl mx-auto p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold",
                                children: "리드 목록"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-neutral-500",
                                children: "CTA·문의로 들어온 리드를 실시간으로 확인하는 페이지입니다."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>load(),
                                className: "rounded-lg border px-3 py-1.5 text-xs",
                                children: "새로고침"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-neutral-500",
                                children: "4초마다 자동 갱신"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    [
                        {
                            key: "all",
                            label: "전체"
                        },
                        {
                            key: "loan",
                            label: "대출"
                        },
                        {
                            key: "fitout",
                            label: "인테리어"
                        },
                        {
                            key: "closure",
                            label: "임차/권리금"
                        },
                        {
                            key: "listing",
                            label: "기타/일반"
                        }
                    ].map((tab)=>{
                        const active = activeFilter === tab.key;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveFilter(tab.key),
                            className: `rounded-full border px-3 py-1 text-xs ${active ? "border-sky-500 bg-sky-50 text-sky-700" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`,
                            children: tab.label
                        }, tab.key, false, {
                            fileName: "[project]/app/admin/leads/page.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto text-[11px] text-neutral-500",
                        children: [
                            "총 ",
                            items.length,
                            "건 / 표시 ",
                            filtered.length,
                            "건"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-neutral-600",
                children: "불러오는 중…"
            }, void 0, false, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-neutral-600",
                children: "조건에 맞는 리드가 없습니다."
            }, void 0, false, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded-lg overflow-hidden bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-neutral-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[150px]",
                                        children: "시간"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[90px]",
                                        children: "타입"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[90px]",
                                        children: "이름"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[140px]",
                                        children: "연락처"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[80px]",
                                        children: "매물ID"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left w-[110px]",
                                        children: "파트너"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 text-left",
                                        children: "메모"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/leads/page.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filtered.map((x)=>{
                                const isSelected = selected?.id === x.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `border-t cursor-pointer ${isSelected ? "bg-sky-50/50" : "hover:bg-neutral-50"}`,
                                    onClick: ()=>handleRowClick(x),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs text-neutral-700",
                                            children: new Date(x.createdAt).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: typeBadgeClass[x.type],
                                                children: typeLabel[x.type]
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/leads/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs",
                                            children: x.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs",
                                            children: x.phone
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 181,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs",
                                            children: x.listingId ?? "-"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs",
                                            children: x.partnerId ?? "-"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 align-top text-xs text-neutral-700",
                                            children: x.message ? x.message.length > 40 ? x.message.slice(0, 40) + "…" : x.message : x.payload?.quickMessage ? String(x.payload.quickMessage).slice(0, 40) + "…" : "-"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/leads/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, x.id, true, {
                                    fileName: "[project]/app/admin/leads/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/admin/leads/page.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/leads/page.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-lg border bg-white px-4 py-3 space-y-2 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: [
                                            "선택된 리드 상세 정보 (ID: ",
                                            selected.id,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: typeBadgeClass[selected.type],
                                        children: typeLabel[selected.type]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelected(null),
                                className: "text-[11px] text-neutral-500 hover:text-neutral-700",
                                children: "닫기"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-x-6 gap-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: "이름: "
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    selected.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: "연락처: "
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this),
                                    selected.phone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: "매물 ID: "
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this),
                                    selected.listingId ?? "-"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: "파트너 ID: "
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    selected.partnerId ?? "-"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: "생성 시각: "
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/leads/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    new Date(selected.createdAt).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-neutral-500",
                                children: "메시지"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-md border bg-neutral-50 px-2 py-2 min-h-[40px] whitespace-pre-wrap",
                                children: selected.message || selected.payload?.quickMessage || "—"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this),
                    selected.payload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-neutral-500",
                                children: "payload (요약)"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "rounded-md border bg-neutral-50 px-2 py-2 max-h-40 overflow-auto text-[11px]",
                                children: JSON.stringify(selected.payload, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/leads/page.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/leads/page.tsx",
                        lineNumber: 257,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/leads/page.tsx",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/leads/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(AdminLeadsPage, "3Fcsdb+AcAKs8V5xizktKg58K/g=");
_c = AdminLeadsPage;
var _c;
__turbopack_context__.k.register(_c, "AdminLeadsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_leads_page_tsx_50c65395._.js.map