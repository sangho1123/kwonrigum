// app/api/chat/threads/[id]/read/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const url = new URL(req.url);
    const role = url.searchParams.get("role") === "admin" ? "admin" : "user";

    const thread = await prisma.thread.update({
      where: { id },
      data:
        role === "admin"
          ? { lastAdminReadAt: new Date() }
          : { lastUserReadAt: new Date() },
      select: { id: true, lastAdminReadAt: true, lastUserReadAt: true },
    });

    return NextResponse.json({ ok: true, thread });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}
