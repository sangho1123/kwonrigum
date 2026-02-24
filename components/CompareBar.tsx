"use client";

import { useCompare } from "@/context/CompareContext";
import Link from "next/link";

export default function CompareBar() {
  const { selectedIds, clear } = useCompare();

  if (selectedIds.length === 0) return null; // 선택된 게 없으면 숨김

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideUp">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 border border-gray-700">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 text-xs font-bold px-2 py-0.5 rounded-full">
            {selectedIds.length}
          </span>
          <span className="text-sm font-medium">개 매물 선택됨</span>
        </div>

        <div className="h-4 w-px bg-gray-600"></div>

        <div className="flex items-center gap-3">
          <button 
            onClick={clear}
            className="text-xs text-gray-400 hover:text-white underline decoration-gray-500 underline-offset-2"
          >
            모두 비우기
          </button>
          <Link 
            href={`/compare?ids=${selectedIds.join(",")}`}
            className="bg-white text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            비교하기 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}