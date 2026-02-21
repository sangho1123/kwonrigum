"use client";

import { Listing } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ 1. 똑같은 만능 이미지 함수 적용
function getThumb(photos: any): string | null {
  if (!photos) return null;
  try {
    if (Array.isArray(photos)) return photos.length > 0 ? (photos[0] as string) : null;
    if (typeof photos === "string") {
      if (photos === "[]") return null;
      const parsed = JSON.parse(photos);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
    }
  } catch (e) { return null; }
  return null;
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",").map(id => id.trim()) || [];
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/listings", { 
          cache: "no-store",
          headers: { "Pragma": "no-cache" }
        });
        const data = await res.json();
        const allListings = data.items || [];
        const filtered = allListings.filter((item: any) => ids.includes(String(item.id)));
        setListings(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (ids.length > 0) fetchData();
    else setLoading(false);
  }, [searchParams]);

  if (loading) return <div className="p-20 text-center">⏳ 로딩 중...</div>;
  if (listings.length === 0) return (
    <div className="p-20 text-center">
      <h2 className="text-xl font-bold mb-4">비교할 매물이 없습니다.</h2>
      <Link href="/" className="text-blue-600 underline">홈으로 돌아가기</Link>
    </div>
  );

  const rows = [
    { label: "매물명", render: (l: any) => <span className="font-bold">{l.title}</span> },
    { label: "권리금", render: (l: any) => <span className="text-blue-600 font-bold">{l.goodwill_price?.toLocaleString()}만원</span> },
    { label: "보증금/월세", render: (l: any) => `${l.deposit?.toLocaleString()} / ${l.rent_monthly?.toLocaleString()}` },
    { label: "월 매출", render: (l: any) => l.monthly_sales ? `${l.monthly_sales.toLocaleString()}만원` : "-" },
    { label: "평수/층", render: (l: any) => `${l.area_pyeong ?? 0}평 / ${l.floor ?? 1}층` },
    { label: "업종", render: (l: any) => l.sector },
    { label: "", render: (l: any) => (
        <Link href={`/listing/${l.id}`} className="block w-full text-center bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">상세보기</Link>
    )},
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">⚖️ 매물 비교하기</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="p-4 bg-gray-50 border-b w-32 font-medium text-gray-500 sticky left-0 z-10">구분</th>
                {listings.map((l) => (
                  <th key={l.id} className="p-4 border-b min-w-[200px] align-top">
                    {/* 이미지 영역 */}
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 mb-2">
                       {getThumb((l as any).photos) ? (
                          <Image src={getThumb((l as any).photos)!} alt={l.title} fill className="object-cover" />
                       ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                       )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b bg-gray-50 font-medium text-gray-600 sticky left-0 z-10">{row.label}</td>
                  {listings.map((l) => (
                    <td key={l.id} className="p-4 border-b text-center text-gray-800">{row.render(l)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}