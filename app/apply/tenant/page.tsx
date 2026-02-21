// app/apply/tenant/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TenantApplyPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const listingId = Number(sp.get("listingId") || "");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    try {
      setBusy(true); setOk(null); setErr(null);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "closure", // 임차상담 ↔ 백엔드 "closure" 매핑
          listingId: Number.isFinite(listingId) ? listingId : undefined,
          name, phone, message,
          payload: {},
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "상담 요청 실패");
      setOk("임차상담 요청이 접수되었습니다.");
    } catch (e: any) {
      setErr(e?.message || "오류");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-lg font-semibold">임차상담</h1>
      {Number.isFinite(listingId) && (
        <div className="text-xs text-neutral-600">매물 ID: {listingId}</div>
      )}

      <div className="space-y-3">
        <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="이름" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="연락처(숫자만)" value={phone} onChange={e=>setPhone(e.target.value)} />
        <textarea className="w-full rounded-md border px-3 py-2 text-sm" placeholder="메모 (선택)" rows={4} value={message} onChange={e=>setMessage(e.target.value)} />
        <button onClick={submit} disabled={busy || !name || !phone} className="w-full rounded-xl px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 disabled:opacity-60">
          {busy ? "전송 중…" : "상담 요청"}
        </button>
        {ok && <div className="text-sm text-emerald-600">{ok}</div>}
        {err && <div className="text-sm text-red-600">{err}</div>}
        <div className="flex justify-between text-xs text-neutral-500">
          <button onClick={() => router.back()}>뒤로</button>
          <a href="/admin/leads">관리자 리드 목록 보기</a>
        </div>
      </div>
    </main>
  );
}
