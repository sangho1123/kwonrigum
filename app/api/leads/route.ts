// app/api/leads/route.ts
import { prisma } from "@/lib/db";
import { partners } from "@/lib/partners";
import { NextResponse } from "next/server";

// GET: 최근 리드 목록 가져오기 (Admin 페이지용)
export async function GET() {
  try {
    const rows = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 200, // 필요하면 숫자 조절
    });

    const items = rows.map((r) => ({
      id: r.id,
      type: r.type as "listing" | "loan" | "fitout" | "closure",
      listingId: r.listingId ?? undefined,
      name: r.name,
      phone: r.phone,
      message: r.message ?? undefined,
      payload: r.payload ?? undefined,
      partnerId: r.partnerId ?? null,
      // AdminLeadsPage에서 number로 쓰고 있으니 timestamp로 변환
      createdAt: r.createdAt.getTime(),
    }));

    return NextResponse.json({ ok: true, items });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "서버 오류" },
      { status: 500 }
    );
  }
}

// POST: 리드 생성 + 파트너 웹훅 전송
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type = "listing",
      listingId,
      name,
      phone,
      message,
      payload,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "필수 값 누락(name, phone)" },
        { status: 400 }
      );
    }

    // listingId 숫자 변환 (문자로 들어와도 처리)
    let listingIdNum: number | null = null;
    if (typeof listingId === "number") {
      listingIdNum = listingId;
    } else if (typeof listingId === "string" && listingId.trim() !== "") {
      const n = Number(listingId);
      if (Number.isFinite(n)) listingIdNum = n;
    }

    // 1) DB에 리드 생성 (처음에는 partnerId 없이)
    const created = await prisma.lead.create({
      data: {
        type: String(type),
        listingId: listingIdNum,
        name: String(name),
        phone: String(phone),
        message: message ? String(message) : null,
        payload: payload ?? null,
        partnerId: null,
      },
    });

    let partnerId: string | null = null;

    // 2) 간단한 라우팅: 타입별 첫 파트너
    const partner =
      (type === "loan" && partners.find((p) => p.type === "lender")) ||
      (type === "fitout" && partners.find((p) => p.type === "fitout")) ||
      (type === "closure" && partners.find((p) => p.type === "closure")) ||
      null;

    if (partner) {
      try {
        await fetch(partner.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            partnerId: partner.id,
            lead: {
              id: created.id,
              type,
              listingId: listingIdNum,
              name,
              phone,
              message,
              payload,
              createdAt: created.createdAt.getTime(),
            },
          }),
        });

        // 웹훅 성공 시 DB에 partnerId 업데이트
        await prisma.lead.update({
          where: { id: created.id },
          data: { partnerId: partner.id },
        });
        partnerId = partner.id;
      } catch {
        // 파트너 호출 실패해도 리드는 DB에 남아 있게 둠
      }
    }

    console.log("[LEAD][DB]", { id: created.id, partnerId });

    return NextResponse.json({
      ok: true,
      id: created.id,
      partnerId,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "서버 오류" },
      { status: 500 }
    );
  }
}
