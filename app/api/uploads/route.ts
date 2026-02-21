// app/api/uploads/route.ts
import { setProofStatus } from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const listingIdRaw = formData.get("listingId");
    const listingId = listingIdRaw ? Number(listingIdRaw) : NaN;

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "파일이 없습니다." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(listingId)) {
      return NextResponse.json(
        { ok: false, error: "listingId가 잘못되었습니다." },
        { status: 400 }
      );
    }

    // 🔹 지금은 데모용: 파일 내용을 읽기만 하고, 실제 저장은 안 함.
    // 나중에 S3 서명 URL 기반 업로드로 바꾸려면
    // - 여기서 S3 presigned URL 생성
    // - 프론트에서 해당 URL로 직접 업로드
    // - 업로드 후 최종 fileUrl을 DB/스토어에 저장
    // 이런 식으로 로직 교체하면 됨.
    await file.arrayBuffer();

    // 일단 데모용으로 "어딘가 올라간 것처럼" 보이는 가짜 URL
    const fakeUrl = `https://example.com/proofs/${Date.now()}-${encodeURIComponent(
      file.name
    )}`;

    // 🔹 업로드 성공했다고 보고, 해당 listing을 검증 완료로 표시
    setProofStatus(listingId, "verified");

    return NextResponse.json({
      ok: true,
      url: fakeUrl,
      proof_status: "verified",
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "업로드 중 오류" },
      { status: 500 }
    );
  }
}
