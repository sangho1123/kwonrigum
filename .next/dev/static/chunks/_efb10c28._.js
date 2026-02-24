(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toast",
    ()=>toast
]);
function toast(message) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent("app:toast", {
        detail: {
            message
        }
    }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/chat/[id]/ClientChat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/chat/[id]/ClientChat.tsx
__turbopack_context__.s([
    "default",
    ()=>ClientChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs [app-client] (ecmascript) <export j as mutate>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const fetcher = (url)=>fetch(url, {
        cache: "no-store"
    }).then((r)=>r.json());
// 아주 짧은 “핑” 소리(웹오디오)
function ping() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.26);
    } catch  {
    /* ignore */ }
}
function ClientChat({ threadId, role }) {
    _s();
    const key = threadId ? `/api/chat/threads/${threadId}/messages` : null;
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, fetcher, {
        refreshInterval: 2500
    });
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientChat.useMemo[items]": ()=>data?.items ?? []
    }["ClientChat.useMemo[items]"], [
        data
    ]);
    // 방 입장 시 읽음 처리 + 배지 즉시 갱신
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientChat.useEffect": ()=>{
            if (!threadId) return;
            ({
                "ClientChat.useEffect": async ()=>{
                    const res = await fetch(`/api/chat/threads/${threadId}/read?role=${role}`, {
                        method: "POST"
                    });
                    if (res.ok) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])("/api/chat/unread");
                    // mutate("/api/chat/threads"); // 필요 시 관리자 목록 즉시 갱신
                    }
                }
            })["ClientChat.useEffect"]();
        }
    }["ClientChat.useEffect"], [
        threadId,
        role
    ]);
    // 새 메시지 → 하단 스크롤 + 소리/토스트(상대 메시지) + 포커스 외인 경우에만
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientChat.useEffect": ()=>{
            const len = items.length;
            if (!len) return;
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
            if (prevLen.current && len > prevLen.current) {
                const newOnes = items.slice(prevLen.current);
                const incoming = newOnes.find({
                    "ClientChat.useEffect.incoming": (m)=>m.from !== role
                }["ClientChat.useEffect.incoming"]);
                const hidden = typeof document !== "undefined" && (document.visibilityState === "hidden" || !document.hasFocus());
                if (incoming && hidden) {
                    ping();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("새 메시지가 도착했습니다");
                    if ("Notification" in window && Notification.permission === "granted") {
                        new Notification("새 메시지", {
                            body: incoming.text
                        });
                    }
                }
            }
            prevLen.current = len;
        }
    }["ClientChat.useEffect"], [
        items,
        role
    ]);
    // 알림 권한(최초 1회)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientChat.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && "Notification" in window) {
                if (Notification.permission === "default") {
                    Notification.requestPermission().catch({
                        "ClientChat.useEffect": ()=>{}
                    }["ClientChat.useEffect"]);
                }
            }
        }
    }["ClientChat.useEffect"], []);
    const send = async ()=>{
        const body = text.trim();
        if (!threadId || !body) return;
        // 낙관적 업데이트
        const opt = {
            id: `opt-${Date.now()}`,
            from: role,
            text: body,
            at: new Date().toISOString()
        };
        prevLen.current += 1;
        setText("");
        // 화면 즉시 반영
        (async ()=>{
            // 로컬로 먼저 반영
            // SWR 캐시를 직접 갱신하는 방법도 있지만 여기선 간단히 mutate(key)로 동기화
            const r = await fetch(`/api/chat/threads/${threadId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: role,
                    text: body
                })
            });
            const j = await r.json().catch(()=>({}));
            if (j?.ok) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])(key); // 목록 새로고침
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__j__as__mutate$3e$__["mutate"])("/api/chat/unread"); // 배지 갱신
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(`전송 실패: ${j?.error ?? r.statusText ?? "error"}`);
            }
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-3xl mx-auto h-[calc(100dvh-2rem)] p-4 flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "rounded-2xl border px-4 py-3 bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold",
                        children: role === "admin" ? "고객과의 대화" : "매도자/중개사와의 대화"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-500",
                        children: [
                            "현재 역할: ",
                            role === "admin" ? "관리자" : "사용자"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex-1 rounded-2xl border bg-white p-3 overflow-y-auto",
                children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-neutral-500",
                    children: "대화를 시작해 보세요."
                }, void 0, false, {
                    fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2",
                    children: [
                        items.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: [
                                    "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                                    m.from === role ? "ml-auto bg-sky-500 text-white" : "mr-auto bg-neutral-100"
                                ].join(" "),
                                title: new Date(m.at).toLocaleString(),
                                children: m.text
                            }, m.id, false, {
                                fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: bottomRef
                        }, void 0, false, {
                            fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        onKeyDown: (e)=>e.key === "Enter" && send(),
                        placeholder: "메시지를 입력하세요…",
                        className: "flex-1 rounded-xl border px-3 py-2"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: send,
                        className: "rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2",
                        children: "전송"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/[id]/ClientChat.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chat/[id]/ClientChat.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(ClientChat, "Kaa72VvOu3FLHmQwyaXsG7E5lwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
_c = ClientChat;
var _c;
__turbopack_context__.k.register(_c, "ClientChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs [app-client] (ecmascript) <export j as mutate>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mutate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["j"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$config$2d$context$2d$client$2d$BoS53ST9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_efb10c28._.js.map