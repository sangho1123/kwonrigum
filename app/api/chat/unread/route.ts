// app/api/chat/unread/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/chat/unread?role=admin|user
 * - 각 쓰레드의 "가장 최근 메시지 시각"이
 *   lastAdminReadAt / lastUserReadAt 보다 최신이면 => 미읽음으로 카운트
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = (searchParams.get("role") === "user" ? "user" : "admin") as
      | "admin"
      | "user";

    // 모든 쓰레드의 최근 메시지 시각만 가져와 가볍게 계산
    const threads = await prisma.thread.findMany({
      select: {
        id: true,
        lastAdminReadAt: true,
        lastUserReadAt: true,
        messages: {
          select: { at: true },
          orderBy: { at: "desc" },
          take: 1, // 최신 메시지 1개만
        },
      },
    });

    const count = threads.reduce((acc, t) => {
      const lastMsgAt = t.messages[0]?.at ?? null;
      if (!lastMsgAt) return acc; // 메시지 자체가 없으면 미읽음 아님

      if (role === "admin") {
        return !t.lastAdminReadAt || lastMsgAt > t.lastAdminReadAt ? acc + 1 : acc;
      } else {
        return !t.lastUserReadAt || lastMsgAt > t.lastUserReadAt ? acc + 1 : acc;
      }
    }, 0);

    return NextResponse.json({ ok: true, count });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}
