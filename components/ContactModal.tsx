"use client";

import { useState } from "react";
import type { Listing } from "../lib/mockData";

type LeadType = "listing" | "loan" | "fitout" | "closure";

export default function ContactModal({
  open,
  listing,
  onClose,
}: {
  open: boolean;
  listing?: Listing | null;
  onClose: () => void;
}) {
  const [type, setType] = useState<LeadType>("listing");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          listingId: listing?.id,
          name,
          phone,
          message: msg,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "요청 실패");
      setDone(true);
    } catch (e: any) {
      setError(e.message || "요청 실패");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">상담 요청</h3>
          <button onClick={onClose} className="text-sm opacity-70">
            닫기 ✕
          </button>
        </div>

        <div className="text-sm text-neutral-600 mt-1">
          매물: <b>{listing?.title ?? "-"}</b>{" "}
          {listing && <span>({listing.address_area})</span>}
        </div>

        {done ? (
          <div className="mt-4 text-sm">
            요청이 접수되었습니다. 빠르게 연락드리겠습니다.
          </div>
        ) : (
          <div className="mt-4 grid gap-2">
            <select
              className="h-10 px-3 rounded-lg border"
              value={type}
              onChange={(e) => setType(e.target.value as LeadType)}
            >
              <option value="listing">매물 문의</option>
              <option value="loan">대출 상담</option>
              <option value="fitout">인테리어 견적</option>
              <option value="closure">폐업 정리</option>
            </select>
            <input
              className="h-10 px-3 rounded-lg border"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="h-10 px-3 rounded-lg border"
              placeholder="연락처 (숫자/-)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="min-h-[80px] px-3 py-2 rounded-lg border"
              placeholder="문의 내용"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            {error && (
              <div className="text-xs text-red-600 mt-1">{error}</div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          {!done ? (
            <>
              <button
                onClick={onClose}
                className="rounded-lg border px-3 py-1.5 text-sm"
              >
                취소
              </button>
              <button
                onClick={submit}
                disabled={pending}
                className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-sm disabled:opacity-60"
              >
                {pending ? "전송 중..." : "상담 요청"}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-sm"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
