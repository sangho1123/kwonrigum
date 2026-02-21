// app/apply/loan/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export const dynamic = "force-dynamic";

export default function LoanApplyPage() {
  const searchParams = useSearchParams();
  const listingIdParam = searchParams.get("listingId");
  const initialListingId = listingIdParam ? Number(listingIdParam) : undefined;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [listingId, setListingId] = useState<number | undefined>(
    initialListingId
  );
  const [loanAmount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("보증금/권리금 대출");
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
        loanAmount: loanAmount ? Number(loanAmount) : undefined,
        purpose,
        note,
        source: "loan-page",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "loan",
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

      setResult("상담 요청이 접수되었습니다. 파트너가 확인 후 연락드립니다.");
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
        <h1 className="text-xl font-semibold">대출 상담 신청</h1>
        <p className="mt-1 text-sm text-neutral-600">
          보증금·권리금·인테리어 비용 등 상가 운영에 필요한 자금 대출 상담을 요청합니다.
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

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                희망 대출금액 (만원 단위, 선택)
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="예: 5000"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                자금 용도
              </label>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="보증금/권리금 대출">보증금/권리금 대출</option>
                <option value="인테리어/시설 투자">인테리어/시설 투자</option>
                <option value="운영자금">운영자금</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700">
                추가 내용 (선택)
              </label>
              <textarea
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm min-h-[80px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="예: 월세 300/보증금 3000, 3개월 내에 입점 예정입니다."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "전송 중..." : "대출 상담 요청하기"}
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
          입력한 정보는 상담 파트너에게 전달되며, 권리금·임대료 조건에 맞는 대출 가능 여부를 검토하는 데만 사용됩니다.
        </p>
      </section>
    </main>
  );
}
