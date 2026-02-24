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
"[project]/components/ProofUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ProofUpload.tsx
__turbopack_context__.s([
    "default",
    ()=>ProofUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ProofUpload({ listingId, defaultStatus = "unverified" }) {
    _s();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const onSubmit = async ()=>{
        if (!files || files.length === 0) {
            setMsg("파일을 선택해 주세요.");
            return;
        }
        setBusy(true);
        setMsg(null);
        try {
            // 데모: 실제 업로드 대신 /api/leads 로 이벤트 남김
            const meta = Array.from(files).map((f)=>({
                    name: f.name,
                    size: f.size,
                    type: f.type
                }));
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "listing",
                    listingId,
                    name: "증빙 업로드",
                    phone: "-",
                    payload: {
                        kind: "proof_upload",
                        files: meta,
                        status: defaultStatus
                    }
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "업로드 요청 실패");
            setMsg("업로드 요청이 접수되었습니다. (데모)");
            setFiles(null);
        } catch (e) {
            setMsg(e?.message || "업로드 요청 실패");
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-xs text-neutral-600",
                children: "증빙 업로드"
            }, void 0, false, {
                fileName: "[project]/components/ProofUpload.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                multiple: true,
                className: "text-xs",
                onChange: (e)=>setFiles(e.target.files)
            }, void 0, false, {
                fileName: "[project]/components/ProofUpload.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onSubmit,
                disabled: busy,
                className: "rounded-md border px-2 py-1 text-xs hover:bg-neutral-50 disabled:opacity-60",
                children: busy ? "처리 중…" : "업로드"
            }, void 0, false, {
                fileName: "[project]/components/ProofUpload.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-neutral-500",
                children: msg
            }, void 0, false, {
                fileName: "[project]/components/ProofUpload.tsx",
                lineNumber: 69,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProofUpload.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ProofUpload, "GeK2MBgZv6cOe6hocMVJMj5zw20=");
_c = ProofUpload;
var _c;
__turbopack_context__.k.register(_c, "ProofUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_5e7ee584._.js.map