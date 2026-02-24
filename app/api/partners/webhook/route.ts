// app/api/partners/webhook/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // 데모: 받은 리드를 서버 콘솔에만 기록
  console.log("[PARTNER WEBHOOK] received:", body);
  return NextResponse.json({ ok: true });
}
