// app/quote/fitout/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export const dynamic = "force-dynamic";

export default function FitoutQuotePage() {
  const searchParams = useSearchParams();
  const listingIdParam = searchParams.get("listingId");
  const initialListingId = listingIdParam ? Number(listingIdParam) : undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [listingId, setListingId] = useState<number | undefined>(
    initialListingId
  );
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("심플/실용 위주");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("이름과 연락처는 필수입니다.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        areaPyeong: area ? Number(area) : undefined,
        budget: budget ? Number(budget) : undefined,
        style,
        note,
        source: "fitout-page",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "fitout",
          listingId: listingId && Number.isFinite(listingId) ? listingId : undefined,
          name: name.trim(),
          phone: phone.trim(),
          message: note,
          payload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "전송에 실패했습니다.");
      }

      setResult("인테리어 상담 요청이 접수되었습니다. 파트너가 확인 후 연락드립니다.");
      setError(null);
    } catch (e: any) {
      setError(e?.message || "전송 중 오류가 발생했습니다.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-xl font-semibold">인테리어 상담 신청</h1>
        <p className="mt-1 text-sm text-neutral-600">
          상가/사무실 인테리어 견적과 시공 상담을 요청합니다.
        </p>
      </header>

      <section className="rounded-2xl border bg-white p-4 space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">
                이름<span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                연락처<span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                관련 매물 ID (선택)
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={listingId ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setListingId(v ? Number(v) : undefined);
                }}
                placeholder="상세 페이지에서 확인 가능한 매물 번호"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700">
                  예상 면적 (평, 선택)
                </label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="예: 20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700">
                  예산 (만원, 선택)
                </label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="예: 3000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                선호 스타일
              </label>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="심플/실용 위주">심플/실용 위주</option>
                <option value="카페/브랜딩 강조">카페/브랜딩 강조</option>
                <option value="럭셔리/고급 인테리어">럭셔리/고급 인테리어</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                추가 요청 사항 (선택)
              </label>
              <textarea
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm min-h-[80px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="예: 3주 이내 완공 희망, 기존 집기 일부 재사용 등"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-60"
          >
            {loading ? "전송 중..." : "인테리어 상담 요청하기"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}
        {result && (
          <p className="text-xs text-emerald-600">
            {result}
          </p>
        )}

        <p className="text-[11px] text-neutral-400">
          입력한 정보는 인테리어 파트너에게 전달되며, 견적 및 일정 상담에만 사용됩니다.
        </p>
      </section>
    </main>
  );
}
