"use client";

import { useCompare } from "@/context/CompareContext";
import type { Listing } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RevenueBadge from "./RevenueBadge";

// ✅ 1. 만능 이미지 추출 함수 (문자열/배열/JSON 모두 처리)
function getThumb(photos: any): string | null {
  if (!photos) return null;
  try {
    // 이미 배열이면 바로 첫 번째꺼
    if (Array.isArray(photos)) {
      return photos.length > 0 ? (photos[0] as string) : null;
    }
    // 문자열이면 파싱해서 첫 번째꺼
    if (typeof photos === "string") {
      // "[]" 빈 배열 문자열 처리
      if (photos === "[]") return null;
      const parsed = JSON.parse(photos);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
    }
  } catch (e) {
    console.error("Image Parse Error:", e);
    return null;
  }
  return null;
}

// 숫자 포맷
const fmt = (n?: number | null) =>
  n == null ? "-" : new Intl.NumberFormat("ko-KR").format(n);

export default function ListingCard({
  item,
  highlight = false,
  onHover,
}: {
  item: Listing | (Listing & { photos?: unknown });
  highlight?: boolean;
  onHover?: (id: number | null) => void;
}) {
  const router = useRouter();
  const { selectedIds, toggleId } = useCompare();
  const [loading, setLoading] = useState<null | "listing" | "loan" | "fitout">(null);

  const thumb = getThumb((item as any).photos);

  async function startChat(type: "listing" | "loan" | "fitout") {
    try {
      setLoading(type);
      const res = await fetch("/api/chat/threads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, listingId: item.id, title: item.title }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      router.push(`/chat/${data.thread.id}?role=user`);
    } catch (e: any) {
      alert("채팅방 열기 실패: " + e.message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div
      onClick={() => router.push(`/listing/${item.id}`)}
      onMouseEnter={() => onHover?.(item.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex flex-col bg-white rounded-xl overflow-hidden border shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${
        highlight ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      }`}
    >
      {/* 🖼️ 상단: 이미지 영역 (비율 고정) */}
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        {thumb ? (
          <Image
            src={thumb}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <span>📷</span>
            <span>No Image</span>
          </div>
        )}

        {/* 비교하기 체크박스 (우측 상단) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleId(item.id);
          }}
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full border shadow-md flex items-center justify-center transition-colors ${
            selectedIds.includes(item.id)
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-white/90 border-gray-300 text-gray-400 hover:text-blue-500"
          }`}
          title="비교함 담기"
        >
          {selectedIds.includes(item.id) ? "✔" : "+"}
        </button>

        {/* 업종 태그 (좌측 상단) */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
          {(item as any).sector || "업종미상"}
        </div>
      </div>

      {/* 📝 중단: 정보 영역 */}
      <div className="p-4 flex-1 flex flex-col">
        {/* 매출 인증 배지 */}
        {(item as any).isRevenueVerified && (
          <div className="mb-2">
            <RevenueBadge />
          </div>
        )}

        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-1">
          {(item as any).address_area || "주소 미입력"} | {(item as any).area_pyeong ?? 0}평
        </p>

        <div className="mt-auto grid grid-cols-2 gap-y-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-500">보증금</span>
          <span className="font-semibold text-right">{fmt((item as any).deposit)}</span>
          <span className="text-gray-500">월세</span>
          <span className="font-semibold text-right">{fmt((item as any).rent_monthly)}</span>
          <span className="text-blue-600 font-bold">권리금</span>
          <span className="text-blue-600 font-bold text-right">{fmt((item as any).goodwill_price)}</span>
        </div>
      </div>

      {/* 🔘 하단: 버튼 영역 (깔끔하게 정렬) */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => startChat("listing")}
          disabled={loading === "listing"}
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-bold transition-colors"
        >
          {loading === "listing" ? "연결 중..." : "💬 매물 문의하기"}
        </button>
        <button
          onClick={() => startChat("loan")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium"
        >
          💰 대출 문의
        </button>
        <button
          onClick={() => startChat("fitout")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium"
        >
          🔨 인테리어
        </button>
      </div>
    </div>
  );
}