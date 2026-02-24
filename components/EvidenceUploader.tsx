"use client";

import { useState } from "react";

export default function EvidenceUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "업로드 실패");
      onUploaded(data.url);
    } catch (e: any) {
      setErr(e.message || "업로드 실패");
    } finally {
      setBusy(false);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50">
        증빙 업로드
        <input
          type="file"
          hidden
          accept="image/*,application/pdf"
          onChange={onChange}
          disabled={busy}
        />
      </label>
      {busy && <span className="text-xs text-neutral-500">업로드 중…</span>}
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}
