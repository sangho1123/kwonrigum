// app/api/listings/[id]/route.ts
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 💡 현재 로그인한 유저 정보 확인
    const session = await auth();
    let userId = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      userId = user?.id;
    }

    // 💡 매물 정보와 함께 favoritedBy(찜한 사람 목록)를 불러옵니다.
    const listing = await prisma.listing.findUnique({
      where: { id: id },
      include: {
        favoritedBy: true, // 찜한 사람 데이터 포함
      }
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // 💡 현재 접속한 유저가 찜했는지 계산 & 전체 찜 개수 계산
    const isFavorite = userId ? listing.favoritedBy.some((fav: any) => fav.userId === userId) : false;
    const favoriteCount = listing.favoritedBy.length;

    return NextResponse.json({ ...listing, isFavorite, favoriteCount });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}