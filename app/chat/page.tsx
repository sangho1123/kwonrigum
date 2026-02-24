// app/chat/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatRedirectPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const type = sp.get("type") as "listing" | "loan" | "fitout" | null;
    const listingIdRaw = sp.get("listingId");
    const title = sp.get("title");

    if (!type) return; // 직접 접근 시에는 아무 것도 안 함

    (async () => {
      try {
        const res = await fetch("/api/chat/threads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            listingId: listingIdRaw ? Number(listingIdRaw) : null,
            title,
            seedHello: true,
          }),
        });

        const data = await res.json().catch(() => ({} as any));

        if (!res.ok || !data?.ok) {
          alert(
            `채팅방 열기 실패: ${data?.error ?? res.statusText ?? "unknown"}`
          );
          return;
        }
        const id = data?.thread?.id;
        if (!id) {
          alert(`채팅방 열기 실패: thread id missing\n\n${JSON.stringify(data)}`);
          return;
        }

        // 성공: /chat/[id] 로 이동 (기본은 사용자 역할)
        router.replace(`/chat/${id}?role=user`);
      } catch (err: any) {
        alert(`채팅방 열기 실패: ${err?.message ?? "network error"}`);
      }
    })();
  }, [router, sp]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="rounded-2xl border bg-white p-6">
        채팅방을 준비 중입니다…
      </div>
    </main>
  );
}
