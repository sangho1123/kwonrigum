// app/api/chat/threads/[id]/messages/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const items = await prisma.message.findMany({
      where: { threadId: id },
      orderBy: { at: "asc" },
      select: { id: true, from: true, text: true, at: true },
    });
    return NextResponse.json({ ok: true, items });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const { from = "user", text = "" } = await req.json();
    if (!text?.trim())
      return NextResponse.json(
        { ok: false, error: "text is required" },
        { status: 400 }
      );

    const item = await prisma.message.create({
      data: { threadId: id, from: String(from), text: String(text) },
      select: { id: true, from: true, text: true, at: true },
    });
    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}
