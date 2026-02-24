// app/api/listings/[id]/favorite/route.ts
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    // 1. 로그인 여부 확인
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const listingId = parseInt(resolvedParams.id);

    if (isNaN(listingId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 2. 유저 정보 조회
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. 이미 찜한 매물인지 확인
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: user.id,
          listingId: listingId,
        },
      },
    });

    if (existingFavorite) {
      // 이미 찜했다면 삭제 (찜 취소)
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return NextResponse.json({ isFavorite: false });
    } else {
      // 찜하지 않았다면 생성 (찜하기)
      await prisma.favorite.create({
        data: {
          userId: user.id,
          listingId: listingId,
        },
      });
      return NextResponse.json({ isFavorite: true });
    }
  } catch (error) {
    console.error("Favorite Toggle Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}