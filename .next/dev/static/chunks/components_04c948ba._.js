(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ListingMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ListingMap.tsx
__turbopack_context__.s([
    "default",
    ()=>ListingMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// ✅ Web JS v3: openapi + ncpClientId (동작 확인된 방식)
const NAVER_CLIENT_ID = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "hdlzlfn5o0";
function ListingMap({ items, selectedId, onSelect }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authFailed, setAuthFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 인증 실패 콜백
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListingMap.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.navermap_authFailure = ({
                "ListingMap.useEffect": function() {
                    console.error("[NAVER MAP] Authentication Failed");
                    setAuthFailed(true);
                }
            })["ListingMap.useEffect"];
        }
    }["ListingMap.useEffect"], []);
    // SDK 로드
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListingMap.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (window.naver?.maps) {
                setLoaded(true);
                return;
            }
            const id = "naver-map-sdk";
            let s = document.getElementById(id);
            const src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}&_=${Date.now()}`;
            if (!s) {
                s = document.createElement("script");
                s.id = id;
                s.async = true;
                s.defer = true;
                document.head.appendChild(s);
            }
            s.src = src;
            s.onload = ({
                "ListingMap.useEffect": ()=>{
                    console.log("[NAVER MAP] SDK loaded", {
                        ncpClientId: NAVER_CLIENT_ID
                    });
                    setLoaded(true);
                }
            })["ListingMap.useEffect"];
            s.onerror = ({
                "ListingMap.useEffect": ()=>console.error("[NAVER MAP] SDK load error")
            })["ListingMap.useEffect"];
        }
    }["ListingMap.useEffect"], []);
    // 지도/마커
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListingMap.useEffect": ()=>{
            if (!loaded || !mapRef.current || !window.naver?.maps || authFailed) return;
            const { naver } = window;
            const first = items[0];
            const center = first ? new naver.maps.LatLng(first.lat, first.lng) : new naver.maps.LatLng(37.5665, 126.9780);
            const map = new naver.maps.Map(mapRef.current, {
                center,
                zoom: 13,
                zoomControl: true,
                zoomControlOptions: {
                    position: naver.maps.Position.TOP_RIGHT
                }
            });
            mapObj.current = map;
            // 기존 마커 제거
            Object.values(markersRef.current).forEach({
                "ListingMap.useEffect": (m)=>m.setMap(null)
            }["ListingMap.useEffect"]);
            markersRef.current = {};
            // 마커 생성
            const bounds = new naver.maps.LatLngBounds();
            items.forEach({
                "ListingMap.useEffect": (it)=>{
                    const pos = new naver.maps.LatLng(it.lat, it.lng);
                    bounds.extend(pos);
                    const marker = new naver.maps.Marker({
                        map,
                        position: pos
                    });
                    markersRef.current[it.id] = marker;
                    naver.maps.Event.addListener(marker, "click", {
                        "ListingMap.useEffect": ()=>{
                            onSelect?.(it.id);
                            map.panTo(pos);
                        }
                    }["ListingMap.useEffect"]);
                }
            }["ListingMap.useEffect"]);
            if (items.length > 1) {
                map.fitBounds(bounds, {
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20
                });
            }
        }
    }["ListingMap.useEffect"], [
        loaded,
        authFailed,
        items,
        onSelect
    ]);
    // 선택된 마커로 포커스
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListingMap.useEffect": ()=>{
            if (!selectedId || !mapObj.current || !window.naver?.maps) return;
            const marker = markersRef.current[selectedId];
            if (!marker) return;
            const pos = marker.getPosition();
            mapObj.current.panTo(pos);
            try {
                marker.setAnimation(window.naver.maps.Animation.BOUNCE);
                setTimeout({
                    "ListingMap.useEffect": ()=>marker.setAnimation(null)
                }["ListingMap.useEffect"], 700);
            } catch  {}
        }
    }["ListingMap.useEffect"], [
        selectedId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-64 rounded-2xl border border-neutral-200 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapRef,
                className: "w-full h-full"
            }, void 0, false, {
                fileName: "[project]/components/ListingMap.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center text-sm",
                children: "지도를 불러오는 중…"
            }, void 0, false, {
                fileName: "[project]/components/ListingMap.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            authFailed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-white/85 backdrop-blur flex items-center justify-center p-4 text-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-600 font-semibold mb-1",
                            children: "네이버 지도 인증 실패"
                        }, void 0, false, {
                            fileName: "[project]/components/ListingMap.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-neutral-700",
                            children: "Web 서비스 URL / ncpClientId 설정을 확인하세요."
                        }, void 0, false, {
                            fileName: "[project]/components/ListingMap.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ListingMap.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ListingMap.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ListingMap.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(ListingMap, "ZIRhVEMGb06lJfzFEH+70qr4pW8=");
_c = ListingMap;
var _c;
__turbopack_context__.k.register(_c, "ListingMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ConsultButtons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConsultButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ConsultButtons({ listingId }) {
    async function submit(type) {
        const res = await fetch("/api/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type,
                listingId,
                payload: {
                    source: "listing_detail"
                }
            })
        });
        if (!res.ok) {
            const t = await res.text();
            alert(`리드 생성 실패: ${t}`);
            return;
        }
        alert("상담 요청 접수 완료");
    }
    const base = "w-full h-10 rounded-xl font-semibold border shadow-sm active:scale-[0.99] transition";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-3 gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>submit("LOAN"),
                className: `${base} bg-sky-50 border-sky-200 text-sky-700`,
                children: "대출상담"
            }, void 0, false, {
                fileName: "[project]/components/ConsultButtons.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>submit("INTERIOR"),
                className: `${base} bg-sky-100 border-sky-300 text-sky-800`,
                children: "인테리어상담"
            }, void 0, false, {
                fileName: "[project]/components/ConsultButtons.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>submit("LEASE"),
                className: `${base} bg-sky-200 border-sky-400 text-sky-900`,
                children: "임차상담"
            }, void 0, false, {
                fileName: "[project]/components/ConsultButtons.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ConsultButtons.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = ConsultButtons;
var _c;
__turbopack_context__.k.register(_c, "ConsultButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/UploadEvidence.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadEvidence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function UploadEvidence({ listingId, onUploaded }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        // /api/uploads는 파일을 받아 업로드 후 { fileUrl }을 반환한다고 가정
        const fd = new FormData();
        fd.append("file", file);
        fd.append("listingId", String(listingId));
        const res = await fetch("/api/uploads", {
            method: "POST",
            body: fd
        });
        const json = await res.json();
        setLoading(false);
        if (!res.ok || !json?.fileUrl) {
            alert("업로드 실패");
            return;
        }
        setUrl(json.fileUrl);
        onUploaded?.(json.fileUrl);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-medium",
                children: "증빙 업로드"
            }, void 0, false, {
                fileName: "[project]/components/UploadEvidence.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                accept: "image/*,application/pdf",
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/UploadEvidence.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-neutral-500",
                children: "업로드 중…"
            }, void 0, false, {
                fileName: "[project]/components/UploadEvidence.tsx",
                lineNumber: 41,
                columnNumber: 19
            }, this),
            url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "text-xs text-blue-600 underline",
                href: url,
                target: "_blank",
                children: "업로드 완료: 보기"
            }, void 0, false, {
                fileName: "[project]/components/UploadEvidence.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UploadEvidence.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(UploadEvidence, "1Gx5xvnv3t+2R8fSsXfBIMCMjHY=");
_c = UploadEvidence;
var _c;
__turbopack_context__.k.register(_c, "UploadEvidence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_04c948ba._.js.map