// app/chat/[id]/ClientChat.tsx
"use client";

import { toast } from "@/lib/toast";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";

type Message = { id: string; from: string; text: string; at: string };

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((r) => r.json());

// 아주 짧은 “핑” 소리(웹오디오)
function ping() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
  } catch {
    /* ignore */
  }
}

export default function ClientChat({
  threadId,
  role,
}: {
  threadId: string;
  role: "admin" | "user";
}) {
  const key = threadId ? `/api/chat/threads/${threadId}/messages` : null;
  const { data } = useSWR<{ ok: boolean; items: Message[] }>(key, fetcher, {
    refreshInterval: 2500,
  });

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const prevLen = useRef<number>(0);
  const items: Message[] = useMemo(() => data?.items ?? [], [data]);

  // 방 입장 시 읽음 처리 + 배지 즉시 갱신
  useEffect(() => {
    if (!threadId) return;
    (async () => {
      const res = await fetch(
        `/api/chat/threads/${threadId}/read?role=${role}`,
        { method: "POST" }
      );
      if (res.ok) {
        mutate("/api/chat/unread");
        // mutate("/api/chat/threads"); // 필요 시 관리자 목록 즉시 갱신
      }
    })();
  }, [threadId, role]);

  // 새 메시지 → 하단 스크롤 + 소리/토스트(상대 메시지) + 포커스 외인 경우에만
  useEffect(() => {
    const len = items.length;
    if (!len) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    if (prevLen.current && len > prevLen.current) {
      const newOnes = items.slice(prevLen.current);
      const incoming = newOnes.find((m) => m.from !== role);
      const hidden =
        typeof document !== "undefined" &&
        (document.visibilityState === "hidden" || !document.hasFocus());

      if (incoming && hidden) {
        ping();
        toast("새 메시지가 도착했습니다");
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("새 메시지", { body: incoming.text });
        }
      }
    }
    prevLen.current = len;
  }, [items, role]);

  // 알림 권한(최초 1회)
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  const send = async () => {
    const body = text.trim();
    if (!threadId || !body) return;

    // 낙관적 업데이트
    const opt: Message = {
      id: `opt-${Date.now()}`,
      from: role,
      text: body,
      at: new Date().toISOString(),
    };
    prevLen.current += 1;
    setText("");
    // 화면 즉시 반영
    (async () => {
      // 로컬로 먼저 반영
      // SWR 캐시를 직접 갱신하는 방법도 있지만 여기선 간단히 mutate(key)로 동기화
      const r = await fetch(`/api/chat/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: role, text: body }),
      });
      const j = await r.json().catch(() => ({} as any));
      if (j?.ok) {
        mutate(key);                 // 목록 새로고침
        mutate("/api/chat/unread");  // 배지 갱신
      } else {
        toast(`전송 실패: ${j?.error ?? r.statusText ?? "error"}`);
      }
    })();
  };

  return (
    <main className="max-w-3xl mx-auto h-[calc(100dvh-2rem)] p-4 flex flex-col gap-3">
      <header className="rounded-2xl border px-4 py-3 bg-white">
        <div className="font-semibold">
          {role === "admin" ? "고객과의 대화" : "매도자/중개사와의 대화"}
        </div>
        <div className="text-xs text-neutral-500">
          현재 역할: {role === "admin" ? "관리자" : "사용자"}
        </div>
      </header>

      <section className="flex-1 rounded-2xl border bg-white p-3 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-sm text-neutral-500">대화를 시작해 보세요.</div>
        ) : (
          <ul className="space-y-2">
            {items.map((m) => (
              <li
                key={m.id}
                className={[
                  "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                  m.from === role
                    ? "ml-auto bg-sky-500 text-white"
                    : "mr-auto bg-neutral-100",
                ].join(" ")}
                title={new Date(m.at).toLocaleString()}
              >
                {m.text}
              </li>
            ))}
            <div ref={bottomRef} />
          </ul>
        )}
      </section>

      <footer className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="메시지를 입력하세요…"
          className="flex-1 rounded-xl border px-3 py-2"
        />
        <button
          onClick={send}
          className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2"
        >
          전송
        </button>
      </footer>
    </main>
  );
}
