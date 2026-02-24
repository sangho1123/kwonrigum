"use client";

type LeadType = "LOAN" | "INTERIOR" | "LEASE";

export default function ConsultButtons({ listingId }: { listingId: number }) {
  async function submit(type: LeadType) {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, listingId, payload: { source: "listing_detail" } }),
    });
    if (!res.ok) {
      const t = await res.text();
      alert(`리드 생성 실패: ${t}`);
      return;
    }
    alert("상담 요청 접수 완료");
  }

  const base =
    "w-full h-10 rounded-xl font-semibold border shadow-sm active:scale-[0.99] transition";
  return (
    <div className="grid grid-cols-3 gap-2">
      <button onClick={() => submit("LOAN")} className={`${base} bg-sky-50 border-sky-200 text-sky-700`}>
        대출상담
      </button>
      <button onClick={() => submit("INTERIOR")} className={`${base} bg-sky-100 border-sky-300 text-sky-800`}>
        인테리어상담
      </button>
      <button onClick={() => submit("LEASE")} className={`${base} bg-sky-200 border-sky-400 text-sky-900`}>
        임차상담
      </button>
    </div>
  );
}
