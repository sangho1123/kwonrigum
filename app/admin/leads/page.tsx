"use client";

import { useEffect, useRef, useState } from "react";

type LeadType = "listing" | "loan" | "fitout" | "closure";

type Lead = {
  id: string;
  type: LeadType;
  listingId?: number;
  name: string;
  phone: string;
  message?: string;
  payload?: any;
  partnerId?: string | null;
  createdAt: number;
};

const typeLabel: Record<LeadType, string> = {
  listing: "일반",
  loan: "대출",
  fitout: "인테리어",
  closure: "임차/권리금",
};

const typeBadgeClass: Record<LeadType, string> = {
  listing:
    "inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-700",
  loan:
    "inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700",
  fitout:
    "inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700",
  closure:
    "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700",
};

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<LeadType | "all">("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const timerRef = useRef<number | null>(null);

  const load = async (signal?: AbortSignal) => {
    try {
      setError(null);
      const res = await fetch("/api/leads", { cache: "no-store", signal });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "불러오기 실패");
      const list = Array.isArray(data.items) ? (data.items as Lead[]) : [];
      setItems(list);
      // 선택된 리드가 있으면 최신 데이터와 동기화
      if (selected) {
        const updated = list.find((x) => x.id === selected.id) || null;
        setSelected(updated);
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") setError(e?.message || "불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal); // 최초 로드
    // 4초마다 자동 새로고침
    timerRef.current = window.setInterval(() => load(), 4000);
    return () => {
      ctrl.abort();
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((x) => x.type === activeFilter);

  const handleRowClick = (item: Lead) => {
    setSelected((prev) => (prev?.id === item.id ? null : item));
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">리드 목록</h1>
          <p className="mt-1 text-xs text-neutral-500">
            CTA·문의로 들어온 리드를 실시간으로 확인하는 페이지입니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => load()}
            className="rounded-lg border px-3 py-1.5 text-xs"
          >
            새로고침
          </button>
          <span className="text-[11px] text-neutral-500">
            4초마다 자동 갱신
          </span>
        </div>
      </header>

      {/* 타입 필터 바 */}
      <section className="flex flex-wrap items-center gap-2">
        {[
          { key: "all" as const, label: "전체" },
          { key: "loan" as const, label: "대출" },
          { key: "fitout" as const, label: "인테리어" },
          { key: "closure" as const, label: "임차/권리금" },
          { key: "listing" as const, label: "기타/일반" },
        ].map((tab) => {
          const active = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full border px-3 py-1 text-xs ${
                active
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        <span className="ml-auto text-[11px] text-neutral-500">
          총 {items.length}건 / 표시 {filtered.length}건
        </span>
      </section>

      {/* 리스트 영역 */}
      {loading ? (
        <div className="text-sm text-neutral-600">불러오는 중…</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-neutral-600">
          조건에 맞는 리드가 없습니다.
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left w-[150px]">시간</th>
                <th className="px-3 py-2 text-left w-[90px]">타입</th>
                <th className="px-3 py-2 text-left w-[90px]">이름</th>
                <th className="px-3 py-2 text-left w-[140px]">연락처</th>
                <th className="px-3 py-2 text-left w-[80px]">매물ID</th>
                <th className="px-3 py-2 text-left w-[110px]">파트너</th>
                <th className="px-3 py-2 text-left">메모</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x) => {
                const isSelected = selected?.id === x.id;
                return (
                  <tr
                    key={x.id}
                    className={`border-t cursor-pointer ${
                      isSelected ? "bg-sky-50/50" : "hover:bg-neutral-50"
                    }`}
                    onClick={() => handleRowClick(x)}
                  >
                    <td className="px-3 py-2 align-top text-xs text-neutral-700">
                      {new Date(x.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span className={typeBadgeClass[x.type]}>
                        {typeLabel[x.type]}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-xs">{x.name}</td>
                    <td className="px-3 py-2 align-top text-xs">{x.phone}</td>
                    <td className="px-3 py-2 align-top text-xs">
                      {x.listingId ?? "-"}
                    </td>
                    <td className="px-3 py-2 align-top text-xs">
                      {x.partnerId ?? "-"}
                    </td>
                    <td className="px-3 py-2 align-top text-xs text-neutral-700">
                      {x.message
                        ? x.message.length > 40
                          ? x.message.slice(0, 40) + "…"
                          : x.message
                        : x.payload?.quickMessage
                        ? String(x.payload.quickMessage).slice(0, 40) + "…"
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 선택 리드 상세 영역 */}
      {selected && (
        <section className="rounded-lg border bg-white px-4 py-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                선택된 리드 상세 정보 (ID: {selected.id})
              </span>
              <span className={typeBadgeClass[selected.type]}>
                {typeLabel[selected.type]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-[11px] text-neutral-500 hover:text-neutral-700"
            >
              닫기
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <div>
              <span className="text-neutral-500">이름: </span>
              {selected.name}
            </div>
            <div>
              <span className="text-neutral-500">연락처: </span>
              {selected.phone}
            </div>
            <div>
              <span className="text-neutral-500">매물 ID: </span>
              {selected.listingId ?? "-"}
            </div>
            <div>
              <span className="text-neutral-500">파트너 ID: </span>
              {selected.partnerId ?? "-"}
            </div>
            <div>
              <span className="text-neutral-500">생성 시각: </span>
              {new Date(selected.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <div className="text-neutral-500">메시지</div>
            <div className="rounded-md border bg-neutral-50 px-2 py-2 min-h-[40px] whitespace-pre-wrap">
              {selected.message || selected.payload?.quickMessage || "—"}
            </div>
          </div>

          {selected.payload && (
            <div className="mt-2 space-y-1">
              <div className="text-neutral-500">payload (요약)</div>
              <pre className="rounded-md border bg-neutral-50 px-2 py-2 max-h-40 overflow-auto text-[11px]">
                {JSON.stringify(selected.payload, null, 2)}
              </pre>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
