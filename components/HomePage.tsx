"use client";

import { useEffect, useMemo, useState } from "react";
import type { Listing } from "../lib/mockData";
import Filters, { FilterValue } from "./Filters";
import ListingCard from "./ListingCard";
import ListingMap from "./ListingMap";

export default function HomePage({ items }: { items: Listing[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterValue>({});

  // 필터링
  const filtered = useMemo(() => {
    const q = (filters.q || "").trim().toLowerCase();
    return items.filter((it) => {
      if (filters.gu && it.gu !== filters.gu) return false;
      if (filters.dong && it.dong !== filters.dong) return false;
      if (filters.category && it.category !== filters.category) return false;
      if (q && !it.title.toLowerCase().includes(q)) return false;

      if (
        filters.minGoodwill != null &&
        (it.goodwill_price ?? Number.NEGATIVE_INFINITY) < filters.minGoodwill
      )
        return false;
      if (
        filters.maxGoodwill != null &&
        (it.goodwill_price ?? Number.POSITIVE_INFINITY) > filters.maxGoodwill
      )
        return false;

      if (
        filters.minSales != null &&
        (it.monthly_sales ?? Number.NEGATIVE_INFINITY) < filters.minSales
      )
        return false;
      if (
        filters.maxSales != null &&
        (it.monthly_sales ?? Number.POSITIVE_INFINITY) > filters.maxSales
      )
        return false;

      return true;
    });
  }, [items, filters]);

  // 선택 카드로 스크롤
  useEffect(() => {
    if (!selectedId) return;
    const el = document.getElementById(`card-${selectedId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedId]);

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">STEP 5 — 검색/필터 + 상담</h1>

      {/* 필터 */}
      <Filters items={items} value={filters} onChange={setFilters} />

      {/* 지도 */}
      <ListingMap
        items={filtered}
        selectedId={selectedId ?? undefined}
        onSelect={(id) => setSelectedId(id)}
      />

      {/* 카드 리스트 */}
      <div className="space-y-3">
        {filtered.map((it) => (
          <ListingCard
            key={it.id}
            item={it}
            highlight={selectedId === it.id}
            onHover={(id) => setSelectedId(id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-neutral-600 p-3">
            조건에 맞는 매물이 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
