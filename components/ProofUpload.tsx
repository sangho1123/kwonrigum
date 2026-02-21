"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

type ProofUploadProps = {
  listingId: number;
  defaultStatus: "verified" | "unverified";
};

type UploadResponse = {
  ok: boolean;
  error?: string;
  url?: string;
  proof_status?: "verified" | "unverified";
};

export default function ProofUpload({
  listingId,
  defaultStatus,
}: ProofUploadProps) {
  const [status, setStatus] = useState<"verified" | "unverified">(defaultStatus);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("listingId", String(listingId));

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "업로드 실패");
      }

      const nextStatus = data.proof_status ?? "verified";
      setStatus(nextStatus);

      // 서버에서 getProofStatus를 쓰고 있으니
      // 새 상태 반영하려면 새로고침 한 번 해주는 게 깔끔함.
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
      // 같은 파일 다시 올릴 때도 change 이벤트가 다시 나도록 초기화
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="rounded-lg border px-3 py-1.5 text-xs hover:bg-neutral-50 disabled:opacity-60"
      >
        {uploading
          ? "업로드 중..."
          : status === "verified"
          ? "증빙 다시 업로드"
          : "증빙 업로드"}
      </button>

      {error && <p className="text-[10px] text-red-600">{error}</p>}
    </div>
  );
}
