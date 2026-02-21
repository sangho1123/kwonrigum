"use client";

import { LeadPayload, Listing } from "@/lib/types";
import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface Props {
  open: boolean;
  listing: Listing | null;
  leadType: "loan" | "goodwill_eval" | "transfer_service" | null;
  onClose: () => void;
}

export default function LeadModal({ open, listing, leadType, onClose }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [memo, setMemo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [doneMsg, setDoneMsg] = useState<string | null>(null);

  if (!open || !leadType) return null;

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const payload: LeadPayload = {
        listing_id: listing?.id,
        lead_type: leadType,
        name,
        phone_or_contact: contact,
        memo
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("리드 생성 실패");

      const data = await res.json();
      setDoneMsg(data.message || "신청 완료되었습니다. 파트너 전문 상담사가 곧 연락드립니다.");
    } catch {
      setDoneMsg("죄송합니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-card p-4 flex flex-col gap-4">
        <div className="text-sm font-semibold text-neutral-900 flex justify-between items-start">
          <div>
            {leadType === "loan" && "대출 상담 요청"}
            {leadType === "goodwill_eval" && "권리금 평가 요청"}
            {leadType === "transfer_service" && "양도/인허가 대행 문의"}
          </div>
          <button
            className="text-neutral-400 text-xs hover:text-neutral-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {listing && (
          <div className="rounded-xl bg-neutral-100 p-3 text-[11px] leading-relaxed text-neutral-700">
            <div className="font-semibold text-neutral-900 mb-1">
              {listing.title} ({listing.address_area})
            </div>
            <div>권리금 {listing.goodwill_price ?? 0} / 월세 {listing.rent_monthly ?? 0}</div>
          </div>
        )}

        <div className="flex flex-col gap-3 text-[13px]">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-neutral-800">
              이름 <span className="text-red-500">*</span>
            </span>
            <Input
              placeholder="홍길동"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-neutral-800">
              연락처(전화 또는 카톡ID) <span className="text-red-500">*</span>
            </span>
            <Input
              placeholder="010-0000-0000 / kakao:honggildong"
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-neutral-800">
              한줄 메모 (선택)
            </span>
            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
              placeholder="권리금이 적정한지 알고싶습니다"
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
          </label>
        </div>

        {doneMsg && (
          <div className="text-[12px] text-emerald-600 bg-emerald-50 rounded-xl p-2 leading-relaxed">
            {doneMsg}
          </div>
        )}

        <Button disabled={submitting} onClick={handleSubmit}>
          제출
        </Button>

        <div className="text-[10px] text-neutral-500 leading-relaxed">
          제출하시면 제휴 파트너 또는 내부 담당자가 연락을 드릴 수 있습니다. 개인정보는 이 목적에 한해 사용됩니다.
        </div>
      </div>
    </div>
  );
}
