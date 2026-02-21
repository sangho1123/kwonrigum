import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth(); 
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, listingId, title } = await req.json();

    const newThread = await prisma.thread.create({
      data: {
        type: type || "listing",
        listingId: listingId ? Number(listingId) : null,
        title: title ? `${title} 관련 문의` : "매물 문의",
        userId: (session.user as any).id,
      },
    });

    console.log("✅ 채팅방 생성 성공 ID:", newThread.id);

    return NextResponse.json({ thread: newThread });
  } catch (error: any) {
    console.error("❌ API 에러:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}