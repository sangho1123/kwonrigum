import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 이 함수가 정확히 GET 이어야 하며, 인자 형식이 맞아야 합니다.
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Next.js 15+ 에서는 params를 await 해야 할 수도 있습니다.
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: id },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}