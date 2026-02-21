// components/LeadCtas.tsx
"use client";

import { FormEvent, useState } from "react";

type LeadType = "loan" | "fitout" | "closure";

type Props = {
  listingId: number;
};

export default function LeadCtas({ listingId }: Props) {
  const [activeType, setActiveType] = useState<LeadType | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openForm = (type: LeadType) => {
    setActiveType(type);
    setResult(null);
    setError(null);
  };

  const closeForm = () => {
    setActiveType(null);
    setLoading(false);
    setError(null);
    // 메시지/입력값은 그대로 둬도 되고, 필요하면 여기서 리셋해도 됨
    // setName("");
    // setPhone("");
    // setMessage("");
  };

  const labelByType: Record<LeadType, string> = {
    loan: "대출 상담",
    fitout: "인테리어 상담",
    closure: "임차/권리금 상담",
  };

  const highlightClassByType: Record<LeadType, string> = {
    loan: "border-sky-200 bg-sky-50 text-sky-800",
    fitout: "border-indigo-200 bg-indigo-50 text-indigo-800",
    closure: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeType) return;

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
        source: "listing-detail-inline-cta",
        displayTypeLabel: labelByType[activeType],
        quickMessage: message || undefined,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeType,
          listingId,
          name: name.trim(),
          phone: phone.trim(),
          message: message || undefined,
          payload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "전송에 실패했습니다.");
      }

      setResult("상담 요청이 접수되었습니다. 파트너가 확인 후 연락드립니다.");
      setError(null);
      // 필요하면 자동으로 폼 닫기
      // closeForm();
    } catch (e: any) {
      setError(e?.message || "전송 중 오류가 발생했습니다.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* CTA 버튼 3종 */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => openForm("loan")}
          className={`rounded-xl border px-3 py-2 text-xs font-medium text-center hover:bg-sky-50 ${
            activeType === "loan" ? highlightClassByType["loan"] : "bg-white"
          }`}
        >
          대출 상담
          <div className="mt-0.5 text-[10px] text-neutral-500">
            보증금/권리금/인테리어 대출
          </div>
        </button>

        <button
          type="button"
          onClick={() => openForm("fitout")}
          className={`rounded-xl border px-3 py-2 text-xs font-medium text-center hover:bg-indigo-50 ${
            activeType === "fitout" ? highlightClassByType["fitout"] : "bg-white"
          }`}
        >
          인테리어 상담
          <div className="mt-0.5 text-[10px] text-neutral-500">
            공사 견적·시공 일정
          </div>
        </button>

        <button
          type="button"
          onClick={() => openForm("closure")}
          className={`rounded-xl border px-3 py-2 text-xs font-medium text-center hover:bg-emerald-50 ${
            activeType === "closure" ? highlightClassByType["closure"] : "bg-white"
          }`}
        >
          임차 상담
          <div className="mt-0.5 text-[10px] text-neutral-500">
            권리금·임대 조건 협의
          </div>
        </button>
      </div>

      {/* 선택된 타입에 대한 간단 폼 */}
      {activeType && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-neutral-50 px-3 py-3 space-y-2"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-medium">
              {labelByType[activeType]} 빠른 상담 요청
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="text-[11px] text-neutral-500 hover:text-neutral-700"
            >
              닫기
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                className="w-full rounded-lg border px-2.5 py-1.5 text-xs"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full rounded-lg border px-2.5 py-1.5 text-xs"
                placeholder="연락처 (010-...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <textarea
            className="w-full rounded-lg border px-2.5 py-1.5 text-xs min-h-[48px]"
            placeholder="간단한 상황을 적어주시면 더 정확한 상담이 가능합니다. (선택)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600 disabled:opacity-60"
          >
            {loading ? "전송 중..." : `${labelByType[activeType]} 요청하기`}
          </button>

          {error && (
            <p className="text-[11px] text-red-600 mt-1">
              {error}
            </p>
          )}
          {result && (
            <p className="text-[11px] text-emerald-600 mt-1">
              {result}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
