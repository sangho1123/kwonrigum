"use client";

import { useMemo } from "react";
import type { Listing } from "../lib/mockData";
import RangeBar from "./RangeBar";

export type FilterValue = {
  q?: string;
  gu?: string;
  dong?: string;
  category?: string;

  minGoodwill?: number;
  maxGoodwill?: number;
  minSales?: number;
  maxSales?: number;
};

const GOODWILL_MAX = 200_000_000; // 2억
const SALES_MAX = 120_000_000;    // 1.2억
const STEP = 500_000;

export default function Filters({
  items,
  value,
  onChange,
}: {
  items: Listing[];
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const guOptions = useMemo(
    () => Array.from(new Set(items.map((x) => x.gu))),
    [items]
  );

  const dongOptions = useMemo(() => {
    const scoped = value.gu ? items.filter((x) => x.gu === value.gu) : items;
    return Array.from(new Set(scoped.map((x) => x.dong)));
  }, [items, value.gu]);

  const categoryOptions = useMemo(
    () => Array.from(new Set(items.map((x) => x.category))),
    [items]
  );

  return (
    <div className="space-y-3">
      {/* 검색/지역/업종 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input
          value={value.q ?? ""}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="키워드 (가게명)"
          className="h-10 px-3 rounded-lg border w-full"
        />
        <select
          value={value.gu ?? ""}
          onChange={(e) =>
            onChange({ ...value, gu: e.target.value || undefined, dong: undefined })
          }
          className="h-10 px-3 rounded-lg border w-full"
        >
          <option value="">전체 구</option>
          {guOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={value.dong ?? ""}
          onChange={(e) => onChange({ ...value, dong: e.target.value || undefined })}
          className="h-10 px-3 rounded-lg border w-full"
          disabled={!value.gu}
        >
          <option value="">{value.gu ? "전체 동" : "구를 먼저 선택"}</option>
          {dongOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={value.category ?? ""}
          onChange={(e) =>
            onChange({ ...value, category: e.target.value || undefined })
          }
          className="h-10 px-3 rounded-lg border w-full"
        >
          <option value="">전체 업종</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 범위 슬라이더들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <RangeBar
          label="권리금 범위"
          min={0}
          max={GOODWILL_MAX}
          step={STEP}
          valueMin={value.minGoodwill ?? 0}
          valueMax={value.maxGoodwill ?? GOODWILL_MAX}
          onChange={(v) =>
            onChange({
              ...value,
              minGoodwill: v.min ?? value.minGoodwill ?? 0,
              maxGoodwill: v.max ?? value.maxGoodwill ?? GOODWILL_MAX,
            })
          }
        />
        <RangeBar
          label="월매출 범위"
          min={0}
          max={SALES_MAX}
          step={STEP}
          valueMin={value.minSales ?? 0}
          valueMax={value.maxSales ?? SALES_MAX}
          onChange={(v) =>
            onChange({
              ...value,
              minSales: v.min ?? value.minSales ?? 0,
              maxSales: v.max ?? value.maxSales ?? SALES_MAX,
            })
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() =>
            onChange({
              ...value,
              minGoodwill: undefined,
              maxGoodwill: undefined,
              minSales: undefined,
              maxSales: undefined,
            })
          }
          className="text-xs text-neutral-600 underline"
        >
          범위 초기화
        </button>
      </div>
    </div>
  );
}
