import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ 모델명 'thread' 사용
    const thread = await prisma.thread.findUnique({
      where: { id: id },
      include: {
        messages: { orderBy: { at: "asc" } },
        listing: true,
      },
    });

    if (!thread) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(thread);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}