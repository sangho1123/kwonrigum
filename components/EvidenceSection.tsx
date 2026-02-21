"use client";

import EvidenceUploader from "./EvidenceUploader";

export default function EvidenceSection({ listingId }: { listingId: number }) {
  const handleUploaded = (url: string) => {
    // 데모: 업로드 성공 후 즉시 확인. 실제로는 DB에 문서 레코드 저장.
    alert(`업로드 완료: ${url}\n(데모) listingId=${listingId}`);
  };

  return (
    <section className="space-y-2">
      <h2 className="font-medium">증빙 업로드</h2>
      <EvidenceUploader onUploaded={handleUploaded} />
      <p className="text-xs text-neutral-500">
        POS 정산표, 전기/수도요금서, 매출명세 등 이미지/PDF 업로드 가능.
      </p>
    </section>
  );
}
