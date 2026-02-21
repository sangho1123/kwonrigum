"use client";

import { Listing } from "@/lib/types";
import { formatCurrencyKRW, shortProofBadge } from "@/lib/utils";
import { useState } from "react";
import LeadModal from "./LeadModal";
import Button from "./ui/Button";

interface Props {
  listing: Listing;
}

export default function ListingDetailInfo({ listing }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadType, setLeadType] = useState<"loan"|"goodwill_eval"|"transfer_service"|null>(null);

  function openLead(t: "loan"|"goodwill_eval"|"transfer_service") {
    setLeadType(t);
    setModalOpen(true);
  }

  const revenue = listing.financials?.monthly_revenue_avg_3m;
  const proof = shortProofBadge(listing.proof_status);

  return (
    <>
      {/* 이미지 영역 */}
      <div className="w-full rounded-2xl overflow-hidden shadow-card bg-neutral-100 flex gap-2 p-2">
        {listing.media?.filter(m => m.is_public).map((m, idx) => (
          <div key={idx} className="flex-1 min-w-[120px] h-28 rounded-xl overflow-hidden bg-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.file_url}
              alt={`${listing.title} photo ${idx+1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {(!listing.media || listing.media.filter(m => m.is_public).length === 0) && (
          <div className="flex-1 h-28 flex items-center justify-center text-xs text-neutral-500">
            이미지 없음
          </div>
        )}
      </div>

      {/* 기본 정보 */}
      <section className="bg-white rounded-2xl shadow-card border border-transparent p-4 flex flex-col gap-2">
        <div className="text-lg font-semibold text-neutral-900 leading-tight">
          {listing.title}{" "}
          <span className="text-neutral-500 text-sm font-normal">
            ({listing.category})
          </span>
        </div>
        <div className="text-sm text-neutral-600">{listing.address_full}</div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-2">
          <div>면적 {listing.area_pyeong ?? "-"}평</div>
          <div>인수가능일 {listing.takeover_date ?? "-"}</div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div>월세 {formatCurrencyKRW(listing.rent_monthly)}</div>
          <div>관리비 {formatCurrencyKRW(listing.rent_mgmt_fee)}</div>
          <div>보증금 {formatCurrencyKRW(listing.deposit)}</div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div>권리금 {formatCurrencyKRW(listing.goodwill_price)}</div>
          {listing.goodwill_negotiable && (
            <div className="text-xs text-neutral-500">협의 가능</div>
          )}
        </div>

        <div className="text-sm">
          매출(3개월평균):{" "}
          {revenue ? formatCurrencyKRW(revenue) : "비공개"}
          {listing.financials?.revenue_verified && (
            <span className="ml-2 text-[11px] text-emerald-600 font-medium">
              (POS확인)
            </span>
          )}
        </div>

        <div className="text-[11px] text-emerald-600 font-medium">
          {proof}
        </div>
      </section>

      {/* 설명 */}
      <section className="bg-white rounded-2xl shadow-card border border-transparent p-4 text-sm text-neutral-700 leading-relaxed">
        <div className="text-neutral-900 font-semibold mb-2">
          양도 사유
        </div>
        <div>{listing.description || "사유 비공개"}</div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-2xl shadow-card border border-transparent p-4 flex flex-col gap-3">
        <div className="text-neutral-900 font-semibold text-sm">
          지금 바로 상담해보세요
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <Button className="w-full" onClick={() => openLead("loan")}>
            대출 상담 신청
          </Button>
          <Button
            className="w-full bg-white text-neutral-900 border border-neutral-300 shadow-sm hover:bg-neutral-100"
            onClick={() => openLead("goodwill_eval")}
          >
            권리금 평가 요청
          </Button>
          <Button
            className="w-full bg-white text-neutral-900 border border-neutral-300 shadow-sm hover:bg-neutral-100"
            onClick={() => openLead("transfer_service")}
          >
            양도/인허가 대행 문의
          </Button>
        </div>

        <div className="text-[10px] text-neutral-500 leading-relaxed">
          제출 시 제휴 파트너 또는 내부 담당자가 연락드립니다. 개인정보는 이 목적에 한해 사용됩니다.
        </div>
      </section>

      {/* 증빙 안내 */}
      <section className="bg-white rounded-2xl shadow-card border border-transparent p-4 text-xs leading-relaxed text-neutral-700">
        <div className="text-neutral-900 font-semibold text-sm mb-2">
          제출된 증빙자료
        </div>
        <ul className="list-disc pl-4 space-y-1">
          <li>임대차계약서(임대료 확인)</li>
          <li>POS 매출 캡처(최근 3개월)</li>
          <li>개인정보 가리고 업로드, 내부 검수 완료</li>
        </ul>
      </section>

      <LeadModal
        open={modalOpen}
        listing={listing}
        leadType={leadType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
