"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [sector, setSector] = useState(searchParams.get("sector") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (sector) params.set("sector", sector);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="bg-white border-b sticky top-16 z-40 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex flex-wrap items-center gap-4">
        {/* 업종 선택 */}
        <select 
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">전체 업종</option>
          <option value="카페/디저트">☕ 카페/디저트</option>
          <option value="음식점">🍕 음식점</option>
          <option value="주점">🍺 주점</option>
          <option value="의류/패션">👗 의류/패션</option>
        </select>

        {/* 권리금 필터 */}
        <select 
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">권리금 전체</option>
          <option value="3000">3,000만 이하</option>
          <option value="5000">5,000만 이하</option>
          <option value="10000">1억 이하</option>
        </select>

        <button 
          onClick={handleFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          조건 검색
        </button>
      </div>
    </div>
  );
}