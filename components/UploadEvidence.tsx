"use client";

import { useState } from "react";

export default function UploadEvidence({
  listingId,
  onUploaded,
}: {
  listingId: number;
  onUploaded?: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    // /api/uploads는 파일을 받아 업로드 후 { fileUrl }을 반환한다고 가정
    const fd = new FormData();
    fd.append("file", file);
    fd.append("listingId", String(listingId));

    const res = await fetch("/api/uploads", { method: "POST", body: fd });
    const json = await res.json();
    setLoading(false);

    if (!res.ok || !json?.fileUrl) {
      alert("업로드 실패");
      return;
    }
    setUrl(json.fileUrl);
    onUploaded?.(json.fileUrl);
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">증빙 업로드</label>
      <input type="file" accept="image/*,application/pdf" onChange={handleChange} />
      {loading && <div className="text-xs text-neutral-500">업로드 중…</div>}
      {url && (
        <a className="text-xs text-blue-600 underline" href={url} target="_blank">
          업로드 완료: 보기
        </a>
      )}
    </div>
  );
}
