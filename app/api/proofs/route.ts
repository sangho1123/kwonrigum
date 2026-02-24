// app/api/proofs/route.ts
import {
    proofs,
    setProofStatus,
    type Proof,
} from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listingId, status, filename } = body as {
      listingId?: number;
      status?: "verified" | "unverified";
      filename?: string;
    };
    if (!listingId || !status) {
      return NextResponse.json(
        { ok: false, error: "listingId, status는 필수" },
        { status: 400 }
      );
    }

    // 데모: 파일은 저장하지 않고 기록만 남김
    const rec: Proof = {
      id: String(Date.now()),
      listingId,
      filename,
      uploadedAt: Date.now(),
    };
    proofs.unshift(rec);
    setProofStatus(listingId, status);

    return NextResponse.json({ ok: true, proof: rec, status });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "서버 오류" },
      { status: 500 }
    );
  }
}
