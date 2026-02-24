// app/listing/[id]/edit/EditClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Initial = {
  id: number;
  title: string;
  category: string;
  address_area: string;
  deposit: string;
  rent_monthly: string;
  goodwill_price: string;
  monthly_sales: string;
  parking_spaces: string;
};

export default function EditClient({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const set = (k: keyof Initial, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) {
      setErr("제목은 필수입니다.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/listings/${initial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          address_area: form.address_area,
          deposit: form.deposit,
          rent_monthly: form.rent_monthly,
          goodwill_price: form.goodwill_price,
          monthly_sales: form.monthly_sales,
          parking_spaces: form.parking_spaces,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j?.ok) {
        throw new Error(j?.error || "저장 실패");
      }
      // 저장 후 상세 페이지로 이동
      router.replace(`/listing/${initial.id}`);
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "네트워크 오류");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-lg font-semibold">매물 수정</h1>

      <div className="grid grid-cols-2 gap-3">
        <input
          className="rounded-lg border px-3 py-2 col-span-2"
          placeholder="제목"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
        />

        <input
          className="rounded-lg border px-3 py-2"
          placeholder="카테고리"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="주소/지역"
          value={form.address_area}
          onChange={(e) => set("address_area", e.target.value)}
        />

        <input
          className="rounded-lg border px-3 py-2"
          placeholder="보증금"
          value={form.deposit}
          onChange={(e) => set("deposit", e.target.value)}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="월세"
          value={form.rent_monthly}
          onChange={(e) => set("rent_monthly", e.target.value)}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="권리금"
          value={form.goodwill_price}
          onChange={(e) => set("goodwill_price", e.target.value)}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="월매출"
          value={form.monthly_sales}
          onChange={(e) => set("monthly_sales", e.target.value)}
        />
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="주차대수"
          value={form.parking_spaces}
          onChange={(e) => set("parking_spaces", e.target.value)}
        />
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={busy}
          className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm"
        >
          {busy ? "저장 중…" : "저장"}
        </button>
        <button
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          취소
        </button>
      </div>
    </main>
  );
}
